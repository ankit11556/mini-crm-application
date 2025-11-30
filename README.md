# CRM Application

A simple **Customer Relationship Management (CRM)** web application built using the **MERN stack**.  
This project allows managing **customers** and their **leads** with features like create, read, update, delete (CRUD), filtering, and responsive design.

---

## 🚀 Live Demo

- **Frontend (Vercel):** [Live Link](https://mini-crm-application.vercel.app/)  
- **Backend (Render):** [API Link](https://mini-crm-application.onrender.com)

---

## ✨ Features

### 👤 Customers
- Add new customers with details (Name, Email, Phone, Company).
- View all customers in a paginated table.
- Search customers by name or email.
- Edit and delete customer details.

### 📌 Leads
- Add new leads under a customer.
- Filter leads by status (**New, Contacted, Converted, Lost**).
- Edit or delete leads.
- Display lead creation date and value.

### 🛡️ Authentication
- User registration and login.
- Passwords stored securely with hashing.
- Authenticated routes protected.

### 💻 UI/UX
- Fully **responsive design** using **Tailwind CSS**.
- Sidebar + Navbar layout for dashboard pages.
- Mobile-friendly navigation (collapsible sidebar).

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Context Api

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)

**Deployment:**
- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas  

---

## ⚙️ Installation  

Clone the repository and install dependencies:  

```bash
# Clone repo
git clone https://github.com/ankit11556/mini-crm-application.git

# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup
cd backend
npm install
npm start


