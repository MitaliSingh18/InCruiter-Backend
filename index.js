require('dotenv').config();
const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/error');

// Import routes
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3010;

// Connect to MongoDB with improved error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Please ensure your MongoDB connection string is correct and the database is accessible');
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('static'));

// Routes
app.use('/api/auth', authRoutes);

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Error handler (should be last piece of middleware)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Auth server running at http://localhost:${port}`);
});