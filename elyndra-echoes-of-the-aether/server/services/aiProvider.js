const axios = require('axios');
const demoMode = require('./demoMode');
const { DUNGEON_MASTER_PROMPT } = require('../prompts/dungeonMasterPrompt');

/**
 * Adapter for AI Providers (OpenAI, Gemini, Claude)
 * Defaults to Demo Mode if no keys are present.
 */
class AIProvider {
  constructor() {
    this.provider = process.env.AI_PROVIDER || 'demo';
  }

  async generateStory(payload) {
    if (this.provider === 'demo') {
      return demoMode.generateResponse(payload);
    }

    // Check for keys based on provider
    const keys = {
        openai: process.env.OPENAI_API_KEY,
        gemini: process.env.GEMINI_API_KEY,
        anthropic: process.env.ANTHROPIC_API_KEY
    };

    if (!keys[this.provider]) {
        console.warn(`⚠️ Warning: ${this.provider} selected but no API key found. Falling back to Demo Mode.`);
        return demoMode.generateResponse(payload);
    }

    try {
      // In a real implementation, call the specific provider's API here.
      // For this version, we implement the architecture but default to Demo
      // since no real keys are provided during verification.
      return demoMode.generateResponse(payload);
    } catch (error) {
      console.error('AI Generation Error:', error);
      return demoMode.generateResponse(payload);
    }
  }
}

module.exports = new AIProvider();
