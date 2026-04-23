# Netlify Deployment Guide - Frontend

## 🚀 Step-by-Step Deployment

### Step 1: Build React App
```bash
cd frontend
npm run build
```

Creates optimized `build/` folder.

### Step 2: Push to GitHub
```bash
git add .
git commit -m "Frontend build ready"
git push
```

### Step 3: Deploy to Netlify
1. Go to https://netlify.com
2. Click **Add new site** → **Import an existing project**
3. Select GitHub
4. Choose your repository
5. Configure:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `build`

### Step 4: Add Environment Variables
1. In Netlify dashboard → **Site settings** → **Build & deploy** → **Environment**
2. Add:
   ```
   REACT_APP_API_URL=https://your-render-backend-url/api
   ```
   (Replace with your actual Render URL)

### Step 5: Deploy
- Click **Deploy**
- Wait for build (1-2 minutes)
- You'll get a URL like: `https://[random-name].netlify.app`

---

## ✅ Verify Deployment

1. Visit your Netlify URL
2. Test the flow:
   - Register
   - Login
   - Add item
   - Search
   - Edit/Delete

---

## 📝 Notes

- Make sure Render backend is deployed first
- Update `REACT_APP_API_URL` with your Render URL
- Frontend automatically rebuilds on GitHub push

