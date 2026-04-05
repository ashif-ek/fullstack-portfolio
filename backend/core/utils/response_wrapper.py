from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

def standard_response(success=True, data=None, error=None, status=200):
    """
    Returns a standardized API response.
    {
        "success": boolean,
        "data": T,
        "error": string | null
    }
    """
    response_data = {
        "success": success,
        "data": data,
        "error": error
    }
    return Response(response_data, status=status)

class StandardJSONRenderer(JSONRenderer):
    """
    Optional: A custom renderer to enforce the standard shape globally.
    For now, we'll use the helper function for explicit control.
    """
    def render(self, data, accepted_media_type=None, renderer_context=None):
        if data is not None and ('success' not in data):
            data = {
                "success": True,
                "data": data,
                "error": None
            }
        return super().render(data, accepted_media_type, renderer_context)
