from django.urls import path
from .views import UpdateSkills ,AddExperience ,UpdateQuest

urlpatterns = [
    path('Quest/', UpdateQuest.as_view(), name='Quest'),
    path('skills/', UpdateSkills.as_view(), name='UpdateSkills'),
    path('Expert/', AddExperience.as_view(), name='Expert'),
    

]
