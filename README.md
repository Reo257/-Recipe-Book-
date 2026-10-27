# 🍳 Recipe Book — MERN Stack Application

A full-stack Recipe Book web application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). Users can store, view, edit, and delete their favourite recipes with a clean, responsive UI.

## 📁 Project Structure

```
project-root/
├── frontend/          # React.js client
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── RecipeList.js
│       │   ├── RecipeCard.js
│       │   ├── RecipeForm.js
│       │   ├── RecipeDetail.js
│       │   └── ConfirmModal.js
│       ├── services/
│       │   └── api.js
│       ├── App.js
│       └── App.css
├── backend/           # Node.js + Express server
│   ├── models/
│   │   └── Recipe.js
│   ├── routes/
│   │   └── recipeRoutes.js
│   ├── server.js
│   └── .env
└── README.md
```

## ✨ Features

- **Add Recipe** — Form with validation for Name, Category, Ingredients, Steps, Cooking Time
- **View Recipes** — Responsive card grid with category filtering
- **View Recipe Details** — Modal showing full ingredients (as bullet list) and preparation steps
- **Edit Recipe** — Pre-filled form, updates database and UI
- **Delete Recipe** — Confirmation dialog before removal
- **Toast Notifications** — Success/error feedback messages
- **Auto-refresh** — List updates automatically after every CRUD operation
- **Responsive Design** — 1 column (mobile), 2 columns (tablet), 3 columns (desktop)

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or later)
- **npm** (comes with Node.js)
- A **MongoDB Atlas** account (free tier works)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Recipe
```

### 2. Setup Backend

```bash
cd backend
npm install
npm start
```

The backend server starts on **http://localhost:5000**.

> The `.env` file is already included with the MongoDB Atlas connection string.

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```

The React dev server starts on **http://localhost:3000**.

### 4. Open the App

Visit **http://localhost:3000** in your browser.

## 🛠️ Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Frontend   | React.js           |
| Backend    | Node.js + Express  |
| Database   | MongoDB Atlas      |
| ODM        | Mongoose           |
| HTTP Client| Axios              |

## 📡 API Endpoints

| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| GET    | `/api/recipes`       | Get all recipes        |
| GET    | `/api/recipes/:id`   | Get recipe by ID       |
| POST   | `/api/recipes`       | Create a new recipe    |
| PUT    | `/api/recipes/:id`   | Update a recipe        |
| DELETE | `/api/recipes/:id`   | Delete a recipe        |

## 📱 Responsive Design

- **Mobile** (< 640px): Single column layout, stacked form buttons
- **Tablet** (640–1024px): Two column grid
- **Desktop** (> 1024px): Three column grid

## 🎨 UI Features

- Warm food-themed colour palette (oranges, reds, creams)
- Category badges with distinct colours (Breakfast, Lunch, Dinner, Snack, Dessert)
- Modal overlays with backdrop blur
- Card hover animations with elevation effect
- Google Fonts (Poppins)
- Custom scrollbar styling
