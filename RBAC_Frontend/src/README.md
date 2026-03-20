Full Stack RBAC Authentication System

A full-stack Role-Based Access Control (RBAC) system built using:

⚙️ Backend: Spring Boot 3 + Java 17 + Spring Security + JWT

🎨 Frontend: React + TypeScript + Vite + Axios

🗄️ Database: MySQL

🔐 Authentication: JWT-based login system

🛡️ Authorization: Role-based access (USER / ADMIN)

🚀 Features
🔐 Authentication

User registration with role selection (USER / ADMIN)

Secure login using JWT

Password encryption using BCrypt

🛡️ Authorization (RBAC)

ADMIN can access admin dashboard

USER can access user dashboard

Protected API endpoints using Spring Security

🎨 Frontend

Role-based routing using React Router

Protected routes

Axios interceptor for JWT

Profile view + update functionality

🏗️ Project Structure
backend/
 └── Spring Boot (JWT + RBAC)

frontend/
 └── React + TypeScript (Vite)
⚙️ Backend Setup (Spring Boot)
1. Prerequisites

Java 17+

Maven

MySQL

2. Clone Repository
git clone https://github.com/your-username/rbac-system.git
cd backend
3. Configure Environment Variables

Create application.properties:

# DB CONFIG
spring.datasource.url=jdbc:mysql://localhost:3306/rbac_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT CONFIG
jwt.secret=your_secret_key
jwt.expiration=86400000
4. Run Backend
mvn spring-boot:run

Backend runs at:

http://localhost:8080
📌 API Documentation (Swagger)

After running backend:

http://localhost:8080/swagger-ui/index.html
🎨 Frontend Setup (React + TypeScript)
1. Install Dependencies
cd frontend
npm install
2. Environment Variables

Create .env file:

VITE_API_BASE_URL=http://localhost:8080/api
3. Run Frontend
npm run dev

Frontend runs at:

http://localhost:5173
🔐 Authentication Flow

User registers with role (USER / ADMIN)

User logs in with email & password

Backend generates JWT token

Token stored in localStorage

Token sent in Authorization header for API calls

Backend validates token + role

🛡️ Role-Based Access
Role	Access
ADMIN	Admin Dashboard
USER	User Dashboard
🔑 API Security
Public APIs
/api/auth/register
/api/auth/login
Protected APIs
/api/user/**
/api/admin/**
🧠 Tech Stack
Backend

Spring Boot

Spring Security

JWT (jjwt)

JPA / Hibernate

MapStruct

Lombok

Swagger

Frontend

React + TypeScript

Vite

Axios

React Router

TailwindCSS

📸 Screenshots (Optional)

Add:

Login page

Register page

Admin dashboard

User dashboard

🧑‍💻 How to Test
1. Register User
POST /api/auth/register
2. Login User
POST /api/auth/login
3. Use Token

Add in headers:

Authorization: Bearer <token>


📌 Author Notes

This project demonstrates:

JWT authentication flow

Role-based authorization

Secure full-stack architecture

Clean separation of frontend/backend concerns