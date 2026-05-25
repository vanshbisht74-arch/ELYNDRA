const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const generateStory = async (gameState) => {
  try {
    const response = await fetch(`${API_BASE_URL}/story/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameState),
    });

    if (!response.ok) {
      throw new Error('Failed to generate story from backend');
    }

    return await response.json();
  } catch (error) {
    console.error('API Service Error:', error);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.json();
  } catch (error) {
    console.error('Health Check Error:', error);
    return { status: 'error' };
  }
};
