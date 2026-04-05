from rest_framework import views, permissions
from core.services.auth_service import AuthService
from core.utils.response_wrapper import standard_response


class LoginView(views.APIView):
    """
    Standardized API for handling administrative login.
    """
    permission_classes = [permissions.AllowAny]
    service = AuthService()

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        success, result = self.service.authenticate_admin(username, password)
        
        if success:
            return standard_response(success=True, data=result, status=200)
        
        return standard_response(success=False, error=result, status=401)
