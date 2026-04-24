# 🚀 CoderConnector

## CoderConnector is a social media platform designed specifically for developers to connect, collaborate, and communicate. It allows coders to discover like-minded peers, send and manage connection requests, and engage in real-time conversations.

## 🌐 Live Demo

### Cloud Platform Deployment:

- Frontend: https://coderconnector.vercel.app
- Backend: https://coderconnector.onrender.com

### AWS EC2 Deployment:

- http://13.63.112.27/

---

## 📌 Features

### 👤 Authentication & User Management

- Secure JWT-based authentication
- User Signup and Login
- Protected Routes
- Profile Management
- View Profile
- Edit Profile

---

### 🤝 Connection System

- Browse coder profiles in a card-based layout
- Express interest or ignore profiles
- Manage incoming connection requests
- Accept or reject connection requests
- View all established connections

---

### 💬 Real-Time Chat

- One-to-one messaging between connections
- Built using Socket.IO
- Only connected users can chat

---

### 🎨 Modern User Interface

Responsive and intuitive design
Built with React for seamless user experience

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Axios
- React Router DOM
- Redux toolkit
- Tailwind
- Deployed on Vercel

---

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- Socket.IO for real-time communication
- CORS & Cookie-Parser
- Deployed on Render

---

## ☁️ AWS Deployment

CoderConnector is deployed on Amazon Web Services (AWS) using an EC2 Ubuntu instance. The application is served through Nginx as a reverse proxy, with the backend managed by PM2 and exposed via a static Elastic IP, simulating a real-world production environment.

### 🚀 Deployment Highlights

- **Cloud Provider:** AWS EC2 (Ubuntu)
- **Frontend:** React (Vite) served using Nginx
- **Backend:** Node.js and Express
- **Reverse Proxy**: Nginx (routes /api → backend)
- **Process Manager:** PM2 (ensures 24/7 uptime)
- **IP Management**: Elastic IP (static public access)
- **Version Control:** GitHub
- **Runtime Management:** NVM (Node Version Manager)
- **Security:** Configured with appropriate inbound rules (SSH, HTTP, HTTPS)

### 🔧 Key Steps Involved

1. Launched and configured an EC2 Ubuntu instance on AWS
2. Connected securely via SSH using a .pem key
3. Installed Node.js using NVM
4. Cloned the project repository from GitHub
5. Built the React frontend for production
6. Configured Nginx to:
   - Serve frontend static files
   - Proxy /api requests to backend (localhost:3000)
7. Deployed backend using PM2 for process management
8. Assigned and attached an Elastic IP for a stable public endpoint
9. Configured AWS Security Groups to allow HTTP (80), HTTPS (443), and SSH (22)

### 📂 Detailed Deployment Guide

For step-by-step commands with real terminal outputs, refer to:

📄 **[AWS Deployment Guide](docs/AWS_DEPLOYMENT.md)**

### 🌐 Access the Application

🌐 Access the Application

The application is accessible via the Elastic IP assigned to the EC2 instance:

http://13.63.112.27/
