# Blog Management System (Backend API)

## 📌 Introduction
This is a **Blog Management System** built using **Node.js, Express.js, MongoDB, and JWT authentication**. It provides features like:
- User authentication (Signup, Login, Email Verification)
- Role-based access control (Admin & User)
- Blog CRUD operations
- Comment management (Add, Update, Delete)
- Secure password hashing with bcrypt

## 🏗 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT, bcrypt
- **Validation**: Zod
  
---

## 📌 Features
### 🔐 Authentication & User Management
- **Signup** with email verification
- **Login** with JWT token-based authentication
- **Role-based access control**: Admin & User

### 📝 Blog Management
- Create, Read, Update, Delete blogs
- Assign an **author** (User ID) when creating a blog

### 💬 Comment Management
- Users can add comments
- Users can update/delete **their own comments**
- Admins can **delete any comment**

---

## 📌 User Roles
### **👤 User**
- Can **create blogs**
- Can **update & delete** only their own blogs
- Can **add, update & delete** their own comments

### **🛠 Admin**
- Can **create, update & delete any blog**
- Can **delete any comment**

---

## 📌 API Endpoints
### 🔐 **Authentication Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/auth/register` | Register a new user (email verification required) |
| GET    | `/api/auth/verify-email?token=XYZ` | Verify email using the token |
| POST   | `/api/auth/login` | Login and get JWT token |
| GET    | `/api/auth/user` | Get authenticated user details (protected route) |

### 📝 **Blog Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/blogs/` | Create a new blog (Authenticated) |
| GET    | `/api/blogs/` | Get all blogs |
| GET    | `/api/blogs/:blogId` | Get a specific blog by ID |
| PUT    | `/api/blogs/:blogId` | Update a blog (Owner/Admin only) |
| DELETE | `/api/blogs/:blogId` | Delete a blog (Owner/Admin only) |

### 💬 **Comment Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/comments/:blogId` | Add a comment to a blog (Authenticated) |
| PUT    | `/api/comments/:commentId` | Update a comment (Owner/Admin only) |
| DELETE | `/api/comments/:commentId` | Delete a comment (Owner/Admin only) |

---

## 📌 How to Use (Setup & Run)
### 1️⃣ **Clone Repository**
```sh
git clone https://github.com/your-repo/blog-management-system.git
cd blog-management-system
```
### 2️⃣ **Install Dependencies**
```sh
npm install
```
### 3️⃣ **Set Up Environment Variables**
Create a `.env` file in the root directory and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```
### 4️⃣ **Run the Server**
```sh
npm start
```
Server runs at **http://localhost:5000** 🚀

---

## 📌 Deployment
This backend is ready for deployment on **Render, Vercel, or any cloud platform**. Just set the environment variables correctly and deploy.

