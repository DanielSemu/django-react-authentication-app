from rest_framework import serializers

from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =CustomUser
        fields =['id','full_name','email', 'role']