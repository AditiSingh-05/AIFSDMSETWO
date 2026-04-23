# 🎯 Lost & Found Platform - Full Stack Project

Complete web application for reporting and discovering lost or found items with user authentication, search functionality, and item management.

---

## ⚡ Quick Start (60 seconds)

### Windows
```bash
setup.bat
```

### Mac/Linux
```bash
chmod +x setup.sh
./setup.sh
```

---

## 🚀 Running Locally

### Terminal 1: Backend
```bash
cd backend
npm run dev
```
→ `http://localhost:5000`

### Terminal 2: Frontend
```bash
cd frontend
npm start
```
→ `http://localhost:3000`

---

## 📋 What's Included

✅ Full user authentication (Register/Login with JWT)
✅ Complete item management (Create, Read, Update, Delete)
✅ Real-time search & filtering
✅ Authorization (only owners can edit/delete)
✅ Modern responsive UI
✅ Deployment ready

**Tech Stack:**
- Backend: Node.js + Express + MongoDB
- Frontend: React + Axios
- Auth: JWT tokens
- DB: MongoDB Atlas

---

## 📁 Project Structure

```
frontend/          → React UI (http://localhost:3000)
backend/           → Express API (http://localhost:5000)
setup.bat/setup.sh → Auto install dependencies
```

### Backend Files
- `models/` → User & Item schemas
- `controllers/` → Auth & Item logic
- `routes/` → API endpoints
- `middleware/` → JWT verification
- `server.js` → Express app
- `SETUP.md` → Detailed guide
- `RENDER_DEPLOY.md` → Deployment steps

### Frontend Files
- `src/pages/` → Register, Login, Dashboard
- `src/components/` → ItemCard
- `src/api/` → Axios client
- `src/App.jsx` → Router & auth guard
- `src/index.css` → All styling
- `SETUP.md` → Detailed guide
- `NETLIFY_DEPLOY.md` → Deployment steps

---

## 🎯 Features

### Authentication
- Register with email/password
- JWT login (7-day tokens)
- Passwords hashed with bcryptjs
- Auto logout on token expiry

### Items (Lost & Found)
- **Create:** Add item (logged-in only)
- **Read:** View all items (public)
- **Update:** Edit item (owner only)
- **Delete:** Remove item (owner only)
- **Search:** By name, description, type

### Authorization
- Protected routes (token required)
- Ownership validation (can't edit others' items)
- Proper error responses (401, 403, 404)

### UI
- Mobile responsive
- Real-time search
- Modern design with gradients
- Smooth animations

---

## 📊 API Endpoints

```
POST   /api/auth/register        → Register user
POST   /api/auth/login           → Login (returns token)
GET    /api/auth/me              → Get current user (protected)

GET    /api/items                → Get all items
POST   /api/items                → Create item (protected)
GET    /api/items/:id            → Get single item
PUT    /api/items/:id            → Update item (protected, owner only)
DELETE /api/items/:id            → Delete item (protected, owner only)
GET    /api/items/search?query=X → Search items
```

---

## 🧪 Test Locally

1. **Backend:**
   - Register user
   - Login (copy token)
   - Create item
   - Search items
   - Try to edit someone else's item (should fail)

2. **Frontend:**
   - Register page works
   - Can add items
   - Can search/filter
   - Can edit own items
   - Cannot edit others' items
   - Logout works

---

## 🌍 Deploy

### Backend (Render)
1. Push to GitHub
2. Create Render service
3. Add env vars (MONGO_URI, JWT_SECRET)
4. Deploy
5. See `backend/RENDER_DEPLOY.md`

### Frontend (Netlify)
1. Build: `npm run build`
2. Push to GitHub
3. Create Netlify site
4. Add API URL env var
5. Deploy
6. See `frontend/NETLIFY_DEPLOY.md`

---

## 📚 Documentation

- [Backend Setup](backend/SETUP.md)
- [Frontend Setup](frontend/SETUP.md)
- [Backend Deployment](backend/RENDER_DEPLOY.md)
- [Frontend Deployment](frontend/NETLIFY_DEPLOY.md)

---

## 🔐 Security

✅ Password hashing (bcryptjs)
✅ JWT authentication
✅ Protected routes
✅ Authorization checks
✅ CORS enabled
✅ Error handling (no data leaks)

---

## 🆘 Troubleshooting

**Backend won't start?**
- Check MongoDB URI in `.env`
- Verify MongoDB whitelist includes your IP
- Port 5000 free?

**Frontend can't reach backend?**
- Backend running on port 5000?
- Check API URL in axios config
- CORS errors in console?

**Login fails?**
- Check credentials
- Backend running?
- MongoDB has user data?

---

**Status:** Complete & Ready 🎉
**Created:** April 23, 2026
