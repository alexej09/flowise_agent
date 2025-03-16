// Flowise Backend Configuration
// This file contains additional configurations for the backend system

module.exports = {
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0', // Allows access from all network interfaces
    cors: {
      origin: '*', // Restrict in production environments
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  },
  
  // Database configuration
  database: {
    path: process.env.DATABASE_PATH || '.flowise',
    autosave: true,
    autosaveInterval: 5000 // Saves changes every 5 seconds
  },
  
  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    path: process.env.LOG_PATH || '.flowise/logs'
  },
  
  // Security configuration
  security: {
    apiKey: process.env.FLOWISE_APIKEY,
    secretKey: process.env.FLOWISE_SECRETKEY_OVERWRITE,
    jwtSecret: process.env.FLOWISE_JWT_SECRET || 'flowise-secret-key',
    jwtExpiry: process.env.FLOWISE_JWT_EXPIRY || '1d'
  },
  
  // Model configuration
  models: {
    // Configuration for local models, if used
    localModelsPath: process.env.MODEL_PATH,
    // Ollama configuration, if used
    ollamaBaseUrl: process.env.OLLAMA_BASE_URL
  },
  
  // Resource limits
  limits: {
    // Maximum number of concurrent requests
    maxConcurrentExecutions: 10,
    // Request timeout in milliseconds
    executionTimeout: 300000, // 5 minutes
    // Maximum size for file uploads
    maxUploadSize: '50mb'
  }
};
