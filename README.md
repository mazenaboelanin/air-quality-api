# Air Quality API

A Node.js API that fetches, stores, and serves air quality data for locations such as Paris using external APIs (IQAir).  
Includes scheduled jobs for periodic data fetching and supports in-memory and real MongoDB databases for testing and production.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
  - [Run Locally](#run-locally)  
- [Database Setup](#database-setup)  
- [API Endpoints](#api-endpoints)  
- [Cron Job](#cron-job)  
- [Testing](#testing)  
  - [Unit Tests](#unit-tests)  
  - [Integration Tests](#integration-tests)  
  - [Live Integration Tests](#live-integration-tests)  
- [Project Structure](#project-structure)  

---

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
npm run test:live-integratio
```


### Project Structure

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


tests/
├── unit/ # Unit tests
├── integration/ # Integration tests
├── factories/ # Test data factories
