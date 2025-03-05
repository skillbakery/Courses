from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Journal

# Signal to notify when a new Journal is created
@receiver(post_save, sender=Journal)
def notify_on_new_entry(sender, instance, created, **kwargs):
    if created:
        print(f"New journal entry created: {instance.title}")

# Signal to log when a Journal is deleted
@receiver(post_delete, sender=Journal)
def log_deleted_entry(sender, instance, **kwargs):
    print(f"Journal entry deleted: {instance.title}")
