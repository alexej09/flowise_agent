// Restructured model system to avoid circular dependencies
// This file serves as the central module for model-related functionality

const fs = require('fs');
const path = require('path');

// Model types
const MODEL_TYPES = {
    OPENAI: 'openai',
    OLLAMA: 'ollama',
    GROQ: 'groq',
    HUGGINGFACE: 'huggingface',
    CUSTOM: 'custom'
};

// Import configuration
const modelConfig = require('../config/model-integration');

/**
 * Model System Class
 * Combines functionality previously split across multiple files
 */
class ModelSystem {
    constructor() {
        // Model manager properties
        this.availableModels = {};
        this.activeModel = null;
        this.modelCredentials = {};
        
        // Model loader properties
        this.modelDir = process.env.MODEL_PATH || path.join(process.cwd(), 'models');
        this.ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
        
        // Interface properties
        this.initialized = false;
    }

    /**
     * Initializes the entire model system
     */
    async initialize() {
        console.log('Initializing Model System...');
        
        try {
            // Create model directory if it doesn't exist
            if (!fs.existsSync(this.modelDir)) {
                fs.mkdirSync(this.modelDir, { recursive: true });
                console.log(`Model directory created: ${this.modelDir}`);
            }
            
            // Load OpenAI models
            this.loadOpenAIModels();
            
            // Load Ollama models (local)
            await this.loadOllamaModels();
            
            // Load Groq models
            this.loadGroqModels();
            
            // Set default model
            this.setDefaultModel();
            
            // Scan local models
            await this.scanLocalModels();
            
            this.initialized = true;
            console.log('Model System successfully initialized.');
            return true;
        } catch (error) {
            console.error('Error initializing Model System:', error);
            return false;
        }
    }

    // ===== Model Manager Functions =====

    /**
     * Loads OpenAI models
     */
    loadOpenAIModels() {
        console.log('Loading OpenAI models...');
        
        const openaiModels = modelConfig.openai.availableModels.map(modelName => ({
            id: `openai-${modelName}`,
            name: modelName,
            type: MODEL_TYPES.OPENAI,
            description: this.getModelDescription(modelName),
            settings: { ...modelConfig.openai.defaultSettings },
            isLocal: false
        }));
        
        this.registerModels(openaiModels);
    }

    /**
     * Loads Ollama models (local)
     */
    async loadOllamaModels() {
        console.log('Loading local Ollama models...');
        
        try {
            // In a real implementation, this would make a request to the Ollama server
            // For this demo, we use the preconfigured models
            const ollamaModels = modelConfig.ollama.availableModels.map(modelName => ({
                id: `ollama-${modelName}`,
                name: modelName,
                type: MODEL_TYPES.OLLAMA,
                description: this.getModelDescription(modelName),
                settings: { ...modelConfig.ollama.defaultSettings },
                isLocal: true
            }));
            
            this.registerModels(ollamaModels);
        } catch (error) {
            console.error('Error loading Ollama models:', error);
            // Fallback: Empty list if Ollama is not available
        }
    }

    /**
     * Loads Groq models
     */
    loadGroqModels() {
        console.log('Loading Groq models...');
        
        const groqModels = modelConfig.groq.availableModels.map(modelName => ({
            id: `groq-${modelName}`,
            name: modelName,
            type: MODEL_TYPES.GROQ,
            description: this.getModelDescription(modelName),
            settings: { ...modelConfig.groq.defaultSettings },
            isLocal: false
        }));
        
        this.registerModels(groqModels);
    }

    /**
     * Registers models in the manager
     */
    registerModels(models) {
        for (const model of models) {
            this.availableModels[model.id] = model;
        }
    }

    /**
     * Sets the default model
     */
    setDefaultModel() {
        // Try to use a local model first
        const localModels = Object.values(this.availableModels).filter(model => model.isLocal);
        
        if (localModels.length > 0) {
            this.activeModel = localModels[0].id;
        } else {
            // Fallback to OpenAI model
            const openaiModels = Object.values(this.availableModels).filter(model => model.type === MODEL_TYPES.OPENAI);
            
            if (openaiModels.length > 0) {
                this.activeModel = openaiModels[0].id;
            } else {
                // Fallback to the first available model
                const modelIds = Object.keys(this.availableModels);
                
                if (modelIds.length > 0) {
                    this.activeModel = modelIds[0];
                }
            }
        }
        
        console.log(`Default model set: ${this.activeModel}`);
    }

    /**
     * Returns a list of all available models
     */
    getAvailableModels() {
        return Object.values(this.availableModels);
    }

    /**
     * Returns the active model
     */
    getActiveModel() {
        return this.availableModels[this.activeModel];
    }

    /**
     * Sets the active model
     */
    setActiveModel(modelId) {
        if (this.availableModels[modelId]) {
            this.activeModel = modelId;
            console.log(`Active model changed to: ${modelId}`);
            return true;
        } else {
            console.error(`Model not found: ${modelId}`);
            return false;
        }
    }

