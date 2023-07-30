from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('id',
                  'nom',
                  'prenom',
                  'adresse',
                  'email',
                  'telephone',
                  'description',
                  )
