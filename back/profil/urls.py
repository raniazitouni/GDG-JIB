from django.urls import path
from .views import QuestResponses , EtudiantData , UserProfileData ,GenerateCV ,CreateNotification

urlpatterns = [
    path('quest/<int:user_id>/', QuestResponses.as_view(), name='get_quest_responses'),
    path('data/<int:user_id>/', EtudiantData.as_view(), name='get_data_student'),
    path('generate_cv/<int:user_id>/', GenerateCV.as_view(), name='generate_cv'),
    path('data_user/<int:user_id>/' , UserProfileData.as_view(), name='get_data_user' ) ,
    path('notif/' , CreateNotification.as_view(), name='notif' )  ,

]
