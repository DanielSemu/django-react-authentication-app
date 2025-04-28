from django.urls import path
from .views import CustomTokenObtainPairView,CustomTokenRefreshView,LogoutView,ProfileView,RegisterUserView

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('profile/',ProfileView.as_view(),name='profile'),
    path('register/',RegisterUserView.as_view(),name='register'), 
    path('logout/',LogoutView.as_view(),name='logout'),
]
