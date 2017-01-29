from django.apps import AppConfig
class CrmreAppConfig(AppConfig):
    name = 'crmreapp'
    verbose_name = "Crmre Application"
    def ready(self):
        from django.contrib.sessions.models import Session
        from crmre import settings
        if not settings.DEBUG:
            Session.objects.all().delete()