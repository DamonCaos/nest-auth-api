# NestJS Auth API Starter

Backend API built with **NestJS**, **Prisma**, and **PostgreSQL**, designed as a reusable authentication and authorization starter for modern web applications.

This project implements a **secure, production-oriented authentication system** including JWT authentication, refresh tokens, role-based authorization, rate limiting and database persistence.

It serves as a **foundation backend** that can be reused in future fullstack projects.

---

# Features

### Authentication
- JWT authentication
- Access Token + Refresh Token flow
- Secure refresh token rotation
- Logout with token invalidation

### Authorization
- Role-based access control (RBAC)
- Custom `Roles` decorator
- `RolesGuard` for protected routes

### Security
- Password hashing with **bcrypt**
- Refresh tokens stored **hashed in database**
- **Rate limiting** with NestJS Throttler
- Environment validation with **Zod**
- Prisma error handling filter

### Database
- PostgreSQL
- Prisma ORM
- Prisma migrations
- Prisma Studio support

### Developer Experience
- Swagger API documentation
- DTO validation with `class-validator`
- Modular architecture
- Dockerized database

---

# Tech Stack

| Layer | Technology |
|------|-------------|
Backend Framework | NestJS
Language | TypeScript
ORM | Prisma
Database | PostgreSQL
Auth | JWT
Containerization | Docker
Validation | Zod + class-validator
Documentation | Swagger

---

# Architecture

```
Client
↓
NestJS Controllers
↓
Services
↓
Prisma ORM
↓
PostgreSQL (Docker)
```

Authentication flow:

```
Login
↓
Access Token (short lived)
Refresh Token (stored hashed in DB)
```

---

# Project Structure

```
src
│
├── modules
│   ├── auth
│   │   ├── controllers
│   │   ├── guards
│   │   ├── strategies
│   │   ├── decorators
│   │   └── dto
│   │
│   ├── users
│   └── health
│
├── prisma
│   ├── prisma.service.ts
│   └── prisma.module.ts
│
├── seed
│   └── seed.service.ts
│
├── common
│   └── filters
│       └── prisma-exception.filter.ts
│
└── config
    └── validate-env.ts
```

---

# Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/DamonCaos/nest-auth-api.git
cd nest-auth-api
```

## 2. Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestdb"
JWT_SECRET="supersecretkey"
JWT_EXPIRES_IN=3600
```

Environment variables are validated using **Zod**, so the application will not start if something is missing.

---

# Start PostgreSQL (Docker)

```bash
docker compose up -d
```

Verify the container:

```bash
docker ps
```

---

# Database Migration

```bash
npx prisma migrate dev
```

---

# Run the application

Development mode:

```bash
npm run start:dev
```

---

# Prisma Studio

Visual database interface:

```bash
npx prisma studio
```

---

# API Documentation

Swagger documentation is available at:

```
http://localhost:3000/docs
```

---

# Default Admin Account

The application automatically creates an admin user at startup if it does not exist.

```
email: admin@example.com
password: Admin123!
```

This allows immediate testing of **admin-only endpoints**.

---

# Main API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
```

## User

```
GET /api/users
GET /api/users/me
```

---

# Security Features

- JWT authentication
- Refresh token rotation
- Hashed refresh tokens in database
- Role-based authorization
- Rate limiting on auth endpoints
- Environment validation
- Prisma exception handling

---

# Future Improvements

Possible extensions for this backend:

- Email verification
- Password reset flow
- OAuth login (Google / GitHub)
- Redis session storage
- WebSocket support
- Integration with frontend clients

---

# Author

**Francisco Javier Rodríguez**

Fullstack Developer (Node.js / React)

GitHub  
https://github.com/DamonCaos

LinkedIn  
https://www.linkedin.com/in/francisco-javier-rodriguez-romera-1410b628b

---

# License

MIT