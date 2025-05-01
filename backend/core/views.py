from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import authenticate
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import make_password

from django.contrib.auth import get_user_model
User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self,request, *args, **kwargs):
        try:
            response=super().post(request,*args,**kwargs)
            token_data=response.data

            if 'access' in token_data and 'refresh' in token_data:
                response.set_cookie(
                    key='refresh_token',
                    value=token_data['refresh'],
                    httponly=True,
                    # secure=True,
                    samesite='Lax'
                )
                del token_data['refresh']
            
            email=request.data.get('email')
            user=CustomUser.objects.get(email=email)
            user_data=UserSerializer(user).data
            print(user_data)

            response.data={
                'user':user_data,
                'access':token_data.get('access'),
                'message': "Login successful."
            }
            return response
        except AuthenticationFailed as e:
             # Specific message for authentication failure
            return Response(
                {'detail': 'Invalid username or password.'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            # General error handler for other exception
            return Response(
                {
                    'detail':"Am error occurred during login. please try again"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            return Response({'error': 'No refresh token found'}, status=400)

        try:
            token = RefreshToken(refresh_token)
            access_token = str(token.access_token)
            user_id = token['user_id']  # From the refresh token's payload

            # Get user and serialize
            user = User.objects.get(id=user_id)
            user_data = UserSerializer(user).data

            return Response({
                'access': access_token,
                'user': user_data,
                'message': 'Token refreshed successfully.'
            })

        except TokenError:
            return Response({'error': 'Invalid refresh token'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': 'An error occurred while refreshing token.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class ProfileView(APIView):
    permission_classes=[permissions.IsAuthenticated]

    def get(self,request):
        serializer=UserSerializer(request.user)
        return Response(serializer.data)
    

class RegisterUserView(APIView):
    permission_classes=[permissions.IsAdminUser]

    def post(self,request, *args, **kwargs):
        data=request.data

        full_name=data.get('full_name')
        email=data.get('email')
        # birthdate=data.get('birthdate')
        phone_number=data.get('phone_number')
        gender=data.get('gender')
        password=data.get('password')

        if not full_name or not email or not password or not phone_number:
            return Response(
                {
                    'error':"Full name ,email , password and phone number cannot be null"
                 },
                 status=status.HTTP_400_BAD_REQUEST
            )
         # Check if email already exists
        if CustomUser.objects.filter(email=email).exists():
            return Response(
                {"error": "A user with this email is already registered."},
                status=status.HTTP_409_CONFLICT
            )
         # Create user
        user = User.objects.create(
            full_name=full_name,
            email=email,
            # birthdate=birthdate,
            phone_number=phone_number,
            gender=gender,
            
            password=make_password(password),
        )
        
        # Return a success response
        return Response(
            {   
                "success":True,
                "message": "User registered successfully.",
                "user": {
                    "id": user.id,
                    "full_name": user.full_name,
                    "email": user.email,
                },
            },
            status=status.HTTP_201_CREATED
        )



class LogoutView(APIView):
    permission_classes=[permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        
        # Clear the access token cookie
        response.delete_cookie('access_token')
        
        # Clear the refresh token cookie if used
        response.delete_cookie('refresh_token')
        
        
        return response
    



