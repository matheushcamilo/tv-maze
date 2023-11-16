# Use an official Python runtime as a parent image
FROM python:3.10-slim

RUN apt-get update && \
    apt-get install -y \
    pkg-config\
    python3-dev \
    default-libmysqlclient-dev \
    build-essential \
    default-libmysqlclient-dev

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY ./backend/requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY ./backend /app/

# Expose the port that Django will run on
EXPOSE 8000

# Run the Django development server
# CMD ["python", "manage.py", "runserver"]
