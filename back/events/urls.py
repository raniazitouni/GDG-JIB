from django.urls import path
from .views import events , opps

urlpatterns = [
    path('events/', events.as_view(), name='events'),
    path('opps/', opps.as_view(), name='opps'),

]