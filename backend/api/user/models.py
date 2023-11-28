# from ast import Bytes
import uuid
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)

from scripts.qr import create_qrcode
from core.settings import URL_FRONTEND

ROLE_CHOICES = (
    ('client', 'client'),
    ('admin', 'admin'),
    ('guard', 'guard')
)


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, first_name="", last_name="", **kwargs):
        """Create and return a `User` with an email, username and password."""
        if username is None:
            raise TypeError("Users must have a username.")
        if email is None:
            raise TypeError("Users must have an email.")

        # Identifieds like qrcode in base64 and uuid pure
        [img_str, uuid] = create_qrcode(username, URL_FRONTEND)

        user = self.model(username=username, email=self.normalize_email(email),
                          first_name=first_name, last_name=last_name,
                          qrcode=img_str, uuid=uuid, **kwargs)
        user.set_password(password)        
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError("Superusers must have a password.")
        if email is None:
            raise TypeError("Superusers must have an email.")
        if username is None:
            raise TypeError("Superusers must have an username.")

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.role = 'admin'
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(
        db_index=True, unique=True, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    role = models.CharField(
        max_length=45, choices=ROLE_CHOICES, default='client')

    date = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    uuid = models.CharField(max_length=36, unique=True, db_index=True)
    qrcode = models.CharField(max_length=1000, unique=False)
    cedula = models.CharField(max_length=10, unique=True)

    # TODO: agregar estos dos atributos al modelo
    # permissions
    # roles

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "password"]

    objects = UserManager()

    def __str__(self):
        return f"{self.username}"
