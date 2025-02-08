# Generated by Django 5.1.6 on 2025-02-08 05:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id_user', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('role', models.CharField(choices=[('entreprise', 'Entreprise'), ('etudiant', 'Etudiant'), ('club', 'Club')], max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Club',
            fields=[
                ('id_user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='bdd.user')),
                ('nom', models.CharField(max_length=255)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Entreprise',
            fields=[
                ('id_user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='bdd.user')),
                ('nom', models.CharField(max_length=255)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Etudiant',
            fields=[
                ('id_user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='bdd.user')),
                ('nom', models.CharField(max_length=255)),
                ('prenom', models.CharField(max_length=255)),
                ('skills', models.TextField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CV',
            fields=[
                ('id_cv', models.AutoField(primary_key=True, serialize=False)),
                ('fichier', models.FileField(upload_to='cvs/')),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bdd.user')),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id_event', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.TextField(default='')),
                ('nom', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('time', models.CharField(max_length=50)),
                ('domaine', models.CharField(max_length=255)),
                ('type', models.CharField(choices=[('hackathon', 'Hackathon'), ('conference', 'Conférence'), ('tournoi', 'Tournoi')], max_length=20)),
                ('wilaya', models.CharField(max_length=100)),
                ('lien', models.URLField(blank=True, max_length=500, null=True)),
                ('img', models.ImageField(blank=True, null=True, upload_to='event_images/')),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bdd.user')),
            ],
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id_exp', models.AutoField(primary_key=True, serialize=False)),
                ('date_debut', models.DateField()),
                ('date_fin', models.DateField()),
                ('role', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('type', models.CharField(choices=[('projet', 'Projet'), ('entretien', 'Entretien')], max_length=20)),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bdd.user')),
            ],
        ),
        migrations.CreateModel(
            name='Opportunities',
            fields=[
                ('id_opp', models.AutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(choices=[('pfe', 'PFE'), ('technique', 'Technique'), ('ouvrier', 'Ouvrier')], max_length=20)),
                ('title', models.CharField(max_length=20)),
                ('duree', models.CharField(max_length=20)),
                ('domaine', models.CharField(default='dev', max_length=20)),
                ('description', models.CharField(default='No description available', max_length=255)),
                ('location', models.CharField(max_length=20)),
                ('date_debut', models.DateField(default='2025-01-01')),
                ('img', models.ImageField(blank=True, null=True, upload_to='event_images/')),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bdd.user')),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id_notif', models.AutoField(primary_key=True, serialize=False)),
                ('etat', models.CharField(choices=[('validé', 'Validé'), ('non validé', 'Non Validé')], max_length=20)),
                ('cv_path', models.CharField(default='', max_length=500)),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bdd.user')),
                ('id_opp', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bdd.opportunities')),
            ],
        ),
        migrations.CreateModel(
            name='Quest',
            fields=[
                ('id_quest', models.AutoField(primary_key=True, serialize=False)),
                ('resp_one', models.CharField(default='idk', max_length=20)),
                ('resp_two', models.CharField(default='idk', max_length=20)),
                ('resp_three', models.CharField(default='idk', max_length=20)),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bdd.user')),
            ],
        ),
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bdd.event')),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bdd.user')),
            ],
            options={
                'unique_together': {('id_user', 'id_event')},
            },
        ),
    ]
