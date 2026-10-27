const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const recipeRoutes = require('./routes/recipeRoutes');

// ─── App Initialization ─────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ──────────────────────────────────────────────────────
app.use(cors()); // Allow all origins for development
app.use(express.json()); // Parse incoming JSON request bodies

// ─── API Routes ──────────────────────────────────────────────────────
app.use('/api/recipes', recipeRoutes);

// ─── Health Check ────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Recipe Book API is running' });
});

// ─── Global Error Handling Middleware ─────────────────────────────────
// Catches any errors not handled by route-level try/catch blocks.
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack || err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// ─── MongoDB Connection & Server Start ───────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
