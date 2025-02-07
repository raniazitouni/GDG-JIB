from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from bdd.models import Etudiant, Experience, User , Quest


class UpdateQuest(APIView):
    def post(self, request):
        try:
            # Fetch the existing Quest object for the user
            user_id = request.data.get('user_id')
            quest = Quest.objects.get(id_user=user_id)

            # Update the responses only if the new response is provided, else retain the old value
            resp_one = request.data.get('resp_one', quest.resp_one)  # Use old value if not provided
            resp_two = request.data.get('resp_two', quest.resp_two)  # Use old value if not provided
            resp_three = request.data.get('resp_three', quest.resp_three)  # Use old value if not provided

            # Save the updated Quest object
            quest.resp_one = resp_one
            quest.resp_two = resp_two
            quest.resp_three = resp_three
            quest.save()

            return Response({"message": "Quest updated successfully"}, status=status.HTTP_200_OK)

        except Quest.DoesNotExist:
            return Response({"error": "Quest not found for this user"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



class UpdateSkills(APIView):
    def post(self, request):
        try:
            # Fetch the user and the related Etudiant
            user_id = request.data.get("user_id")
            etudiant = Etudiant.objects.get(id_user=user_id)

            # Get the new skill from the request data
            new_skill = request.data.get("skill")

            if not new_skill:
                return Response({"error": "No skill provided"}, status=status.HTTP_400_BAD_REQUEST)

            # Fetch the current skills, ensuring we only append unique skills
            current_skills = etudiant.skills.split(",") if etudiant.skills else []

            # Add the new skill if it's not already in the list
            if new_skill not in current_skills:
                current_skills.append(new_skill)

            # Convert the list back into a comma-separated string
            skills_str = ",".join(current_skills)

            # Update the skills field of the Etudiant model
            etudiant.skills = skills_str
            etudiant.save()

            return Response({"message": "Skill added successfully"}, status=status.HTTP_200_OK)

        except Etudiant.DoesNotExist:
            return Response({'error': 'Etudiant not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        




class AddExperience(APIView):
    def post(self, request):
        try:
            # Get the user ID and the new experience data from the request
            user_id = request.data.get("user_id")
            description = request.data.get("description")
            role = request.data.get("role")
            date_range = request.data.get("date")  # Expecting format like "2015-2016"
            

            # Validate the input
            if not user_id or not description or not role or not date_range :
                return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

            # Split the date_range into two parts (start year and end year)
            try:
                date_debut_year, date_fin_year = date_range.split("-")
                date_debut = f"{date_debut_year}-01-01"  # Assuming start date is Jan 1 of the start year
                date_fin = f"{date_fin_year}-12-31"  # Assuming end date is Dec 31 of the end year
            except ValueError:
                return Response({"error": "Invalid date format. Expected format: YYYY-YYYY"}, status=status.HTTP_400_BAD_REQUEST)

            # Create a new Experience object and save it
            user = User.objects.get(id_user=user_id)
            experience = Experience.objects.create(
                id_user=user,
                role=role,
                description=description,
                date_debut=date_debut,
                date_fin=date_fin,
                type="projet"
            )

            return Response({"message": "Experience added successfully"}, status=status.HTTP_201_CREATED)

        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

