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
      if (this.provider === 'openai') {
        return await this.callOpenAI(payload, keys.openai);
      } else if (this.provider === 'gemini') {
        return await this.callGemini(payload, keys.gemini);
      }
      return demoMode.generateResponse(payload);
    } catch (error) {
      console.error(`AI Generation Error (${this.provider}):`, error);
      return demoMode.generateResponse(payload);
    }
  }

  async callOpenAI(payload, apiKey) {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: DUNGEON_MASTER_PROMPT },
        { role: 'user', content: JSON.stringify(payload) }
      ],
      response_format: { type: 'json_object' }
    }, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    return response.data.choices[0].message.content;
  }

  async callGemini(payload, apiKey) {
    // Basic implementation for Gemini
    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      contents: [{
        parts: [{
          text: `${DUNGEON_MASTER_PROMPT}\n\nUser Game State:\n${JSON.stringify(payload)}`
        }]
      }]
    });
    const content = response.data.candidates[0].content.parts[0].text;
    // Clean JSON if it has markdown blocks
    return content.replace(/```json|```/g, '').trim();
  }
}

module.exports = new AIProvider();
