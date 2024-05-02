"""
URL configuration for esandms project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import statistics
from django.conf import settings
from django.contrib import admin
from django.urls import path , include, re_path
from django.conf.urls.static import static
from django.views.generic import TemplateView


from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/hall/', include('halls.api.urls', namespace='halls')),
    # path('api/user/', include('users.api.urls', namespace='users')),
    path('api/exam/', include('exams.api.urls', namespace='exams')),
    path('api/class/', include('classes.api.urls', namespace='classes')),
    path('api/scheduling/', include('schedulings.api.urls', namespace='schedulings')),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/', include('rest_framework.urls'))
] 

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
