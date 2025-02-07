from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from bdd.models import Etudiant, Experience ,User, Club, Entreprise ,Quest , CV
from bdd.serializers import EtudiantSerializer , ExperienceSerializer , ClubSerializer, EntrepriseSerializer
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from django.http import HttpResponse
from reportlab.lib.utils import simpleSplit
import os
from django.conf import settings
from django.core.files import File



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
    def post(self, request, user_id):
        try:
            # Fetch the user and related data
            user = User.objects.get(id_user=user_id)
            etudiant = Etudiant.objects.get(id_user=user_id)
            experiences = Experience.objects.filter(id_user=user_id)

            # Create a file name and sanitize it to prevent path traversal
            file_name = f"CV_{user.email}.pdf"
            print ("hiiiiiiiiiiiiiiii2")
            file_name = os.path.basename(file_name)  # Remove any path traversal characters

            # Ensure the 'cvs' folder exists
            file_path = os.path.join(settings.MEDIA_ROOT, 'cvs', file_name)
            if not os.path.exists(os.path.dirname(file_path)):
                os.makedirs(os.path.dirname(file_path))

            # Create the PDF
            pdf_canvas = canvas.Canvas(file_path, pagesize=letter)
            width, height = letter  # Standard letter size

            # Add user info
            pdf_canvas.setFont("Helvetica-Bold", 16)
            pdf_canvas.drawString(50, height - 50, f"{etudiant.nom} {etudiant.prenom}")
            pdf_canvas.setFont("Helvetica", 12)
            pdf_canvas.drawString(50, height - 70, f"Email: {user.email}")

            # Add skills
            pdf_canvas.setFont("Helvetica-Bold", 14)
            pdf_canvas.drawString(50, height - 110, "Skills:")
            pdf_canvas.setFont("Helvetica", 12)
            skills_list = etudiant.skills.split(",")  # Assuming skills are stored as comma-separated values
            y_position = height - 130
            for skill in skills_list:
                pdf_canvas.drawString(70, y_position, f"• {skill.strip()}")
                y_position -= 20  # Move down for the next skill

            # Add experience
            pdf_canvas.setFont("Helvetica-Bold", 14)
            pdf_canvas.drawString(50, y_position, "Experience:")
            pdf_canvas.setFont("Helvetica", 12)
            y_position -= 20
            for exp in experiences:
                pdf_canvas.setFont("Helvetica-Bold", 12)
                pdf_canvas.drawString(50, y_position, f"{exp.role} ({exp.date_debut} - {exp.date_fin})")
                y_position -= 20
                pdf_canvas.setFont("Helvetica", 12)
                description_lines = simpleSplit(exp.description, "Helvetica", 12, width - 100)
                for line in description_lines:
                    pdf_canvas.drawString(70, y_position, line)
                    y_position -= 20

            # Save PDF to the file system
            pdf_canvas.save()
            
            print ("hiiiiiiiiiiiiiiii")
        
            # Now open the file and save it to the database
            with open(file_path, 'rb') as pdf_file:

                cv_instance, created = CV.objects.update_or_create(
                    id_user=user,
                    defaults={'fichier': File(pdf_file, name=file_name)},
                )

            return Response({"message": "CV generated successfully"}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Etudiant.DoesNotExist:
            return Response({'error': 'Etudiant not found'}, status=status.HTTP_404_NOT_FOUND)
        except Experience.DoesNotExist:
            return Response({'error': 'No experiences found for this user'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)