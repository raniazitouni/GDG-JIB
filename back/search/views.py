from django.shortcuts import render
from rest_framework.views import APIView
from bdd.models import Event , Opportunities
from bdd.serializers import EventSerializer , OpportunitiesSerializer
from rest_framework.response import Response
from rest_framework import status

class search_events (APIView):
 
 def post (self, request, *args, **kwargs):

    formData = request.data.get('formData', {})
    domaine = formData.get('domaine', '').lower()
    wilaya = formData.get('wilaya', '').lower()
    type_event = formData.get('type', '').lower()
    nom = request.data.get('searchValue', '').lower()

    print ( 'hiiiiii' + type_event)

    # Start with all events
    events = Event.objects.all()

    # Apply filters dynamically
    if nom :
        events = events.filter(nom__icontains=nom)
    if domaine:
        events = events.filter(domaine__icontains=domaine)
    if wilaya:
        events = events.filter(wilaya__icontains=wilaya)
    if type_event:
        events = events.filter(type__icontains=type_event)

    serliazer_events = EventSerializer(events , many=True).data     

    return Response(
                {"message": "User created successfully", "events": serliazer_events},
                status=status.HTTP_201_CREATED,
        )
      


class search_opp (APIView):
 
 def post (self, request, *args, **kwargs):
    
    formData = request.data.get('formData', {})
    domaine = formData.get('domaine', '').lower()
    duree = formData.get('duree', '').lower()
    type_opp = formData.get('type', '').lower()
    title = request.data.get('searchValue', '').lower()

   

    print ( 'hiiiiii' + type_opp)

    # Start with all events
    opps = Opportunities.objects.all()

    # Apply filters dynamically
    if title :
        opps = opps.filter(title__icontains=title)
    if domaine:
        opps = opps.filter(domaine__icontains=domaine)
    if duree:
        opps = opps.filter(duree__icontains=duree)
    if type_opp:
        opps = opps.filter(type__icontains=type_opp)

    serliazer_opp = OpportunitiesSerializer(opps , many=True).data     

    return Response(
                {"message": "User created successfully", "Opportunities": serliazer_opp},
                status=status.HTTP_201_CREATED,
        )
      


      