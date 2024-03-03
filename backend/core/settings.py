"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 3.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

import os
import environ
from pathlib import Path
from django.core.management.utils import get_random_secret_key

env = environ.Env()
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# ?: Se utiliza esta variable constante para obtener la url del frontend
URL_FRONTEND = env('URL_FRONTEND', default='http://127.0.0.1:3000')

SENDER_EMAIL = env('SENDER_EMAIL')
SENDER_PASSWORD = env('SENDER_PASSWORD')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY', default=get_random_secret_key())

# SECURITY WARNING: don't run with debug turned on in production!
try:
    # expects 1 or 0
    DEBUG = int(os.environ.get("DEBUG", default=0))
except:
    DEBUG = False

ALLOWED_HOSTS = env("DJANGO_ALLOWED_HOSTS", default="*").split(",")

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "api",
    "api.user",
    "api.authentication",
    "parking"
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": env("DB_ENGINE", default="django.db.backends.sqlite3"),
        "NAME": env("DB_DATABASE", default=os.path.join(BASE_DIR, "db.sqlite3")),
        "USER": env("DB_USER", default=None),
        "PASSWORD": env("DB_PASSWORD", default=None),
        "HOST": env("DB_HOST", default=None),
        "PORT": env("DB_PORT", default=None),
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "es-EC"

# TIME_ZONE = "UTC"
TIME_ZONE = "America/Guayaquil"

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = "/static/"

# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS=[
    os.path.join(BASE_DIR,'static')
]
STATIC_ROOT=os.path.join(BASE_DIR,'static') 

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Custom user Model
AUTH_USER_MODEL = "api_user.User"

# ##################################################################### #
# ################### REST FRAMEWORK             ###################### #
# ##################################################################### #

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "api.authentication.backends.ActiveSessionAuthentication",
    ),
    "DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",),
}

# ##################################################################### #
#  CORS
# ##################################################################### #

CORS_ALLOW_ALL_ORIGINS = True

# Load the default ones
CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]

# Leaded from Environment
# CORS_ALLOWED_ORIGINS_ENV = env("CORS_ALLOWED_ORIGINS", default=None)

# if CORS_ALLOWED_ORIGINS_ENV:
#     CORS_ALLOWED_ORIGINS += CORS_ALLOWED_ORIGINS_ENV.split(' ')


# ##################################################################### #
#  TESTING
# ##################################################################### #

# TESTING = False
# TEST_RUNNER = "core.test_runner.CoreTestRunner"

# GitHub social authentication
# GITHUB_CLIENT_ID = env('GITHUB_CLIENT_ID')
# GITHUB_SECRET_KEY = env('GITHUB_SECRET_KEY')


