#!/usr/bin/env python
# -*- coding: utf-8 -*-

import socket
import os
from datetime import timedelta

if socket.gethostname() == 'develop' or socket.gethostname() == 'asus_m50' or socket.gethostname() == 'Home' or socket.gethostname() == 'SHRKI-Tech':
    DEBUG = True
    EMAIL_CONG = {'DEFAULT_FROM_EMAIL':'chaos777@mail.ru','EMAIL_HOST':'smtp.mail.ru',
             'EMAIL_HOST_USER':'chaos777@mail.ru','EMAIL_HOST_PASSWORD':'****','EMAIL_PORT':25}
    DBASE_HOST = '192.168.56.1'
else:
    DEBUG = False
    EMAIL_CONG = {'DEFAULT_FROM_EMAIL':'noreplay@rn43.ru','EMAIL_HOST':'192.168.5.254',
             'EMAIL_HOST_USER':'noreplay@rn43.ru','EMAIL_HOST_PASSWORD':'noreplay2013','EMAIL_PORT':25}
    DBASE_HOST = '127.0.0.1'

#разрешаем доступ для всех узлов
ALLOWED_HOSTS = ['*']

ADMINS = (
    ('Khodyrev Dmitry', 'chaos777@mail.ru'),
)
SERVER_EMAIL = 'noreplay@rn43.ru'

MANAGERS = ADMINS

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'crmredb',              
        'USER': 'admin',                
        'PASSWORD': 'admin11',          
        'HOST': DBASE_HOST,             
        'PORT': '',                     
    }
}

ATOMPARKSMS = {
    'USER': 'chaos777@mail.ru',
    'PASSWORD': 'sendsms911',              
    'SENDER': 'RUSREALTY',                
    'GATEWAY_URL': 'http://atompark.com/members/sms/xml.php',          
}

########## Celery

os.environ["CELERY_LOADER"] = "django"

# Sensible settings for celery
CELERY_ENABLE_UTC  = True
CELERY_TIMEZONE = 'Europe/Moscow'
CELERY_ALWAYS_EAGER = False # for debuging True
CELERY_ACKS_LATE = True
CELERY_TASK_PUBLISH_RETRY = True
CELERY_DISABLE_RATE_LIMITS = False

# адрес redis сервера
BROKER_URL = 'amqp://guest:guest@localhost:5672//'
# храним результаты выполнения задач так же в redis
CELERY_RESULT_BACKEND = 'amqp://guest:guest@localhost:5672//'
# Время, через которое хранимый в результат будет удалён: 7 дней
CELERY_TASK_RESULT_EXPIRES = 600#7*86400
# это нужно для мониторинга наших воркеров
CELERY_SEND_EVENTS = True
# место хранения периодических задач (данные для планировщика)
CELERYBEAT_SCHEDULER = "djcelery.schedulers.DatabaseScheduler"

CELERY_TASK_SERIALIZER = "json"
CELERY_ACCEPT_CONTENT = ['application/json']

CELERYCAM_EXPIRE_SUCCESS = timedelta(days=1)
CELERYCAM_EXPIRE_ERROR = timedelta(days=3)
CELERYCAM_EXPIRE_PENDING = timedelta(days=5)

import djcelery
djcelery.setup_loader()

########## END Celery

TIME_ZONE = 'Europe/Moscow'

LANGUAGE_CODE = 'ru-RU'
DATE_FORMAT = 'Y-m-d'
DATETIME_FORMAT = 'Y-m-d H:i'
DATE_INPUT_FORMATS = ('%Y-%m-%d',)
DATETIME_INPUT_FORMATS = ('%Y-%m-%d %H:%M',)

SITE_ID = 1

USE_I18N = True

USE_L10N = False

USE_TZ = False

AUTH_USER_MODEL = 'crmreauth.User'

PROJECT_PATH = os.path.dirname(__file__)
MEDIA_ROOT = os.path.join(os.path.split(PROJECT_PATH)[0],"crmreapp/media")

MEDIA_URL = '/media/'

STATICFILES_DIRS = ()
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(os.path.split(PROJECT_PATH)[0],"crmreapp/static")
#Email configure
DEFAULT_FROM_EMAIL = EMAIL_CONG['DEFAULT_FROM_EMAIL']
EMAIL_USE_TLS = False
EMAIL_HOST = EMAIL_CONG['EMAIL_HOST']
EMAIL_HOST_USER = EMAIL_CONG['EMAIL_HOST_USER']
EMAIL_HOST_PASSWORD = EMAIL_CONG['EMAIL_HOST_PASSWORD']
EMAIL_PORT = EMAIL_CONG['EMAIL_PORT']

