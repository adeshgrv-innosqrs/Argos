# your_app/urls.py

from django.urls import path
from .projectView import ProjectUploadView

urlpatterns = [
    path('upload/', ProjectUploadView.as_view(),name="ProjectUploadView"),
]
