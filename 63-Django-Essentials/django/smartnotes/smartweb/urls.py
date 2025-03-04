from django.urls import path

from . import views

urlpatterns = [
    # path("",views.index,name="index"),
    path('', views.IndexView.as_view(), name='index'),
    # path("authorized/",views.authorized,name="authorized"),
    path('authorized/', views.AuthorizedView.as_view(), name='authorized'),
    path("journals/",views.JournalListView.as_view(),name="journal-list"),
    path('journal/<int:pk>/', views.JournalDetailView.as_view(), name='journal-detail'), 
    path('journal/new/', views.JournalCreateView.as_view(), name='journal_create'),
    path('journal/<int:pk>/edit/', views.JournalUpdateView.as_view(), name='journal_edit'),
    path('journal/<int:pk>/delete/', views.JournalDeleteView.as_view(), name='journal_delete'),
    path('login/', views.CustomLoginView.as_view(), name='login'),
    path('logout/', views.CustomLogoutView.as_view(), name='logout'),
    path('register/', views.SignupView.as_view(), name='register'),
    path('widget-demo/', views.widget_demo_view, name='widget-demo'),
    path('basic-form/', views.BasicJournalFormView.as_view(), name='basic-form'),
    path('api/journals/', views.JournalListAPIView.as_view(), name='journal-list-api'),
    path('api/token/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Get access & refresh token
    path('api/token/refresh/', views.TokenRefreshView.as_view(), name='token_refresh'),  # Refresh token
]