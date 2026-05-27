require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const storyRoutes = require('./routes/storyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // For easier dev local testing
}));
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/story', storyRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'active',
    game: 'Elyndra: Echoes of the Aether',
    mode: process.env.AI_PROVIDER || 'demo'
  });
});

app.listen(PORT, () => {
  console.log(`
  ✨ Elyndra Game Server ✨
  -------------------------
  Running on: http://localhost:${PORT}
  Mode: ${process.env.AI_PROVIDER || 'DEMO'}
  Client Origin: ${process.env.CLIENT_ORIGIN || 'http://localhost:5173'}
  `);
});
