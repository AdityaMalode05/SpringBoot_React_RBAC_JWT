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
<img width="1920" height="1080" alt="Screenshot (257)" src="https://github.com/user-attachments/assets/77cc53c9-f891-4299-b098-ab109a3d1183" />
<img width="1920" height="1080" alt="Screenshot (258)" src="https://github.com/user-attachments/assets/c2d65a71-e629-4208-ab1d-678e95b50933" />



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

Backend :-

Spring Boot

Spring Security

JWT (jjwt)

JPA / Hibernate

MapStruct

Lombok

Swagger

Frontend :-

React + TypeScript

Vite

Axios

React Router

TailwindCSS



📸 Screenshots - 

Login page - 
<img width="1920" height="1080" alt="Screenshot (252)" src="https://github.com/user-attachments/assets/28d1b290-5c6d-4720-a05a-ce1e8a2a55a9" />


Register page - 
<img width="1920" height="1080" alt="Screenshot (251)" src="https://github.com/user-attachments/assets/2b20a3f8-e700-4be7-8009-afbe33fb92ba" />


Admin dashboard - 
<img width="1920" height="1080" alt="Screenshot (253)" src="https://github.com/user-attachments/assets/56a37e7c-37df-49fc-b53e-679635d1bfa3" />
<img width="1920" height="1080" alt="Screenshot (254)" src="https://github.com/user-attachments/assets/9339dca9-77b6-43c3-8f8f-0b94dceebaa0" />


User dashboard - 
<img width="1920" height="1080" alt="Screenshot (255)" src="https://github.com/user-attachments/assets/f44d4ab2-6baf-4196-9e7e-c721f45865d0" />
<img width="1920" height="1080" alt="Screenshot (256)" src="https://github.com/user-attachments/assets/37879002-c665-4ae2-87b0-516307e788de" />



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
