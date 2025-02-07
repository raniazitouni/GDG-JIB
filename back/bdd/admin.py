# Register your models here.
from django.contrib import admin
from .models import User, Club, Event, Participant, Etudiant, Experience, Entreprise, Opportunities, CV, Notification , Quest

admin.site.register(User)
admin.site.register(Club)
admin.site.register(Event)
admin.site.register(Participant)
admin.site.register(Etudiant)
admin.site.register(Experience)
admin.site.register(Entreprise)
admin.site.register(Opportunities)
admin.site.register(CV)
admin.site.register(Notification)
admin.site.register(Quest)

