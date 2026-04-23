# Lost & Found Frontend - Setup Guide

## 📦 Installation

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Create Environment File (Optional for local development)
```bash
# Create .env.local file (if needed)
REACT_APP_API_URL=http://localhost:5000/api
```

**Note:** Defaults to `http://localhost:5000/api` if not specified.

### Step 3: Start Development Server
```bash
npm start
```

Frontend runs on `http://localhost:3000`

---

## 🎯 What's Included

### Pages
- **Register** → Create new account
- **Login** → Sign in with email/password
- **Dashboard** → Main app with:
  - Add new items (Lost/Found)
  - View all items
  - Search & filter
  - Edit own items
  - Delete own items
  - Logout

### Features
✅ JWT token management (localStorage)
✅ Protected routes (redirect to login if not authenticated)
✅ Real-time search
✅ Item filtering by type
✅ Responsive design (mobile-friendly)
✅ Error handling
✅ Loading states

---

## 🚀 For Production

### Build for Deployment
```bash
npm run build
```

Creates optimized build in `build/` folder.

### Deploy to Netlify
1. Push code to GitHub
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `build`
5. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-render-backend-url/api
   ```

---

## 🔐 Security Notes

- **Token Storage:** JWT stored in localStorage
- **Auto-logout:** If token expires, user redirected to login
- **Protected Routes:** Only logged-in users can access dashboard
- **API Interceptor:** Token automatically attached to all requests

---

## 🐛 Troubleshooting

### "Cannot reach backend" Error
- Check if backend is running on port 5000
- Verify `REACT_APP_API_URL` is correct
- Check browser console for CORS errors

### "Token Expired" Message
- Refresh page or login again
- Token expiry: 7 days from login

### Blank Dashboard
- Wait for items to load (check network tab)
- Try adding a new item
- Check browser console for errors

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── Register.jsx       # Registration form
│   ├── Login.jsx          # Login form
│   └── Dashboard.jsx      # Main app screen
├── components/
│   └── ItemCard.jsx       # Item card display
├── api/
│   └── axios.js           # API client with interceptors
├── App.jsx                # Router + auth guard
├── PrivateRoute.jsx       # Protected route wrapper
├── index.js               # Entry point
└── index.css              # All styling

public/
└── index.html             # HTML template
```

---

## 🧪 Testing Locally

1. **Start Backend**
   ```bash
   cd ../backend
   npm run dev
   ```

2. **Start Frontend** (in new terminal)
   ```bash
   cd frontend
   npm start
   ```

3. **Test Flow**
   - Go to http://localhost:3000
   - Register new account
   - Login
   - Add items
   - Search & filter
   - Edit/delete your items
   - Try to edit someone else's item (should fail)
   - Logout

---

**Status:** Ready for development! 🎉

