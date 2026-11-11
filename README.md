# Project

Full-stack application built with NestJS, React, PostgreSQL and Prisma.

## Requirements

- Node.js 22+
- npm
- Docker (optional)

## Documentation

Architecture Decision Records (ADR): ./backend/docs/adr/
Database ER Diagram: ./backend/docs/ERD.svg

## Setup

```bash
npm ci
```

Configure environment variables in `backend/.env`, `backend/.env.test` and `backend/.env.local` from `backend/.env.example`.

## Development

### 1. Apply database migrations:

```bash
npm run backend:db:dev
```

### 2. Build shared schemas:

```bash
npm run shared:build
```

### 3. Lint the project:

Backend:
```bash
npm run backend:lint
```

Frontend:
```bash
npm run frontend:lint
```

### 4. Start backend:

```bash
npm run backend:dev
```

### 5. Start frontend in another terminal:

```bash
npm run frontend:dev
```

## Application URLs
| Environment       | Service     | URL                          |
|-------------------|-------------|------------------------------|
| Local Development | Frontend    | http://localhost:5173        |
| Local Development | Backend API | http://localhost:3000/api    |
| Local Development | Swagger UI  | http://localhost:3000/docs   |
| Docker            | Frontend    | http://localhost:80          |
| Docker            | Backend API | http://localhost:3000/api    |
| Docker            | Swagger UI  | http://localhost:3000/docs   |

## Tests
A separate PostgreSQL database is required for integration tests. Configure it in `backend/.env.test`.
Make sure the test database is separate from the development database to prevent accidental data loss.


### Run tests:

All tests:
```bash
npm run test:cov
```

Integration tests:
```bash
npm run backend:test:int
```

Unit tests:
```bash
npm run backend:test:unit
```

Integration tests automatically apply database migrations before execution.

## Docker

### Start
```bash
docker compose --env-file ./backend/.env up --build
```

### Stop:
```bash
docker compose down
```

## Commands

| Command                     | Description                     |
| --------------------------- | ------------------------------- |
| `npm run backend:lint`      | Backend lint                    |
| `npm run frontend:lint`     | Frontend lint                   |
| `npm run backend:build`     | Build backend                   |
| `npm run frontend:build`    | Build frontend                  |
| `npm run backend:test:unit` | Unit tests                      |
| `npm run backend:test:int`  | Integration tests               |
| `npm run test:cov`          | Tests with coverage             |
| `npm run api:generate`      | Generate API types from OpenAPI |
