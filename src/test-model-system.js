// Simple test script to verify the model system functionality
// This script tests the unified model system that replaces the previous separate modules

const modelSystem = require('./model-system');

async function testModelSystem() {
  console.log('Testing Model System...');
  
  try {
    // Initialize the model system
    console.log('Initializing model system...');
    await modelSystem.initialize();
    
    // Get available models
    const models = modelSystem.getAvailableModels();
    console.log(`Available models: ${models.length}`);
    
    // Get active model
    const activeModel = modelSystem.getActiveModel();
    console.log(`Active model: ${activeModel ? activeModel.id : 'none'}`);
    
    // Test model selection
    const selectedModel = modelSystem.selectModelForTask({ complexity: true });
    console.log(`Selected model for complex task: ${selectedModel.id}`);
    
    // Test sending a request
    console.log('Sending test request...');
    const response = await modelSystem.sendRequest('Hello, this is a test request', {
      temperature: 0.7,
      maxTokens: 100
    });
    
    console.log('Response received:');
    console.log(response);
    
    console.log('Model System test completed successfully!');
    return true;
  } catch (error) {
    console.error('Error testing model system:', error);
    return false;
  }
}

// Run the test
testModelSystem().then(success => {
  if (success) {
    console.log('All tests passed!');
  } else {
    console.log('Tests failed!');
  }
});
