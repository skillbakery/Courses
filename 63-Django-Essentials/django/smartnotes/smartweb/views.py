from django.shortcuts import render,get_object_or_404
from django.views.generic import TemplateView,DetailView,ListView,CreateView,UpdateView,DeleteView
from django.views.generic.edit import FormView
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.forms import UserCreationForm
from django.core.files.storage import FileSystemStorage
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.http import Http404
from django.urls import reverse_lazy
from .forms import JournalForm,JournalWidgetForm,BasicJournalForm
from .models import Journal
import boto3
from django.conf import settings

class BasicJournalFormView(FormView):
    template_name = 'smartweb/basic_form.html'
    form_class = BasicJournalForm
    success_url = reverse_lazy('basic-form-success')

    def form_valid(self, form):
        """Handles form submission when data is valid."""
        submitted_data = form.cleaned_data
        return self.render_to_response(self.get_context_data(form=form, submitted_data=submitted_data))

def widget_demo_view(request):
    form = JournalWidgetForm()
    
    if request.method == "POST":
        form = JournalWidgetForm(request.POST, request.FILES)
        if form.is_valid():
            journal_entry = form.save(commit=False)  # ✅ Don't save yet
            journal_entry.user = request.user  # ✅ Assign the logged-in user
            journal_entry.save()  # ✅ Now save the journal entry

            # Now, handle the file upload manually
            uploaded_file = form.cleaned_data.get('file_upload')
            if uploaded_file:
                fs = FileSystemStorage()  # Uses settings.MEDIA_ROOT by default
                filename = fs.save(uploaded_file.name, uploaded_file)
                file_url = fs.url(filename)
            # Form is valid, process data (for now, just print cleaned data)
            print(form.cleaned_data)
            return render(request, 'smartweb/success.html', {'message': 'Form submitted successfully!'})
    
    return render(request, 'smartweb/widget_demo.html', {'form': form})

class CustomLoginView(LoginView):
    template_name = 'smartweb/login.html'

class CustomLogoutView(LogoutView):
    next_page = reverse_lazy('login')

class SignupView(CreateView):
    form_class = UserCreationForm
    template_name = 'smartweb/signup.html'
    success_url = reverse_lazy('login')
    
# def index(request):
#     return render(request,'smartweb/index.html',{'today':datetime.today()})
class JournalDeleteView(LoginRequiredMixin,DeleteView):
    model = Journal
    template_name = 'smartweb/journal_confirm_delete.html'
    success_url = reverse_lazy('journal-list')  # Redirect to list after delete

class JournalUpdateView(LoginRequiredMixin,UpdateView):
    model = Journal
    template_name = 'smartweb/journal_form.html'
    #fields = ['title', 'content']
    form_class = JournalForm  # Use our custom form
    success_url = reverse_lazy('journal-list')

class JournalCreateView(LoginRequiredMixin, CreateView):
    model = Journal
    template_name = 'smartweb/journal_form.html'
    form_class = JournalForm  # Use our custom form
    # fields = ['title', 'content']
    success_url = reverse_lazy('journal-list')
    
    login_url = '/admin'  # Redirects to admin login if not logged in

    def form_valid(self, form):
        form.instance.user = self.request.user  # Assign logged-in user
        response = super().form_valid(form)
        file = self.request.FILES.get("file_upload")
        if file:
            print(f"DEBUG: File received - Name: {file.name}, Size: {file.size} bytes")
            # Read some bytes to ensure content exists
            file.seek(0)  # Move to start of file
            first_bytes = file.read(10)
            print("DEBUG: First 10 bytes of file:", first_bytes)
            file.seek(0)  # Reset pointer for upload

            s3 = boto3.client(
                "s3",
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_S3_REGION_NAME
            )

            bucket_name = settings.AWS_STORAGE_BUCKET_NAME
            file_path = f"uploads/{file.name}"

            try:
                #Upload file and ensure content is not empty
                s3.upload_fileobj(file, bucket_name, file_path, ExtraArgs={'ACL': 'public-read'})
                print(f"File '{file.name}' uploaded to S3 at '{file_path}'!")

                #Store S3 file path in the model
                form.instance.file_upload.name = file_path  
            except Exception as e:
                print("Error uploading to S3:", e)

        response = super().form_valid(form)

        # Debug: Check if the file was saved correctly
        if self.object.file_upload:
            print("File saved in DB with URL:", self.object.file_upload.url)
        else:
            print("File was not saved!")

        return response

class IndexView(TemplateView):
    template_name = 'smartweb/index.html'
    extra_context = {'today':datetime.today()}

# @login_required(login_url='/admin')
# def authorized(request):
#     return render(request,'smartweb/authorized.html',{})

class AuthorizedView(LoginRequiredMixin, TemplateView):
    template_name = 'smartweb/authorized.html'
    login_url = '/admin'  # Redirects to the admin login page if user is not logged in

# def list(request):
#     all_journals = Journal.objects.all()
#     return render(request,'smartweb/journal_list.html',{'journal':all_journals})

class JournalListView(LoginRequiredMixin,ListView):
    model = Journal
    context_object_name = "journal"
    template_name = 'smartweb/journal_list.html'
    login_url = '/admin'

    def get_queryset(self):
        """Filter journals to show only the logged-in user's entries."""
        return Journal.objects.filter(user=self.request.user)

# def detail(request,pk):
#     try:
#         journal_entry = Journal.objects.get(pk=pk)
#     except Journal.DoesNotExist:
#         raise Http404("Journal entry not found")

#     return render(request,'smartweb/journal_detail.html',{'journal':journal_entry})

class JournalDetailView(DetailView):
    model = Journal
    context_object_name="journal"
    template_name = "smartweb/journal_detail.html"

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from .models import Journal
from .serializers import JournalSerializer

class JournalListAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access

    def get(self, request):
        journals = Journal.objects.all()
        serializer = JournalSerializer(journals, many=True)
        return Response(serializer.data)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return Response({"access": response.data["access"], "refresh": response.data["refresh"]}, status=status.HTTP_200_OK)

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return Response({"access": response.data["access"]}, status=status.HTTP_200_OK)    
