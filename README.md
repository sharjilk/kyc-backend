# KYC app on Node.JS 

## 🚀 Project Overview

The app is built using a **React (Vite)** frontend and a **Node.js (Express.js)** backend.

### **Demo URL**
- **Frontend Production (Vercel)**: https://kyc-client-beryl.vercel.app/  
- **Backend Production (Render)**: https://kyc-backend-vbvo.onrender.com/

---

## 🛠️ Tech Stack

### **Frontend:**
- **React.js**
- **TypeScript** for type safety
- **Tailwind CSS** for styling and responsiveness
- **Redux** for global state management
- **Deployed on Vercel**

### **Backend:**
- **Node.js** with **Express.js** for API handling
- **TypeScript** for backend logic
- **Express-Validator** for request validation
- **Deployed on Render**

---

## 🔍 Frontend Features
- **Register page (`/`)**: For user registeration
- **Login Page (`/login`)**: For user log in.
- **Dashboard Page**: To view and submit KYC document.

---

## 🔗 API Documentation

### **KYC API**

| Method | Endpoint            | Description                                     | Request Body                  | Response                                                                  |
|--------|---------------------|-------------------------------------------------|--------------------------------|---------------------------------------------------------------------------|
| `GET`  | `/api/auth/register`       | For user registration       | `name, email, password, role`                         | `201 OK` - Returns registered user                            |
| `GET`  | `/api/auth/login`   | For user login              | `email, password`                         | `200 OK` - Returns JWT token |
| `GET`  | `/api/kyc/submit`   | For KYC submission              | `file`                         | `201 OK` - Returns document url |
| `GET`  | `/api/kyc/:id`   | For admin to approve KYC              | `status`                         | `200 OK` - Returns updated status |
| `GET`  | `/api/kyc/status`   | For user to check their kyc status              | `none`                         | `200 OK` - Returns Kyc status |
| `GET`  | `/api/kyc/submissions`   | For admin to view all submissions          | `none`                         | `200 OK` - Returns list of kyc submissions |
| `GET`  | `/api/kyc/kpi`   | For admin to view kyc's kpi              | `none`                         | `200 OK` - Returns no of items as KPIs |

---

## 🖥️ Running Locally

### **Prerequisites**
- Latest LTS version of Node.js and npm should be installed

---

### **Backend Setup**
1. Clone the repository
   ```bash
   git clone git@github.com/sharjilk/kyc-backend
   cd backend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Run the backend
   ```bash
   npm run start
   ```
4. Backend runs on `http://localhost:3000/`

---

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   git clone git@github.com/sharjilk/kyc-client
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm run dev
   ```
4. Frontend runs on `http://localhost:5173/`
