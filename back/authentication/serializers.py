from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from bdd.models import Etudiant, Club, Entreprise
from django.contrib.auth import authenticate


User = get_user_model()

class SignUpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=[('entreprise', 'Entreprise'), ('etudiant', 'Etudiant'), ('club', 'Club')])

    nom = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255, required=False)
    prenom = serializers.CharField(max_length=255, required=False)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def validate(self, data):
        if data['role'] == 'etudiant':
            if 'prenom' not in data:
                raise serializers.ValidationError("Prenom is required for Etudiant")
            if 'description' in data:
                raise serializers.ValidationError("Description should not be provided for Etudiant")
        elif data['role'] in ['club', 'entreprise']:
            if 'prenom' in data:
                raise serializers.ValidationError("Prenom should not be provided for Club or Entreprise")
            if 'description' not in data:
                raise serializers.ValidationError("Description is required for Club and Entreprise")
        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        role = validated_data['role']
        
        user = User.objects.create(
            email=validated_data['email'],
            password=make_password(password),  # Hash password
            role=role,
            username=validated_data['email'],  # Set username same as email
        )

        if role == 'etudiant':
            Etudiant.objects.create(
                id_user=user,
                nom=validated_data['nom'],
                prenom=validated_data['prenom'],
            )
        elif role == 'club':
            Club.objects.create(
                id_user=user,
                nom=validated_data['nom'],
                description=validated_data['description'],
            )
        elif role == 'entreprise':
            Entreprise.objects.create(
                id_user=user,
                nom=validated_data['nom'],
                description=validated_data['description'],
            )

        return user



class SignInSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=make_password(data['password']) )
        if user is None:
            raise serializers.ValidationError("Invalid credentials")
        return user
