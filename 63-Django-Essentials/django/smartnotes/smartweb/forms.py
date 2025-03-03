from django import forms
from .models import Journal
import re

class BasicJournalForm(forms.Form):
    title = forms.CharField(
        max_length=100, 
        required=True, 
        label="Journal Title", 
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter title'})
    )
    content = forms.CharField(
        widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 5, 'placeholder': 'Write your journal entry...'}),
        required=True,
        label="Content"
    )
    email = forms.EmailField(
        required=True, 
        label="Your Email",
        widget=forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Enter your email'})
    )
    date = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        label="Date"
    )
    
class JournalWidgetForm(forms.ModelForm):
    """
    Demonstrates all built-in Django form widgets.
    """
    
    # Text-based widgets
    text_input = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}))
    text_area = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 3}))
    
    # Boolean & Choice widgets
    checkbox = forms.BooleanField(required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    radio_choices = forms.ChoiceField(
        choices=[('public', 'Public'), ('private', 'Private')],
        widget=forms.RadioSelect(attrs={'class': 'form-check-input'})
    )
    select_choice = forms.ChoiceField(
        choices=[('draft', 'Draft'), ('published', 'Published')],
        widget=forms.Select(attrs={'class': 'form-select'})
    )
    multiple_select = forms.MultipleChoiceField(
        choices=[('work', 'Work'), ('personal', 'Personal'), ('study', 'Study')],
        widget=forms.SelectMultiple(attrs={'class': 'form-select'})
    )
    
    # Numeric widgets
    integer_input = forms.IntegerField(widget=forms.NumberInput(attrs={'class': 'form-control'}))
    decimal_input = forms.DecimalField(widget=forms.NumberInput(attrs={'class': 'form-control'}))
    float_input = forms.FloatField(widget=forms.NumberInput(attrs={'class': 'form-control'}))
    
    # Date & Time widgets
    date_input = forms.DateField(widget=forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}))
    time_input = forms.TimeField(widget=forms.TimeInput(attrs={'class': 'form-control', 'type': 'time'}))
    datetime_input = forms.DateTimeField(widget=forms.DateTimeInput(attrs={'class': 'form-control', 'type': 'datetime-local'}))
    
    # Email & URL widgets
    email_input = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'form-control'}))
    url_input = forms.URLField(widget=forms.URLInput(attrs={'class': 'form-control'}))
    
    # File Upload
    file_upload = forms.FileField(widget=forms.ClearableFileInput(attrs={'class': 'form-control'}))

    class Meta:
        model = Journal
        fields = ['title', 'content']  # Only keeping relevant model fields
        
    def clean_text_input(self):
        text_input = self.cleaned_data.get('text_input')
        if not text_input.startswith('Django'):
            raise forms.ValidationError("Text must start with 'Django'.")
        return text_input

    def clean_email_input(self):
        email = self.cleaned_data.get('email_input')
        if not email.endswith('@example.com'):
            raise forms.ValidationError("Email must end with '@example.com'.")
        return email

    def clean_integer_input(self):
        value = self.cleaned_data.get('integer_input')
        if value % 2 != 0:
            raise forms.ValidationError("Only even numbers are allowed.")
        return value

    def clean_url_input(self):
        url = self.cleaned_data.get('url_input')
        if url and not re.match(r'^https?://', url):
            raise forms.ValidationError("URL must start with 'http://' or 'https://'.")
        return url
    
class JournalForm(forms.ModelForm):
    class Meta:
        model = Journal
        fields = ['title', 'content', 'file_upload']

        # Custom Labels
        labels = {
            'title': 'Journal Title',
            'content': 'Journal Content',
            'file_upload': 'Upload Image',
        }
        # Custom Widgets for better styling
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter a title'}),
            'content': forms.Textarea(attrs={'class': 'form-control', 'rows': 5, 'placeholder': 'Write your content here...'}),
            'file_upload': forms.ClearableFileInput(attrs={'class': 'form-control'})
        }
        
    def clean_title(self):
        title = self.cleaned_data['title']
        if len(title) < 5:
            raise forms.ValidationError('Title must be at least 5 characters long.')
        return title