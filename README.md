# Emissions App – Frontend

This project is the frontend interface for the Emissions App, developed with Angular.

It provides an interactive dashboard to visualize, filter, and analyze emissions data by country, activity, and emission type.

## 1. Running the Application with Angular CLI
### 1.1 Starting the Development Server

To start the application locally, navigate to the project directory in your terminal and run:
```
ng serve
```

Once the server starts, open your browser and go to:

http://localhost:4200/


The application will automatically reload when source files are modified.

### 1.2 Stopping the Development Server

To stop the Angular development server, use the following keyboard shortcut in the same terminal window:
```
Ctrl + C
```

## 2. Running the Application with Docker

You can also build and run the frontend inside a Docker container.

### 2.1 Building the Docker Image

From the root directory of the project, build the Docker image by running:
```
docker build -t emissions-frontend .
```

### 2.2 Running the Docker Container

Once the image is built, create and start a container:
```
docker run -d --name emissions-frontend -p 80:80 emissions-frontend
```

After the container starts, open your browser and navigate to:

http://localhost/


### 2.3 Stopping and Removing the Container

To stop the container:
```
docker stop emissions-frontend
```

To remove the container:
```
docker rm emissions-frontend
```

To remove the image:
```
docker image rm emissions-frontend
```

## 3. Running Unit Tests

The project includes automated unit tests implemented with Karma and Jasmine.
To execute the tests, run:
```
ng test
```

This command launches the Karma test runner in watch mode and displays the results in the console and browser.

## 4. Project Structure Overview

Key directories and files:

```
src/
 ├── app/
 │   ├── components/         # Reusable UI components
 │   ├── services/           # API interaction and data services
 │   ├── models/             # Data models and interfaces
 │   └── app.ts              # Root Angular component
 └── index.html              # Main entry point
```

5. Prerequisites

Before running or building the project, ensure that you have the following installed:

Node.js (version 18 or higher)

Angular CLI (version 17 or higher)

Docker (optional, for containerized execution)