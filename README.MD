# 🚀 CoderConnector

## CoderConnector is a social media platform designed specifically for developers to connect, collaborate, and communicate. It allows coders to discover like-minded peers, send and manage connection requests, and engage in real-time conversations.

## 🌐 Live Demo

- Frontend: https://coderconnector.vercel.app
- Backend: https://coderconnector.onrender.com

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

## ☁️ AWS Deployment

CoderConnector is also deployed on **Amazon Web Services (AWS)** using an EC2 Ubuntu instance. The frontend is served via **Nginx**, while the backend runs on **Node.js**, demonstrating real-world production deployment skills.

### 🚀 Deployment Highlights

- **Cloud Provider:** AWS EC2 (Ubuntu)
- **Frontend:** React (Vite) served using Nginx
- **Backend:** Node.js and Express
- **Process Manager:** PM2
- **Version Control:** GitHub
- **Runtime Management:** NVM (Node Version Manager)
- **Security:** Configured with appropriate inbound rules (SSH, HTTP, HTTPS)

### 🔧 Key Steps Involved

1. Created and configured an EC2 Ubuntu instance.
2. Generated and secured a `.pem` key for SSH access.
3. Installed Node.js using NVM.
4. Cloned the CoderConnector repository from GitHub.
5. Built the React frontend for production.
6. Installed and configured Nginx to serve static files.
7. Deployed the backend using PM2.
8. Configured AWS Security Groups to allow HTTP (80), HTTPS (443), and SSH (22).

### 📂 Detailed Deployment Guide

For step-by-step commands with real terminal outputs, refer to:

📄 **[AWS Deployment Guide](docs/AWS_DEPLOYMENT.md)**

### 🌐 Access the Application

After deployment, the application can be accessed using the public IP of the EC2 instance:
