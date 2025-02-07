from rest_framework import serializers
from .models import User ,Quest, Club, Event, Participant, Etudiant, Experience, Entreprise, Opportunities, CV, Notification

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id_user', 'email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()  # Nested serializer for the user
    class Meta:
        model = Event
        fields = '__all__'

class ParticipantSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()  # Nested serializer for user
    id_event = EventSerializer()  # Nested serializer for event

    class Meta:
        model = Participant
        fields = '__all__'

class EtudiantSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()  # Nested serializer for user
    class Meta:
        model = Etudiant
        fields ='__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()  # Nested serializer for user
    class Meta:
        model = Experience
        fields = '__all__'

class EntrepriseSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()  # Nested serializer for user
    class Meta:
        model = Entreprise
        fields ='__all__'

class OpportunitiesSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()  # Nested serializer for user
    class Meta:
        model = Opportunities
        fields = '__all__'

class QuestSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()  # Nested serializer for user
    class Meta:
        model = Quest
        fields = '__all__'


class CVSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()  # Nested serializer for user
    class Meta:
        model = CV
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()  # Nested serializer for user
    id_cv = CVSerializer()  # Nested serializer for CV
    id_opp = OpportunitiesSerializer()  # Nested serializer for opportunities

    class Meta:
        model = Notification
        fields = '__all__'