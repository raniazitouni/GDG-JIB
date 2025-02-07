from rest_framework.views import APIView
from django.shortcuts import render
from django.http import JsonResponse
from bdd.models import User, Etudiant, Club, Entreprise
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class SignUpView(APIView):
    def post(self, request, *args, **kwargs):
        
        data=request.data
        email = data.get("email")
        password = data.get("password")
        role = data.get("role")
        
        if User.objects.filter(email=email).exists():
            return JsonResponse({"error": "Email already registered"}, status=400)

        user = User.objects.create(
                email=email,
                password=make_password(password),  # Hash the password
                role=role
            )
        
        # Generate JWT token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

     
        # Create the related table entry based on role
        if role == "etudiant":
                Etudiant.objects.create(id_user=user, nom=data.get("nom"), prenom=data.get("prenom"))
        elif role == "club":
                Club.objects.create(id_user=user, nom=data.get("nom"), description=data.get("description"))
        elif role == "entreprise":
                Entreprise.objects.create(id_user=user, nom=data.get("nom"), description=data.get("description"))

        return Response(
                {"message": "User created successfully", "access_token": access_token , "id_user": user.id_user , "role": role ,"name" :data.get("nom") },
                status=status.HTTP_201_CREATED,
        )
      

class SignInView(APIView):
    def post(self, request, *args, **kwargs):
        
        data=request.data
        email = data.get("email")
        password = data.get("password")

        user = User.objects.filter(email=email).first()

        if user and check_password(password, user.password):  # Check password
                 # Generate JWT token
                 refresh = RefreshToken.for_user(user)
                 access_token = str(refresh.access_token)

                 return Response(
                   {"message": "User signed in successfully", "id_user": user.id_user, "role": user.role,"name" :data.get("nom") , "access_token": access_token},status=status.HTTP_200_OK,
                 )
        else:
                return JsonResponse({"error": "Invalid email or password"}, status=400)

       

      