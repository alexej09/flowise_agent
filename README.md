# Local AI Agent with Flowise

A fully local AI Agent with Manus-like functionality, based on the Flowise framework. This project enables you to use powerful AI features on your own computer, with full control over your data and privacy.

## Features

- **Fully local execution**: All components can be run locally on your computer
- **Manus-like user interface**: Intuitive and user-friendly interface
- **Interchangeable AI models**: Support for various local and cloud-based models
- **Workflow editor**: Visual creation and customization of AI workflows
- **Privacy**: Full control over your data and privacy
- **Extensible**: Easy integration of new features and models

## Quick Start

### Prerequisites

- Windows 10/11, macOS, or Linux
- Node.js (version 18 or higher) - automatically installed by the setup script
- Minimum 8 GB RAM (16 GB recommended)

### Installation

1. Clone this repository or download and extract it

2. Install latest version of node.js by following: [https://nodejs.org/](https://nodejs.org/)

3. Run the installation script:
   ```
   # Windows
   scripts\install.bat
   
   # Linux/macOS
   ./scripts/install.sh
   ```

4. Start the AI Agent:
   ```
   # Windows
   scripts\start.bat
   
   # Linux/macOS
   ./scripts/start.sh
   ```

5. Open a web browser and navigate to:
   ```
   http://localhost:3000
   ```

## Supported AI Models

### Local Models (via Ollama)

- Llama 3
- Mistral
- Gemma
- Phi

### Cloud-based Models

- OpenAI (GPT-4o, GPT-4-turbo, GPT-3.5-turbo)
- Groq (Llama3-70b, Llama3-8b, Mixtral)

## Project Structure

```
flowise-agent/
├── config/                # Configuration files
│   ├── .env               # Environment variables
│   ├── api-endpoints.js   # API endpoints
│   ├── backend-init.js    # Backend initialization
│   ├── backend.config.js  # Backend configuration
│   ├── database-init.js   # Database initialization
│   ├── gui-config.js      # GUI configuration
│   └── model-integration.js # Model integration
├── flows/                 # Preconfigured workflows
│   └── manus-like-agent.json # Manus-like agent
├── models/                # Directory for local models
├── public/                # Public files
│   ├── index.html         # Main page
│   ├── styles.css         # CSS styles
│   └── app.js             # JavaScript code
├── scripts/               # Helper scripts
│   ├── install.bat        # Windows installation script
│   ├── install.sh         # Linux/macOS installation script
│   ├── start.bat          # Windows start script
│   └── start.sh           # Linux/macOS start script
├── src/                   # Source code
│   ├── model-interface.js # Model interface
│   ├── model-loader.js    # Model loader
│   └── model-manager.js   # Model manager
└── README.md              # This file
```

## Detailed Installation

### 1. Node.js

Node.js should be installed manually

### 2. Ollama installation (optional, for local models)

For using local models:

1. Visit [ollama.ai](https://ollama.ai/)
2. Download and install Ollama
3. Start Ollama and download the desired models:
   ```
   ollama pull llama3
   ollama pull mistral
   ```

### 3. AI Agent installation

1. Clone this repository or download and extract it

2. Open a command line and navigate to the project directory

3. Run the installation script:
   ```
   # Windows
   scripts\install.bat
   
   # Linux/macOS
   ./scripts/install.sh
   ```

   The script performs the following actions:
   - Installation of Flowise and all dependencies
   - Creation of necessary directories
   - Configuration of environment variables

### 4. Starting the AI Agent

1. Run the start script:
   ```
   # Windows
   scripts\start.bat
   
   # Linux/macOS
   ./scripts/start.sh
   ```

2. Open a web browser and navigate to:
   ```
   http://localhost:3000
   ```

## Configuration

### Setting up API keys (optional)

For using cloud-based models, you need to configure the corresponding API keys in the `.env` file:

```
# OpenAI API key
OPENAI_API_KEY=your_openai_api_key

# Groq API key
GROQ_API_KEY=your_groq_api_key
```

### Customizing model settings

You can customize the default settings for the models in the `config/model-integration.js` file.

## Usage

After starting, you can use the AI Agent through the web interface:

1. **Chat**: Interact directly with the AI Agent
2. **Workflows**: Create and manage workflows
3. **Models**: Configure various AI models
4. **Settings**: Customize the AI Agent to your needs

For more information, see the [User Manual](https://docs.flowiseai.com/).

## Troubleshooting

### Common issues

1. **AI Agent doesn't start**
   - Check if Node.js is correctly installed
   - Make sure all dependencies are installed
   - Check the log files in the `.flowise` directory

2. **Connection problems with AI models**
   - Check your API keys and connection settings
   - Make sure the Ollama server is running (for local models)
   - Check your internet connection (for cloud models)

3. **Slow performance**
   - Reduce the model size or use a more efficient model
   - Close other resource-intensive applications
   - Increase the available memory in the configuration

## Additional Resources

- [Flowise Documentation](https://docs.flowiseai.com/)
- [Ollama Documentation](https://ollama.ai/docs)
- [OpenAI Documentation](https://platform.openai.com/docs)
- [Groq Documentation](https://console.groq.com/docs)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Flowise](https://flowiseai.com/) for the great framework
- [Ollama](https://ollama.ai/) for local model execution
- [OpenAI](https://openai.com/) and [Groq](https://groq.com/) for their AI models and APIs
