import zipfile
import csv
import io

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from .permission import PM


class ProjectUploadView(APIView):
    # permission_classes = [PM]

    def post(self, request):
        project_name = request.data.get("project_name")
        project_file = request.FILES.get("project_file")
        vendor_file = request.FILES.get("vendor_file")  # .zip

        if not project_name or not project_file:
            return Response(
                {"error": "Project name and project file are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if vendor_file:
            try:
                # Unzip vendor file in memory
                with zipfile.ZipFile(vendor_file) as zip_file:
                    csv_files = [f for f in zip_file.namelist() if f.endswith('.csv')]

                    if not csv_files:
                        return Response(
                            {"error": "ZIP file does not contain any CSV files."},
                            status=status.HTTP_400_BAD_REQUEST
                        )

                    for file_name in csv_files:
                        with zip_file.open(file_name) as csv_file:
                            # Decode the file and read using CSV
                            text_file = io.TextIOWrapper(csv_file, encoding='utf-8')
                            reader = csv.DictReader(text_file)

                            print(f"\n---- {file_name} ----")
                            for row in reader:
                                # Print expected fields: Name, Email, Locale
                                print(f"Name: {row.get('Name')}, Email: {row.get('Email')}, Locale: {row.get('Locale')}")

            except zipfile.BadZipFile:
                return Response({"error": "Invalid ZIP file."}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            "message": "Project uploaded successfully (with vendor file processed if present)."
        }, status=status.HTTP_201_CREATED)
