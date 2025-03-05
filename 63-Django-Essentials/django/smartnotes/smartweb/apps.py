from django.apps import AppConfig


class SmartwebConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'smartweb'

    def ready(self):
        import smartweb.signals