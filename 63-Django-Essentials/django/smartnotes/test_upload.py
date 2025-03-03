import boto3
from django.conf import settings

s3 = boto3.client(
    "s3",
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name=settings.AWS_S3_REGION_NAME
)

bucket_name = settings.AWS_STORAGE_BUCKET_NAME
file_name = "d:\Youtube\Youtube-Mini-Series\Redux\Wrong-Mutation.png"

try:
    with open(file_name, "rb") as file_data:
        s3.upload_fileobj(file_data, bucket_name, f"uploads/{file_name}", ExtraArgs={'ACL': 'public-read'})

    print(f"File '{file_name}' uploaded successfully to bucket '{bucket_name}'!")
except Exception as e:
    print("Error uploading to S3:", e)
