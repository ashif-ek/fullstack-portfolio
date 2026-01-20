from rest_framework import views, permissions, status
from rest_framework.response import Response
from django.contrib.auth import authenticate


class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None and user.is_staff:  # Admin access
            return Response(
                {"success": True, "token": "admin-session-token"},
                status=status.HTTP_200_OK,
            )

        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )
