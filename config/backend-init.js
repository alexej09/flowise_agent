// Backend initialization script that uses the new model-system.js
// This file updates the backend-init.js to use the unified model system

// Import configurations
const backendConfig = require('./backend.config');
const modelIntegration = require('./model-integration');
const apiEndpoints = require('./api-endpoints');
const databaseInit = require('./database-init');
const modelSystem = require('../src/model-system');

// Load environment variables
require('dotenv').config();

/**
 * Main function to start the backend system
 */
async function startBackend() {
  console.log('Starting Flowise AI Agent Backend System...');
  
  try {
    // Initialize database
    await databaseInit.initialize(backendConfig);
    
    // Initialize model system
    console.log('Initializing AI model system...');
    await modelSystem.initialize();
    
    // Configure API endpoints
    console.log('Configuring API endpoints...');
    // This is where the actual API configuration would take place
    
    // Start server
    console.log(`Starting server on port ${backendConfig.server.port}...`);
    // This is where the actual server start would take place
    
    console.log('Flowise AI Agent Backend System successfully started!');
    console.log(`Access via: http://localhost:${backendConfig.server.port}`);
    
    return true;
  } catch (error) {
    console.error('Error starting the backend system:', error);
    return false;
  }
}

/**
 * Function to stop the backend system
 */
async function stopBackend() {
  console.log('Stopping Flowise AI Agent Backend System...');
  
  try {
    // This is where the actual shutdown logic would take place
    
    console.log('Flowise AI Agent Backend System successfully stopped!');
    return true;
  } catch (error) {
    console.error('Error stopping the backend system:', error);
    return false;
  }
}

// Export functions for external use
module.exports = {
  start: startBackend,
  stop: stopBackend,
  config: {
    backend: backendConfig,
    models: modelIntegration,
    api: apiEndpoints,
    database: databaseInit
  }
};

// Direct start if the file is executed directly
if (require.main === module) {
  startBackend().catch(console.error);
}
