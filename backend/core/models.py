from django.contrib.auth.models import AbstractBaseUser,BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self,email,full_name, password=None, **extra_fields):
        """Create and return a regular User"""
        if not email:
            raise ValueError("The Email Field must be set")
        
        email=self.normalize_email(email)
        user=self.model(email=email, full_name=full_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,email, full_name,password=None, **extra_fields):
        """Create and return superuser"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email,full_name,password,**extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """Create custom user model"""
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('user', 'User'),
    )
    GENDER_CHOICES=[
        ('M','Male'),
        ('F','Female')
    ]
    email=models.EmailField(unique=True)
    full_name=models.CharField(max_length=255)
    birthdate=models.DateField(null=True, blank=True)
    phone_number=models.CharField(max_length=15)
    gender=models.CharField(max_length=1,choices=GENDER_CHOICES, null=True, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)

    objects=CustomUserManager()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['full_name']

    def __str__(self):
        return f"{self.email} ({self.role})"
