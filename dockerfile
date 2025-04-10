# Use an official Nginx image as a parent image
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the contents of the ../dist/wheremybuckgoes-web/ directory into the container at /usr/share/nginx/html
COPY dist/expense_track/browser .

# Expose port 4500 to the outside world
EXPOSE 4500

# docker build -t wheremybuckgoes-web .
# docker run -d -p 4500:80 wheremybuckgoes-web