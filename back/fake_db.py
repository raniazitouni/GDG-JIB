import os
from faker import Faker
import random

# Set the Django settings module before importing django
os.environ['DJANGO_SETTINGS_MODULE'] = 'api.settings'

import django
django.setup()

from bdd.models import User, Club, Event, Participant, Etudiant, Experience, Entreprise, Opportunities, CV, Notification

fake = Faker()

# Enum Choices
ROLES = ['entreprise', 'etudiant', 'club']
EVENT_TYPES = ['hackathon', 'conference', 'tournoi']
EXPERIENCE_TYPES = ['projet', 'entretien']
OPP_TYPES = ['pfe', 'technique', 'ouvrier']
NOTIF_ETAT = ['validé', 'non validé']

# --- CREATE USERS ---
users = []
for _ in range(10):
    user = User.objects.create(
        email=fake.email(),
        password=fake.password(),
        role=random.choice(ROLES)
    )
    users.append(user)

# --- CREATE CLUBS ---
for user in users:
    if user.role == 'club':
        Club.objects.create(
            id_user=user,
            nom=fake.company(),
            description=fake.text()
        )

# --- CREATE STUDENTS ---
for user in users:
    if user.role == 'etudiant':
        Etudiant.objects.create(
            id_user=user,
            nom=fake.last_name(),
            prenom=fake.first_name(),
            skills=fake.text()
        )

# --- CREATE ENTREPRISES ---
for user in users:
    if user.role == 'entreprise':
        Entreprise.objects.create(
            id_user=user,
            nom=fake.company()
        )

# --- CREATE EVENTS ---
events = []
for _ in range(5):
    event = Event.objects.create(
        nom=fake.word(),
        id_user=random.choice(users),
        date=fake.date_this_year(),
        time=fake.time(),
        domaine=fake.job(),
        type=random.choice(EVENT_TYPES),
        wilaya=fake.city()
    )
    events.append(event)

# --- CREATE PARTICIPANTS ---
for _ in range(10):
    # Ensure no duplicate participant with the same user and event
    user = random.choice(users)
    event = random.choice(events)

    # Check if the participant already exists
    if not Participant.objects.filter(id_user=user, id_event=event).exists():
        Participant.objects.create(
            id_user=user,
            id_event=event
        )

# --- CREATE EXPERIENCES ---
for _ in range(7):
    Experience.objects.create(
        id_user=random.choice(users),
        date_debut=fake.date_this_decade(),
        date_fin=fake.date_this_decade(),
        domaine=fake.job(),
        description=fake.text(),
        type=random.choice(EXPERIENCE_TYPES)
    )

# --- CREATE OPPORTUNITIES ---
opportunities = []
for _ in range(5):
    opportunity = Opportunities.objects.create(
        id_user=random.choice(users),
        type=random.choice(OPP_TYPES)
    )
    opportunities.append(opportunity)

# --- CREATE CVs ---
cvs = []
for _ in range(5):
    cv = CV.objects.create(
        fichier="cvs/sample.pdf",
        id_user=random.choice(users)
    )
    cvs.append(cv)

# --- CREATE NOTIFICATIONS ---
for _ in range(5):
    Notification.objects.create(
        id_user=random.choice(users),
        id_cv=random.choice(cvs),
        id_opp=random.choice(opportunities),
        etat=random.choice(NOTIF_ETAT)
    )

if __name__ == "__main__":
    print("Populating database...")
    # Your database logic runs when executed as a script
    print("✅ Database populated successfully!")