TINYMCE_JS_URL = os.path.join(STATIC_URL, "tiny_mce/tiny_mce.js")
TINYMCE_JS_ROOT = os.path.join(STATIC_URL, "tiny_mce/tiny_mce")

TINYMCE_PLUGINS = [
    'table',
    'advlink',
    'advimage',
    'iespell',
    'inlinepopups',
    'media',
    'style',
    'searchreplace',
    'contextmenu',
    'paste',
    'wordcount',
    'pagebreak'
]

TINYMCE_DEFAULT_CONFIG={
    'theme' : "advanced",
    'width': "100%",
    'height': "500px",
    'plugins' : ",".join(TINYMCE_PLUGINS),
    'language' : 'ru',
    'theme_advanced_buttons1_add':"fontselect,fontsizeselect,forecolor,backcolor",
    'theme_advanced_buttons2_add':"pagebreak",
    'theme_advanced_buttons3_add': "tablecontrols",
    'theme_advanced_toolbar_location' : "top",
    'theme_advanced_toolbar_align' : "left",
    'theme_advanced_statusbar_location' : "bottom",
    'theme_advanced_resizing' : True,

    'pagebreak_separator' : "<!--pagebreak-->"
}

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#   'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

SECRET_KEY = 't!ji14js0k%pl0^p5&box0=xo7q8#@q1v%p92$d(o=$cq-q9nj'

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
)

ROOT_URLCONF = 'crmre.urls'

WSGI_APPLICATION = 'crmre.wsgi.application'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(os.path.split(PROJECT_PATH)[0],"crmreapp/templates")
        ],
        #'APP_DIRS': True,
        'OPTIONS': {
            'debug': True,
            'context_processors': [
                "django.contrib.auth.context_processors.auth",
                "django.core.context_processors.debug",
                "django.core.context_processors.i18n",
                "django.core.context_processors.media",
                "django.core.context_processors.static",
                "django.core.context_processors.tz",
                "django.contrib.messages.context_processors.messages",
                'django.core.context_processors.request'
            ],
            'loaders': [
                'admin_tools.template_loaders.Loader',
                'django.template.loaders.filesystem.Loader',
                'django.template.loaders.app_directories.Loader',
                'django.template.loaders.eggs.Loader',
            ]
        },
    },
]

INSTALLED_APPS = (
    'django.contrib.contenttypes',
    'admin_tools',
    'admin_tools.dashboard',
    'django.contrib.auth',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
    'rest_framework',
    'tinymce',
    'djcelery',
    'crmreauth',
    'rapidsms',
    'rapidsms.router.db',
    'crmreapp',
    'smsapp',

)

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.DjangoModelPermissions',),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGINATE_BY_PARAM': 'limit',
    #'PAGE_SIZE': 10,
}

########## Rapid SMS
INSTALLED_BACKENDS = {
    "kannel-beeline-smpp" : {
        "ENGINE":  "rapidsms.backends.kannel.KannelBackend",
        "sendsms_url": "http://127.0.0.1:13013/cgi-bin/sendsms",
        "sendsms_params": {
             "from": "RUSREALTY",
             "username": "rapidsms",
             "password": "rapidsms1511"
        },
        "coding": 2,
        "charset": "utf-8",
        "encode_errors": "ignore", # strip out unknown (unicode) characters
    },
}
#RAPIDSMS_ROUTER = "rapidsms.router.blocking.BlockingRouter"
#RAPIDSMS_ROUTER = "rapidsms.router.celery.CeleryRouter"
RAPIDSMS_ROUTER = "rapidsms.router.db.DatabaseRouter"
DB_ROUTER_DEFAULT_BATCH_SIZE = 200
SMS_APPS = ['smsapp']
########## END Rapid SMS

IMAGEKIT_DEFAULT_CACHEFILE_BACKEND = 'imagekit.cachefiles.backends.Simple'
ADMIN_TOOLS_INDEX_DASHBOARD = 'crmreapp.dashboard.CustomIndexDashboard'
ADMIN_TOOLS_THEMING_CSS = 'css/admin_tools_theming.css'
TEST_RUNNER = 'django.test.runner.DiscoverRunner'
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(os.path.split(PROJECT_PATH)[0],"log/debug.log"),
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}