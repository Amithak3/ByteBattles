
from django.shortcuts import get_object_or_404
from accounts.models import CustomUser
import uuid
import subprocess
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from problem.models import Problems, Testcases
from .models import Submissions
from .serializers import SubmissionsSerializer
from django.conf import settings
from pathlib import Path
from rest_framework import viewsets
from rest_framework.decorators import action
# Create your views here.
authentication_classes = []
permission_classes = []

def run(language, code, input):
    project_path =Path(settings.BASE_DIR)
    directories = ["codes", "inputs", "outputs"]
    for directory in directories:
        path = project_path/ directory
        if not path.exists():
            path.mkdir(parents=True, exist_ok=True)
    
    codes_dir = project_path / "codes"
    inputs_dir = project_path / "inputs"
    outputs_dir = project_path / "outputs"
    
    unique=str(uuid.uuid4())
    if language == "java":
        unique='Main'
    code_file_name = f"{unique}.{language}"
    input_file_name = f"{unique}.txt"
    output_file_name = f"{unique}.txt"

    code_file_path = codes_dir / code_file_name
    input_file_path = inputs_dir / input_file_name
    output_file_path = outputs_dir / output_file_name

    with open(code_file_path, "w") as f:
        f.write(code)
    
    with open(input_file_path, "w") as f:
        f.write(input)
        
    with open(output_file_path, "w") as f:
        pass
    
    if language == "cpp":
        executable_path=codes_dir / unique
        compile_result =subprocess.run(
            ["g++", str(code_file_path), "-o", str(executable_path)],
        )
        if compile_result.returncode == 0:
            with open(input_file_path, "r") as f:
                with open(output_file_path, "w") as output_file:
                    subprocess.run(
                        [str(executable_path)],
                        stdin=f,
                        stdout=output_file
                    )
    elif language == "python":
        with open(input_file_path, "r") as f:
            with open(output_file_path, "w") as output_file:
                subprocess.run(
                    ["python", str(code_file_path)],
                    stdin=f,
                    stdout=output_file
                )
    elif language == "java":
            with open(input_file_path, "r") as f:
                with open(output_file_path, "w") as output_file:
                    subprocess.run(
                        ["java", str(code_file_path)],
                        stdin=f,
                        stdout=output_file
                    )
    with open(output_file_path, "r") as f:
        output = f.read()
        
    return output
                        

authentication_classes = []
permission_classes = []
@api_view(['POST'])
def run_code(request):
    language = request.data.get('language')
    code = request.data.get('code')
    input_data = request.data.get('input')

    if not language or not code or not input_data:
        return Response(
            {'error': 'All fields (language, code, input) are required.'}, 
            status=status.HTTP_400_BAD_REQUEST
            )

    output = run(language, code, input_data)
    return Response({'output': output})

authentication_classes = []
permission_classes = []
@api_view(['POST'])
def submit_code(request):
    # print("Hello start")
    id = request.data.get('problem_id')
    username = request.data.get('username')
    code = request.data.get('code')
    language = request.data.get('language')
    # print("Hello param")
    
    # print(id, code, language, username)
    if not id or not username or not code or not language:
        print("Hello error")
        return Response(
            {'error': 'All fields (problem_id, username, code, language) are required.'}, 
            status=status.HTTP_400_BAD_REQUEST
            )

    problem = get_object_or_404(Problems, id=id)
    user = get_object_or_404(CustomUser, username=username)
    testcases = Testcases.objects.filter(problem=problem)

    verdict = 'Pass'
    for testcase in testcases:
        output = run(language, code, testcase.input)
        if output != testcase.output:
            verdict = 'Fail'
            break
    print("Hello")
    submission = Submissions.objects.create(
        problem=problem,
        code=code,
        language=language,
        username=user,
        result=verdict
    )

    serializer = SubmissionsSerializer(submission)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submissions.objects.all()
    serializer_class = SubmissionsSerializer
    authentication_classes = []
    permission_classes = []
    