const express = require('express');
const router = express.Router();
const aiProvider = require('../services/aiProvider');

router.post('/generate', async (req, res) => {
  try {
    const gameState = req.body;
    const storyResponse = await aiProvider.generateStory(gameState);
    res.json(storyResponse);
  } catch (error) {
    console.error('Story Route Error:', error);
    res.status(500).json({ error: 'Failed to generate story' });
  }
});

module.exports = router;
