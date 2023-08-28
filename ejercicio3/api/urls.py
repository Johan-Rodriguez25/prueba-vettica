from django.urls import path
from knox import views as knox_views
from .api import RegistrationAPIView, LoginAPIView, UserAPIView
from .views import ValidateCardAPIView, CardInfoAPIView, CardBalanceAPIView

urlpatterns = [
    path('register/', RegistrationAPIView.as_view()),
    path('login/', LoginAPIView.as_view()),
    path('user/', UserAPIView.as_view()),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path('validateCard/', ValidateCardAPIView.as_view()),
    path('cardInfo/', CardInfoAPIView.as_view()),
    path('cardBalance/', CardBalanceAPIView.as_view())
]