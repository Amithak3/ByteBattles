from django.shortcuts import render
import os

import uuid
import subprocess
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from problems.models import Problems, Testcases
from .models import Submissions
# Create your views here.

class SubmitCodeAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        language = request.data.get('language')
        problem_id = request.data.get('problem_id')
        code = request.data.get('code')
        
        if language not in ['python', 'java', 'c', 'cpp']:
            return Response({'error': 'Invalid language'}, status=status.HTTP_400_BAD_REQUEST)
        
        folder_name = "InputCodes"
        
        os.makedirs(folder_name, exist_ok=True)
        os.makedirs("GeeneratedOutputs", exist_ok=True)
        
        curr_dir = os.getcwd()
        folder_path = os.path.join(curr_dir, folder_name)
        uniquename= uuid.uuid4().hex
        unique_filename = f"{uniquename}.{language}"
        file_path = os.path.join(folder_path, unique_filename)
        
        with open(file_path, 'w') as f:
            f.write(code)
            os.chdir(folder_path)
            
            problem = Problems.objects.filter(id=problem_id).first()
            test_case=Testcases.objects.filter(problem=problem).first()
            input_path=test_case.input
            output_path=test_case.output
            
            try:
                if language == 'c':
                    result = subprocess.run(["gcc", f"{unique_filename}", "-o", uniquename])
                    if result.returncode == 0:
                        os.chdir(curr_dir)
                        print(os.getcwd())
                        
                        with open(f"{input_path}", "r") as input_file:
                            with open(f"./GeneratedOutputs/{uniquename}.txt", "w") as output_file:
                                output= subprocess.run([f"{folder_name}/{uniquename}."], stdin=input_file, stdout=output_file)
                
                elif language == 'cpp':
                    result=subprocess.run(["g++", f"{unique_filename}", "-o", uniquename])
                    if result.returncode == 0:
                        os.chdir(curr_dir)
                        print(os.getcwd())
                        
                        generated_output_dir= "./GeneratedOutputs"
                        os.makedirs(generated_output_dir, exist_ok=True)
                        
                        with open(f"{input_path}", "r") as input_file:
                            output_file_path= f"./GeneratedOutputs/{uniquename}.txt"
                            with open(output_file_path, "w") as output_file:
                                subprocess.run([f"./InputCodes/{uniquename}"], stdin=input_file, stdout=output_file)

                elif language == 'py':
                    os.chdir(curr_dir)
                    print(os.getcwd())
                    
                    with open(f"{input_path}", "r") as input_file:
                        output_file_path= f"./GeneratedOutputs/{uniquename}.txt"
                        with open(output_file_path, "w") as output_file:
                            subprocess.run(["python", f"{unique_filename}"], stdin=input_file, stdout=output_file)
                
                
                elif language == 'java':
                    result=subprocess.run(["javac", f"{unique_filename}"])
                    if result.returncode == 0:
                        os.chdir(curr_dir)
                        print(os.getcwd())
                        
                        with open(f"{input_path}", "r") as input_file:
                            output_file_path= f"./GeneratedOutputs/{uniquename}.txt"
                            with open(output_file_path, "w") as output_file:
                                subprocess.run(["java", f"{unique_filename}"], stdin=input_file, stdout=output_file)
                    
                with open(f"GeneratedOutputs/{uniquename}.txt", "r") as gen:
                    output = gen.read()
                with open(f"{output_path}", "r") as ref:
                    expected_output = ref.read()
                verdict = "Accepted" if output.strip() == expected_output.strip() else "Wrong Answer"      
                
                submission = Submissions.objects.create(
                    problem= problem,
                    verdict= verdict
                )
                
                return Response({'output': output, 'result': verdict}, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)