// Model Integration for Flowise AI Agent
// This file contains configurations for integrating various AI models

module.exports = {
  // Configuration for OpenAI models
  openai: {
    // Default model if none is specified
    defaultModel: 'gpt-4o',
    // Available models
    availableModels: [
      'gpt-4o',
      'gpt-4-turbo',
      'gpt-3.5-turbo'
    ],
    // Default settings
    defaultSettings: {
      temperature: 0.7,
      maxTokens: 2000,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0
    }
  },
  
  // Configuration for local models via Ollama
  ollama: {
    // Default model if none is specified
    defaultModel: 'llama3',
    // Available models
    availableModels: [
      'llama3',
      'mistral',
      'gemma',
      'phi'
    ],
    // Default settings
    defaultSettings: {
      temperature: 0.7,
      maxTokens: 2000,
      topP: 0.9
    }
  },
  
  // Configuration for models via Groq
  groq: {
    // Default model if none is specified
    defaultModel: 'llama3-70b-8192',
    // Available models
    availableModels: [
      'llama3-70b-8192',
      'llama3-8b-8192',
      'mixtral-8x7b-32768'
    ],
    // Default settings
    defaultSettings: {
      temperature: 0.7,
      maxTokens: 2000,
      topP: 0.9
    }
  },
  
  // Configuration for model switching
  modelSwitching: {
    // Allows dynamic model switching based on requirements
    enabled: true,
    // Criteria for automatic model switching
    criteria: {
      // Switches to more powerful model for complex queries
      complexity: true,
      // Switches to local model for privacy concerns
      privacy: true,
      // Switches to faster model for real-time requirements
      speed: true
    }
  }
};
