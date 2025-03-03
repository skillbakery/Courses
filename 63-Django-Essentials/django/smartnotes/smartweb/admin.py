from django.contrib import admin
from . import models

@admin.register(models.Journal)
class JournalAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at','user')
    search_fields = ('title', 'content')