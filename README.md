# Air Quality API

A Node.js API that fetches, stores, and serves air quality data for locations such as Paris using external APIs (IQAir).  
Includes scheduled jobs for periodic data fetching and supports in-memory and real MongoDB databases for testing and production.

---

## Table of Contents

- [API Documentation](#api-documentation)
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
  - [Run Locally](#run-locally)
- [Docker Setup](#docker-setup)
- [Database Setup](#database-setup)  
- [API Endpoints](#api-endpoints)  
- [Cron Job](#cron-job)  
- [Testing](#testing)
  - [Running Tests Locally](#running-tests-locally)
    - [Unit Tests](#unit-tests)  
    - [Integration Tests](#integration-tests)  
    - [Live Integration Tests](#live-integration-tests)  
  - [Running Tests Inside Docker](#running-tests-inside-docker)

- [Project Structure](#project-structure)

---

## API Documentation

The full API documentation with request details and examples is available at:

[View API Documentation](https://documenter.getpostman.com/view/7117783/2sB3BGG95h)


## Features

- Fetch live air quality data from external API (IQAir), transform the response and send it back to user
- Store air quality records in MongoDB  
- Background cron job to update air quality data periodically for Paris zone.
- REST API to query air quality by coordinates
- REST API to get most polluted date for Paris zone
- Supports real MongoDB for production and in-memory MongoDB for tests  
- Comprehensive testing: unit, integration, and live integration tests

---

## Tech Stack

- Node.js & TypeScript  
- Express.js
- MongoDB & Mongoose  
- Jest for testing  
- mongodb-memory-server for in-memory test DB  
- Supertest for API request testing  
- External Air Quality API (IQAir) integration  

---

## Getting Started

### Prerequisites

- Node.js v16+  
- MongoDB instance (local or cloud like MongoDB Atlas) - I'm using MongoDB Atlas
- API key for external air quality API (e.g., IQAir)  

### Installation

```bash
git clone https://github.com/mazenaboelanin/air-quality-api.git
cd air-quality-api
npm install
```


### Environment Variables

Create a `config.env` file in the config/ directory :

```env
MONGO_URI=your_mongodb_connection_string
IQAIR_API_KEY=your_iqair_api_key
PORT=5000
```

### Run Locally

Start the server with:

```bash
npm run dev
```

The API will be available at http://localhost:5000

## Docker Setup

This project includes a `Dockerfile` and `docker-compose.yml` for easy containerized setup.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- MongoDB Atlas connection string and `config.env` file ready

### Running Tests inside Docker

Build and start the containers:
```bash
docker-compose up --build
```
The app will be accessible at:http://localhost:5000

stop the container
```bash
docker-compose down
```

restart the container 
```bash
docker-compose up
```

The app reads environment variables from the file specified in env_file (e.g., config/config.env).

Ensure your .env file contains valid MongoDB URI and API keys.

If your app listens on a different port, adjust both the app's PORT environment variable and the port mapping in docker-compose.yml.

### Database Setup

This project uses MongoDB as the database.

For testing, an in-memory MongoDB server is used to avoid polluting your real database.

You can seed the test database using the seeder script located at `config/db-seeds.ts`.

### API Endpoints

- `GET /api/v1/air_quality?lat={lat}&lon={lon}`  
  Fetch air quality data for the given latitude and longitude.

- `GET /api/v1/air_quality/:city/most_polluted_date`  
  Fetch the most polluted date with specific city => example: paris


### Cron Job

The cron job `checkAirQualityJob` periodically fetches the latest air quality data for Paris, Map api response to DB Model and stores it in the database.

It runs automatically based on the scheduler (configured in `jobs/check-air-quality.job.ts`).

## Testing

### Running Tests Locally

### Unit Tests

Run unit tests (mocking external APIs and DB) with:

```bash
npm run test:unit
```

### Integration Tests

Run integration tests (using in-memory MongoDB) and mocked API with:

```bash
npm run test:integration
```

### Live Integration Tests
Run live integration tests against the real API and real MongoDB with:

```bash
npm run test:live-integration
```

### All Tests

Run all tests (unit and integration) without live tests:

```bash
npm run test
```

## 🧪 Running Tests Inside Docker

If your container is already running (via `docker-compose up`), you can run tests inside it without defining a separate `test` service.

### Steps

1. **Check running containers**
```bash
   docker ps
```

2. **Exec into the container**
```bash
docker exec -it air-quality-api-app-1 sh
```
3. **Run The Tests**

```bash
npm run test:unit
npm run test:integration
npm run test:live-integration
```

4. **Exit the container** 

```bash
exit
```
---

### Project Structure
```bash
src/
├── controllers/ # API route controllers
├── jobs/ # Cron jobs and background jobs
├── models/ # Mongoose models
├── routes/ # API route definitions
├── services/ # Business logic and external API integrations
├── utils/ # Utility functions and mappers

config/
├── db.ts # Real Database connection setup
├── db-test.ts # In-memory DB setup for tests
├── db-seeds.ts # run seed data for tests
├── db-seeds.data.ts # seeds data
├── env.ts # load environment variables


__tests__/
├── unit/ # Unit tests
├── integration/ # Integration tests
├── factories/ # Test data factories
```