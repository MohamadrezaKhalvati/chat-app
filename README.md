# Novindo Task Project

This is a NestJS application developed as a task for a job interview. The project uses PostgreSQL as the database, is fully Dockerized for easy setup, and has Swagger documentation for the API.

## Getting Started

These instructions will help you get the project up and running on your local machine using Docker.

### Prerequisites

Ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:MohamadrezaKhalvati/chat-app.git
   cd chat-app
   ```

2. **Create a `.env` file in the root directory:**

   Copy the `.env.example` file to `.env` and fill in the necessary environment variables.

   ```bash
   cp .env.example .env
   ```

3. **Build and run the application with Docker Compose:**

   ```bash
   docker-compose up --build
   ```

   This command will build the Docker images and start the containers for both the NestJS application and the PostgreSQL database.

## Running the Application

After running `docker-compose up --build`, the NestJS application will be running on [http://localhost:3001](http://localhost:3001).

### Connecting to the Database

The PostgreSQL database will be available on port `5432`. You can connect to it using your favorite database client using the credentials provided in the `.env` file.

## API Documentation

Swagger is set up for API documentation. After running the application, you can access the Swagger UI at:

```
http://localhost:3001/api
```

This will provide a visual interface to explore and test the API endpoints.

## Environment Variables

The application uses environment variables for configuration. Below is a list of the variables you can set in the `.env` file:

```ini
# PostgreSQL database connection details
DATABASE_URL="postgresql://janedoe:mypassword@localhost:5432/mydb?schema=sample"

# Application port
PORT=3001
```

Make sure to replace `your_user`, `your_password`, and `your_database` with actual values.

## Useful Commands

### Linting

To run the linter:

```bash
npm run lint
```

### Building the Project

To build the project:

```bash
npm run build
```
