from django.db import models

# Enum Choices
ROLE_CHOICES = [
    ('entreprise', 'Entreprise'),
    ('etudiant', 'Etudiant'),
    ('club', 'Club'),
]

EVENT_TYPE_CHOICES = [
    ('hackathon', 'Hackathon'),
    ('conference', 'Conférence'),
    ('tournoi', 'Tournoi'),
]

EXPERIENCE_TYPE_CHOICES = [
    ('projet', 'Projet'),
    ('entretien', 'Entretien'),
]

OPPORTUNITY_TYPE_CHOICES = [
    ('pfe', 'PFE'),
    ('technique', 'Technique'),
    ('ouvrier', 'Ouvrier'),
]

NOTIF_ETAT_CHOICES = [
    ('validé', 'Validé'),
    ('non validé', 'Non Validé'),
]

# --- USER TABLE ---
class User(models.Model):
    id_user = models.AutoField(primary_key=True)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

  


# --- CLUB TABLE ---
class Club(models.Model):
    id_user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    nom = models.CharField(max_length=255)
    description = models.TextField()

   

# --- EVENT TABLE ---
class Event(models.Model):
    id_event = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.CharField(max_length=50)
    domaine = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=EVENT_TYPE_CHOICES)
    wilaya = models.CharField(max_length=100) 
    lien = models.URLField(max_length=500, blank=True, null=True)
    img = models.ImageField(upload_to='event_images/', blank=True, null=True) 
  

 


# --- PARTICIPANT TABLE ---
class Participant(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_event = models.ForeignKey(Event, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('id_user', 'id_event')  # Clé primaire composite


# --- ETUDIANT TABLE ---
class Etudiant(models.Model):
    id_user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    skills = models.TextField( null=True)

    

# --- EXPERIENCE TABLE ---
class Experience(models.Model):
    id_exp = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_debut = models.DateField()
    date_fin = models.DateField()
    role = models.CharField(max_length=255)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=EXPERIENCE_TYPE_CHOICES)

    


# --- ENTREPRISE TABLE ---
class Entreprise(models.Model):
    id_user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    nom = models.CharField(max_length=255)
    description = models.TextField()

  



# --- OPPORTUNITIES TABLE ---
class Opportunities(models.Model):
    id_opp = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)  # Pour l'étudiant
    type = models.CharField(max_length=20, choices=OPPORTUNITY_TYPE_CHOICES)
    title = models.CharField(max_length=20)
    duree =   models.CharField(max_length=20)
    domaine =   models.CharField(max_length=20 ,default="dev")
    description = models.CharField(max_length=255, default="No description available")  # Set default
    location = models.CharField(max_length=20)
    date_debut = models.DateField(default="2025-01-01")
   


# --- CV TABLE ---
class CV(models.Model):
    id_cv = models.AutoField(primary_key=True)
    fichier = models.FileField(upload_to='cvs/')
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)

   

# --- NOTIFICATION TABLE ---
class Notification(models.Model):
    id_notif = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)  # Pour l'entreprise
    id_cv = models.ForeignKey(CV, on_delete=models.CASCADE)
    id_opp = models.ForeignKey(Opportunities, on_delete=models.CASCADE)
    etat = models.CharField(max_length=20, choices=NOTIF_ETAT_CHOICES)

    
class Quest ( models.Model) :
    id_user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)  
    resp_one  = models.CharField(max_length=20 , default='idk' )
    resp_two  = models.CharField(max_length=20 , default='idk' )
    resp_three  = models.CharField(max_length=20 , default='idk' )