    /**
     * Updates the settings of a model
     */
    updateModelSettings(modelId, settings) {
        if (this.availableModels[modelId]) {
            this.availableModels[modelId].settings = {
                ...this.availableModels[modelId].settings,
                ...settings
            };
            console.log(`Settings for model ${modelId} updated`);
            return true;
        } else {
            console.error(`Model not found: ${modelId}`);
            return false;
        }
    }

    /**
     * Saves credentials for a model
     */
    setModelCredentials(type, credentials) {
        this.modelCredentials[type] = credentials;
        console.log(`Credentials for ${type} saved`);
    }

    /**
     * Returns credentials for a model
     */
    getModelCredentials(type) {
        return this.modelCredentials[type] || null;
    }

    /**
     * Adds a custom model
     */
    addCustomModel(name, settings, isLocal = false) {
        const id = `custom-${name.toLowerCase().replace(/\s+/g, '-')}`;
        
        this.availableModels[id] = {
            id,
            name,
            type: MODEL_TYPES.CUSTOM,
            description: `Custom model: ${name}`,
            settings,
            isLocal
        };
        
        console.log(`Custom model added: ${name}`);
        return id;
    }

    /**
     * Removes a model
     */
    removeModel(modelId) {
        if (this.availableModels[modelId]) {
            delete this.availableModels[modelId];
            
            // If the active model was removed, set a new default model
            if (this.activeModel === modelId) {
                this.setDefaultModel();
            }
            
            console.log(`Model removed: ${modelId}`);
            return true;
        } else {
            console.error(`Model not found: ${modelId}`);
            return false;
        }
    }

    /**
     * Returns a description for a model
     */
    getModelDescription(modelName) {
        const descriptions = {
            // OpenAI models
            'gpt-4o': 'Powerful multimodal model for various tasks.',
            'gpt-4-turbo': 'Advanced model with high performance and speed.',
            'gpt-3.5-turbo': 'Fast and cost-effective model for simpler tasks.',
            
            // Ollama models
            'llama3': 'Local Llama 3 model for enhanced privacy and offline use.',
            'mistral': 'Efficient local model with good price-performance ratio.',
            'gemma': 'Compact, lightweight model from Google for local execution.',
            'phi': 'Small, efficient model for resource-constrained environments.',
            
            // Groq models
            'llama3-70b-8192': 'Large Llama 3 model (70B) with high performance via Groq.',
            'llama3-8b-8192': 'Smaller Llama 3 model (8B) with good balance of performance and speed.',
            'mixtral-8x7b-32768': 'Powerful Mixtral model with large context window.'
        };
        
        return descriptions[modelName] || 'No description available.';
    }

    /**
     * Automatically selects an appropriate model based on requirements
     */
    selectModelForTask(requirements) {
        console.log('Selecting model based on requirements:', requirements);
        
        // If model switching is disabled, use the active model
        if (!modelConfig.modelSwitching.enabled) {
            return this.getActiveModel();
        }
        
        const models = Object.values(this.availableModels);
        let selectedModel = this.getActiveModel();
        
        // Prioritize privacy if required
        if (requirements.privacy && modelConfig.modelSwitching.criteria.privacy) {
            const localModels = models.filter(model => model.isLocal);
            
            if (localModels.length > 0) {
                selectedModel = localModels[0];
            }
        }
        // Prioritize complexity if required
        else if (requirements.complexity && modelConfig.modelSwitching.criteria.complexity) {
            // Simple heuristic: OpenAI GPT-4 models for complex tasks
            const powerfulModels = models.filter(model => 
                model.type === MODEL_TYPES.OPENAI && model.name.includes('gpt-4')
            );
            
            if (powerfulModels.length > 0) {
                selectedModel = powerfulModels[0];
            }
        }
        // Prioritize speed if required
        else if (requirements.speed && modelConfig.modelSwitching.criteria.speed) {
            // Simple heuristic: Smaller models or Groq for speed
            const fastModels = models.filter(model => 
                model.type === MODEL_TYPES.GROQ || 
                (model.type === MODEL_TYPES.OPENAI && model.name.includes('gpt-3.5'))
            );
            
            if (fastModels.length > 0) {
                selectedModel = fastModels[0];
            }
        }
        
        console.log(`Model selected for task: ${selectedModel.id}`);
        return selectedModel;
    }

    // ===== Model Loader Functions =====

    /**
     * Scans for local models in the model directory
     */
    async scanLocalModels() {
        console.log(`Scanning local models in: ${this.modelDir}`);
        
        try {
            // In a real implementation, local model files would be scanned here
            // For this demo, we use the preconfigured models
            
            // Check connection to Ollama
            const ollamaAvailable = await this.checkOllamaConnection();
            
            if (ollamaAvailable) {
                console.log('Ollama connection successful, local models available.');
            } else {
                console.log('Ollama not available, local models cannot be used.');
            }
        } catch (error) {
            console.error('Error scanning local models:', error);
        }
    }

    /**
     * Checks the connection to the Ollama server
     */
    async checkOllamaConnection() {
        try {
            // In a real implementation, this would make a request to the Ollama server
            // For this demo, we simulate a successful connection
            return true;
        } catch (error) {
            console.error('Error connecting to Ollama:', error);
            return false;
        }
    }

