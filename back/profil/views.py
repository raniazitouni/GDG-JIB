from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from bdd.models import Etudiant, Experience ,User, Club, Entreprise ,Quest
from bdd.serializers import EtudiantSerializer , ExperienceSerializer , ClubSerializer, EntrepriseSerializer
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from django.http import HttpResponse



class QuestResponses(APIView):
    def get(self, request, user_id):
        try:
            quest = Quest.objects.get(id_user=user_id)  # Query Quest by user_id
            response_data = {
                'resp_one': quest.resp_one,
                'resp_two': quest.resp_two,
                'resp_three': quest.resp_three,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Quest.DoesNotExist:
            return Response({'error': 'Quest not found for the provided user_id'}, status=status.HTTP_404_NOT_FOUND)





class EtudiantData(APIView):
    def get(self, request, user_id):
        try:
            # Get the Etudiant object
            etudiant = Etudiant.objects.get(id_user=user_id)
            
            # Get all experiences related to the user
            experiences = Experience.objects.filter(id_user=user_id)
            experiences_serializers = ExperienceSerializer(experiences)

            experience_serializer = ExperienceSerializer(experiences, many=True)
            

            response_data = {
                'skills': etudiant.skills,
                'experiences': experience_serializer.data  # Use .data to get the serialized data
            }
            return Response(response_data, status=status.HTTP_200_OK)


        except Etudiant.DoesNotExist:
            return Response({'error': 'Etudiant not found for the provided user_id'}, status=status.HTTP_404_NOT_FOUND)
        
        except Experience.DoesNotExist:
            return Response({'error': 'No experiences found for this Etudiant'}, status=status.HTTP_404_NOT_FOUND)





class UserProfileData(APIView):
    def get(self, request, user_id):
        try:
            # Get the User object by user_id
            user = User.objects.get(id_user=user_id)
            
            # Check the user's role
            if user.role == 'etudiant':
                # Fetch and return Etudiant data
                etudiant = Etudiant.objects.get(id_user=user_id)
                etudiant_serializer = EtudiantSerializer(etudiant)
                response_data = {
                    'role': user.role,
                    'nom': etudiant.nom,
                    'prenom': etudiant.prenom,
                }
                return Response(response_data, status=status.HTTP_200_OK)
            
            elif user.role == 'club':
                # Fetch and return Club data
                club = Club.objects.get(id_user=user_id)
                club_serializer = ClubSerializer(club)
                response_data = {
                    'role': user.role,
                    'nom': club.nom,
                    'description': club.description,
                }
                return Response(response_data, status=status.HTTP_200_OK)
            
            elif user.role == 'entreprise':
                # Fetch and return Entreprise data
                entreprise = Entreprise.objects.get(id_user=user_id)
                entreprise_serializer = EntrepriseSerializer(entreprise)
                response_data = {
                    'role': user.role,
                    'nom': entreprise.nom,
                    'description': entreprise.description,
                }
                return Response(response_data, status=status.HTTP_200_OK)
            
            else:
                return Response({'error': 'Invalid role for the user'}, status=status.HTTP_400_BAD_REQUEST)
        
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except Etudiant.DoesNotExist:
            return Response({'error': 'Etudiant not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except Club.DoesNotExist:
            return Response({'error': 'Club not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except Entreprise.DoesNotExist:
            return Response({'error': 'Entreprise not found'}, status=status.HTTP_404_NOT_FOUND)






class GenerateCV(APIView):
    def get(self, request, user_id):
        try:
            # Fetch user, etudiant, and experience data
            user = User.objects.get(id_user=user_id)
            etudiant = Etudiant.objects.get(id_user=user_id)
            experiences = Experience.objects.filter(id_user=user_id)

            # Create a response that will return a PDF file
            response = HttpResponse(content_type='application/pdf')
            response['Content-Disposition'] = f'inline; filename="CV_{user.email}.pdf"'

            # Create a canvas object to generate the PDF
            pdf_canvas = canvas.Canvas(response, pagesize=letter)
            width, height = letter  # Standard letter size

            # Add title
            pdf_canvas.setFont("Helvetica-Bold", 18)
            pdf_canvas.drawString(200, height - 50, f"Curriculum Vitae: {etudiant.nom} {etudiant.prenom}")

            # User Info
            pdf_canvas.setFont("Helvetica", 12)
            pdf_canvas.drawString(50, height - 100, f"Email: {user.email}")
            pdf_canvas.drawString(50, height - 120, f"Role: {user.role}")

            # Etudiant Info
            pdf_canvas.drawString(50, height - 160, f"Name: {etudiant.nom} {etudiant.prenom}")
            pdf_canvas.drawString(50, height - 180, f"Skills: {etudiant.skills}")

            # Experiences
            pdf_canvas.drawString(50, height - 220, "Experience:")
            y_position = height - 240
            for exp in experiences:
                pdf_canvas.drawString(50, y_position, f"Role: {exp.role} - {exp.date_debut} to {exp.date_fin}")
                pdf_canvas.drawString(50, y_position - 20, f"Description: {exp.description}")
                y_position -= 60  # Move down for the next experience

            # Save the PDF
            pdf_canvas.save()

            return response

        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Etudiant.DoesNotExist:
            return Response({'error': 'Etudiant not found'}, status=status.HTTP_404_NOT_FOUND)
        except Experience.DoesNotExist:
            return Response({'error': 'No experiences found for this user'}, status=status.HTTP_404_NOT_FOUND)
