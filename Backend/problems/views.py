from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Problems, Testcases
from .serializers import ProblemsSerializer, TestcaseSerializer
from rest_framework import viewsets
from rest_framework import permissions

class ProblemViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    
    queryset = Problems.objects.all()
    serializer_class = ProblemsSerializer


class TestcaseViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    
    queryset = Testcases.objects.all()
    serializer_class = TestcaseSerializer

# @api_view(['GET'])
# def get_problems(request):
#     items = Problems.objects.all()
#     serializer = ProblemsSerializer(items, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def get_problem(request, pk):
#     item = Problems.objects.get(id=pk)
#     serializer = ProblemsSerializer(item, many=False)
#     return Response(serializer.data)

# @api_view(['POST'])
# def add_problem(request):
#     serializer = ProblemsSerializer(data=request.data)

#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT'])
# def update_problem(request, pk):
#     try:
#         item = Problems.objects.get(id=pk)
        
#     except item.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     serializer = ProblemsSerializer(item, data=request.data)

#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['DELETE'])
# def delete_problem(request, id):
#     if request.method == 'DELETE':
#         try:
#             item = Problems.objects.filter(id=id).first()
#             testcase=Testcases.objects.filter(problem=id).all()
#         except item.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         item.delete()
#         testcase.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)