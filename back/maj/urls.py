from django.urls import path
from .views import UpdateSkills ,AddExperience ,UpdateQuest ,CreateOpportunity , CreateEvent

urlpatterns = [
    path('Quest/', UpdateQuest.as_view(), name='Quest'),
    path('skills/', UpdateSkills.as_view(), name='UpdateSkills'),
    path('Expert/', AddExperience.as_view(), name='Expert'),
    path('Opps/', CreateOpportunity.as_view(), name='opps'),
    path('event/', CreateEvent.as_view(), name='event'),
]