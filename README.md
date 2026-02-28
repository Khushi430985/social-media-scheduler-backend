# Social Media Content Scheduler – Backend

## 📌 Project Overview

This backend application powers the Social Media Content Scheduler platform. It provides REST APIs to manage posts, campaigns, tasks, analytics, and dashboard insights.

The backend is built using Node.js, Express, and Supabase as the database.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Supabase (PostgreSQL)
- dotenv
- CORS

---

## 📂 Backend Structure
backend/
│
├── controllers/
├── routes/
├── config/
├── middleware/
├── utils/
└── server.js

---
-## 🔌 API Endpoints

### Root
- GET /

### Database Test
- GET /test-db

---

### Campaigns
- GET /api/campaigns
- POST /api/campaigns
- DELETE /api/campaigns/:id

---

### Posts
- GET /api/posts
- POST /api/posts
- DELETE /api/posts/:id

---

### Reshare
- POST /api/reshare/:id

---

### Tasks
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

---

### Analytics
- GET /api/analytics
- PUT /api/analytics/:id
- GET /api/analytics/platform-insights

---

### Dashboard
- GET /api/dashboard

## 🗄 Database Schema

Tables:

- posts
- campaigns
- tasks
- analytics

Relationships:

- posts → campaign_id (Foreign Key)
- analytics → post_id (Foreign Key)
- tasks → post_id (Foreign Key)

---


## ⚙️ Installation Steps

1. Clone repository
2. Navigate to backend folder
3. Install dependencies
npm install 

4. Create `.env` file with:
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_secret_key
PORT=5000
5. Start server
npx nodemon server.js


---

## 🌐 Deployment Link

https://social-media-scheduler-backend.onrender.com/

---

## 👩‍💻 Author

Developed as part of Masai School Full Stack Project.