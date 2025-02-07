from django.urls import path
from .views import search_events , search_opp

urlpatterns = [
    path('events/', search_events.as_view(), name='search_events'),
    path('opportunities/', search_opp.as_view(), name='search_opps'),
]
