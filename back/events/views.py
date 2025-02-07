from django.shortcuts import render
from rest_framework.views import APIView
from bdd.models import Event , Opportunities
from bdd.serializers import EventSerializer , OpportunitiesSerializer
from rest_framework.response import Response
from rest_framework import status

class events (APIView):
 
 def get (self, request, *args, **kwargs):
 
    # Start with all events
    events = Event.objects.all()
    serliazer_events = EventSerializer(events , many=True).data     

    return Response(
                {"message": "User created successfully", "events": serliazer_events},
                status=status.HTTP_201_CREATED,
        )
      

class opps (APIView):
 
 def get (self, request, *args, **kwargs):
 
    # Start with all events
    opps = Opportunities.objects.all()
    serliazer_opps = OpportunitiesSerializer(opps , many=True).data     

    return Response(
                {"message": "User created successfully", "Opportunities": serliazer_opps},
                status=status.HTTP_201_CREATED,
        )
      

