# Lost & Found Platform - Backend Setup Guide

## 📦 Installation & Setup

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Set Up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/lostfound?retryWrites=true&w=majority`)

### Step 3: Configure Environment Variables
Edit `.env` file with your values:
```
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### Step 4: Start the Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

---

## 🧪 Testing with Postman

### Import Collection
1. Open Postman
2. Create a new collection named "Lost & Found API"

### Test Endpoints

#### 1️⃣ Register User
**POST** `http://localhost:5000/api/auth/register`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
✅ Response: Returns token + user data

#### 2️⃣ Login User
**POST** `http://localhost:5000/api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
✅ Response: Returns token (copy this for next requests)

#### 3️⃣ Get Current User
**GET** `http://localhost:5000/api/auth/me`
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 4️⃣ Create Item
**POST** `http://localhost:5000/api/items`
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```
**Body:**
```json
{
  "itemName": "Silver Watch",
  "description": "Vintage silver watch with leather strap",
  "type": "Lost",
  "location": "Library Main Hall",
  "date": "2026-04-20T10:00:00Z",
  "contactInfo": "john@example.com"
}
```
✅ Response: Item created with ID

#### 5️⃣ Get All Items
**GET** `http://localhost:5000/api/items`
✅ Response: List of all items

#### 6️⃣ Get Single Item
**GET** `http://localhost:5000/api/items/ITEM_ID_HERE`
✅ Response: Single item details

#### 7️⃣ Search Items
**GET** `http://localhost:5000/api/items/search?query=watch&type=Lost`
✅ Response: Filtered items

#### 8️⃣ Update Item (Owner Only)
**PUT** `http://localhost:5000/api/items/ITEM_ID_HERE`
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```
**Body:**
```json
{
  "itemName": "Gold Watch",
  "description": "Updated description"
}
```
✅ Response: Updated item

#### 9️⃣ Delete Item (Owner Only)
**DELETE** `http://localhost:5000/api/items/ITEM_ID_HERE`
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```
✅ Response: Success message

---

## ✅ Verification Checklist

- [ ] npm install runs without errors
- [ ] MongoDB connection established (check console)
- [ ] Can register new user
- [ ] Can login and get token
- [ ] Can create item with token
- [ ] Can view all items (no token needed)
- [ ] Can search items by name/type
- [ ] Can update own item (fails for other user)
- [ ] Can delete own item (fails for other user)
- [ ] Error handling works (invalid credentials, missing fields)

---

## 🚀 Next: Deploy to Render
(Instructions in DEPLOYMENT.md)

