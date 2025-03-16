// API Endpoints Configuration for Flowise AI Agent
// This file defines the API endpoints for interaction with the AI Agent

module.exports = {
  // Main endpoints
  endpoints: {
    // Endpoint for chat requests
    chat: {
      path: '/api/v1/chat',
      methods: ['POST'],
      rateLimit: {
        windowMs: 60000, // 1 minute
        max: 30 // Maximum requests per minute
      },
      authentication: true
    },
    
    // Endpoint for workflow management
    workflows: {
      path: '/api/v1/workflows',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      rateLimit: {
        windowMs: 60000, // 1 minute
        max: 20 // Maximum requests per minute
      },
      authentication: true
    },
    
    // Endpoint for model management
    models: {
      path: '/api/v1/models',
      methods: ['GET', 'POST'],
      rateLimit: {
        windowMs: 60000, // 1 minute
        max: 10 // Maximum requests per minute
      },
      authentication: true
    },
    
    // Endpoint for credential management
    credentials: {
      path: '/api/v1/credentials',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      rateLimit: {
        windowMs: 60000, // 1 minute
        max: 10 // Maximum requests per minute
      },
      authentication: true
    }
  },
  
  // Middleware configuration
  middleware: {
    // CORS configuration
    cors: {
      enabled: true,
      options: {
        origin: '*', // Restrict in production environments
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
      }
    },
    
    // Authentication
    authentication: {
      enabled: true,
      methods: {
        apiKey: true,
        jwt: true
      }
    },
    
    // Rate Limiting
    rateLimit: {
      enabled: true,
      defaultOptions: {
        windowMs: 60000, // 1 minute
        max: 100, // Maximum requests per minute
        standardHeaders: true,
        legacyHeaders: false
      }
    }
  },
  
  // Webhook configuration
  webhooks: {
    enabled: true,
    endpoints: {
      // Webhook for chat events
      chatEvents: {
        path: '/api/v1/webhooks/chat',
        methods: ['POST'],
        authentication: true
      },
      
      // Webhook for workflow events
      workflowEvents: {
        path: '/api/v1/webhooks/workflow',
        methods: ['POST'],
        authentication: true
      }
    }
  }
};
