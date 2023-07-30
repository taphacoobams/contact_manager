from django.db import models

class Contact(models.Model):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    adresse = models.CharField(max_length=255)
    email = models.EmailField()
    telephone = models.CharField(max_length=20)
    description = models.TextField()

    def __str__(self):
        return self.nom
