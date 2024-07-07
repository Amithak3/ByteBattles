# Use an official Python runtime as a parent image
FROM python:3.9

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update && apt-get install -y \
    default-jdk \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /code

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .


# Expose the port Django is expected to run on
EXPOSE 8000

ENV DJANGO_SETTINGS_MODULE=ByteBattles.settings
ENV PYTHONUNBUFFERED=1

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
