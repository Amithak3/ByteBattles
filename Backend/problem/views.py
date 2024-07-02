from rest_framework.decorators import  action
from rest_framework.response import Response
from rest_framework import status
from .models import Problems, Testcases
from problem.serializers import ProblemsSerializer, TestcaseSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class ProblemViewSet(viewsets.ModelViewSet):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    authentication_classes = []
    permission_classes = []
    queryset = Problems.objects.all()
    serializer_class = ProblemsSerializer

    @action(detail=True, methods=['get'])
    def testcases(self, request, pk=None):
        try:
            problem = Problems.objects.get(id=pk)
            testcases = Testcases.objects.filter(problem=problem)
            serializer = TestcaseSerializer(testcases, many=True, context={'request': request})
            return Response(serializer.data)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    # @action(detail=True, methods=['post'])
    # def add_testcase(self, request, pk=None):
    #     problem=self.get_object()
    #     serializer=TestcaseSerializer(data=request.data)
    #     if serializer.is_valid():
    #         Testcases.objects.create(problem=problem, **serializer.validated_data)
    #         # serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
   
class TestcaseViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    
    queryset = Testcases.objects.all()
    serializer_class = TestcaseSerializer