    /**
     * Loads a model from a file
     */
    async loadModelFromFile(filePath) {
        console.log(`Loading model from file: ${filePath}`);
        
        try {
            // In a real implementation, the model would be loaded here
            // For this demo, we simulate loading
            
            const fileName = path.basename(filePath);
            const modelName = fileName.split('.')[0];
            
            // Add custom model to manager
            const modelId = this.addCustomModel(modelName, {
                temperature: 0.7,
                maxTokens: 2000
            }, true);
            
            console.log(`Model successfully loaded: ${modelId}`);
            return modelId;
        } catch (error) {
            console.error('Error loading model:', error);
            return null;
        }
    }

    /**
     * Loads a model from Ollama
     */
    async loadModelFromOllama(modelName) {
        console.log(`Loading model from Ollama: ${modelName}`);
        
        try {
            // In a real implementation, this would make a request to the Ollama server
            // For this demo, we simulate loading
            
            // Check if the model is already registered in the manager
            const existingModels = this.getAvailableModels();
            const existingModel = existingModels.find(model => 
                model.type === 'ollama' && model.name === modelName
            );
            
            if (existingModel) {
                console.log(`Model already loaded: ${existingModel.id}`);
                return existingModel.id;
            }
            
            // Add custom model to manager
            const modelId = this.addCustomModel(modelName, {
                temperature: 0.7,
                maxTokens: 2000
            }, true);
            
            console.log(`Model successfully loaded: ${modelId}`);
            return modelId;
        } catch (error) {
            console.error('Error loading model from Ollama:', error);
            return null;
        }
    }

    /**
     * Loads a model from a cloud service
     */
    async loadModelFromCloud(provider, modelName) {
        console.log(`Loading model from cloud service: ${provider}/${modelName}`);
        
        try {
            // In a real implementation, this would make a request to the cloud service
            // For this demo, we simulate loading
            
            // Check if the model is already registered in the manager
            const existingModels = this.getAvailableModels();
            const existingModel = existingModels.find(model => 
                model.type === provider && model.name === modelName
            );
            
            if (existingModel) {
                console.log(`Model already loaded: ${existingModel.id}`);
                return existingModel.id;
            }
            
            // Add custom model to manager
            const modelId = this.addCustomModel(modelName, {
                temperature: 0.7,
                maxTokens: 2000
            }, false);
            
            console.log(`Model successfully loaded: ${modelId}`);
            return modelId;
        } catch (error) {
            console.error(`Error loading model from ${provider}:`, error);
            return null;
        }
    }

    /**
     * Updates a model
     */
    async updateModel(modelId) {
        console.log(`Updating model: ${modelId}`);
        
        try {
            // In a real implementation, the model would be updated here
            // For this demo, we simulate the update
            
            const model = this.availableModels[modelId];
            
            if (!model) {
                console.log(`Model not found: ${modelId}`);
                return false;
            }
            
            // Simulate update
            console.log(`Model successfully updated: ${modelId}`);
            return true;
        } catch (error) {
            console.error('Error updating model:', error);
            return false;
        }
    }

    /**
     * Returns a list of all available local models
     */
    getAvailableLocalModels() {
        const models = this.getAvailableModels();
        return models.filter(model => model.isLocal);
    }

    /**
     * Returns a list of all available cloud models
     */
    getAvailableCloudModels() {
        const models = this.getAvailableModels();
        return models.filter(model => !model.isLocal);
    }

    // ===== Model Interface Functions =====

    /**
     * Sends a request to the active model
     */
    async sendRequest(prompt, options = {}) {
        if (!this.initialized) {
            await this.initialize();
        }
        
        console.log('Sending request to model...');
        
        try {
            // Select model based on requirements
            const model = this.selectModelForTask(options.requirements || {});
            
            if (!model) {
                throw new Error('No suitable model found.');
            }
            
            console.log(`Using model: ${model.id}`);
            
            // Merge model-specific settings
            const settings = {
                ...model.settings,
                ...options
            };
            
            // In a real implementation, the actual request to the model would be made here
            // For this demo, we simulate a response
            
            const response = await this.simulateModelResponse(model, prompt, settings);
            
            console.log('Response received from model.');
            return response;
        } catch (error) {
            console.error('Error in model request:', error);
            return {
                error: true,
                message: `Error in model request: ${error.message}`
            };
        }
    }

    /**
     * Simulates a response from the model (for demo purposes only)
     */
    async simulateModelResponse(model, prompt, settings) {
        // Simulate a short delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return {
            model: model.id,
            prompt,
            response: `This is a simulated response from model ${model.name} to the request: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`,
            settings
        };
    }

    /**
     * Saves API key for a model provider
     */
    setApiKey(provider, apiKey) {
        console.log(`Saving API key for: ${provider}`);
        
        try {
            this.setModelCredentials(provider, { apiKey });
            return true;
        } catch (error) {
            console.error('Error saving API key:', error);
            return false;
        }
    }
}

// Export a single instance of the model system
module.exports = new ModelSystem();
