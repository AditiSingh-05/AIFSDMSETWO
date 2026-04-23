# Render Deployment Guide - Backend

## 🚀 Step-by-Step Deployment

### Step 1: Push to GitHub
```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin https://github.com/yourusername/repo.git
git push -u origin main
```

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up (or login)
3. Connect GitHub account

### Step 3: Deploy Backend
1. Click **New +** → **Web Service**
2. Select your GitHub repository
3. Configure:
   - **Name:** `lostfound-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Runtime:** `Node 18`

### Step 4: Add Environment Variables
1. In Render dashboard, go to your service
2. Click **Environment**
3. Add:
   ```
   MONGO_URI=mongodb+srv://aditidb:password123456789@aiafsd.syayilb.mongodb.net/lostfound?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_key_12345
   NODE_ENV=production
   PORT=10000
   ```

### Step 5: Deploy
1. Click **Deploy**
2. Wait for build to complete (2-3 minutes)
3. You'll get a URL like: `https://lostfound-api.onrender.com`

---

## ✅ Verify Deployment

Test the live API:
```bash
curl https://lostfound-api.onrender.com/api/health
```

Should return: `{"success":true,"message":"Backend is running"}`

---

## 📝 Notes

- Free tier on Render has 15-minute inactivity timeout
- Database stays connected (MongoDB Atlas is cloud-hosted)
- Use this URL in frontend deployment

