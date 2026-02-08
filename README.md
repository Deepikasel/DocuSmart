# 📄 DOCUSMART

> **A smart document management platform** for uploading, summarizing, reviewing, and managing documents efficiently.

---

## 🚀 Live Demo

- Frontend: [https://docusmart.netlify.app/](https://docusmart.netlify.app/)  
- Backend: [https://docusmart-y7qn.onrender.com](https://docusmart-y7qn.onrender.com)

---

## 🛠 Features

### ✅ User Features
- Upload documents (PDF, DOCX, images)  
- View document versions  
- View document summaries  
- Resummarize uploaded documents  
- Navigate between document versions  
- Secure authentication and authorization  

### ✅ Reviewer Features
- Add comments to documents  
- Comment per document version  
- Review multiple users’ documents  

### ✅ Admin Features
- Upload, delete, and manage all documents  
- View all users’ documents  
- View comments from reviewers  
- Manage document versions  
- Full audit and monitoring capability  

---

## 📁 Project Structure

DocuSmart/
│
├── backend/
│ ├── config/
│ │ └── db.js # MongoDB connection
│ ├── controllers/
│ │ ├── documentController.js
│ │ └── commentController.js
│ ├── middleware/
│ │ ├── authMiddleware.js
│ │ └── upload.js
│ ├── models/
│ │ ├── Document.js
│ │ ├── User.js
│ │ └── Comment.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── documentRoutes.js
│ │ └── commentRoutes.js
│ ├── utils/
│ │ └── summarizer.js # Text extraction & summarization
│ └── server.js
│
├── frontend/
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── api/
│ │ │ └── axios.js
│ │ ├── components/
│ │ │ ├── Navbar.jsx
│ │ │ └── FullDocumentModal.jsx
│ │ ├── context/
│ │ │ └── AuthContext.jsx
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ ├── About.jsx
│ │ │ ├── Contact.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ ├── UploadDocument.jsx
│ │ │ ├── DocumentDetails.jsx
│ │ │ ├── Login.jsx
│ │ │ └── Register.jsx
│ │ └── styles/
│ │ ├── Dashboard.css
│ │ └── UploadDocument.css
│ └── package.json
│
├── .env # Environment variables
└── README.md # Project documentation


---

## ⚙️ Installation

### Backend
```bash
cd backend
npm install
node server.js

### Frontend
```bash
cd frontend
npm install
npm run dev

### 🌟 Tech Stack

Frontend: React.js, Axios, React Router

Backend: Node.js, Express.js, MongoDB

Authentication: JWT

File Handling: Multer for uploads

Deployment: Netlify (frontend), Render (backend)
