// GUI Configuration for Flowise AI Agent
// This file contains settings for the user interface

module.exports = {
  // General UI settings
  ui: {
    // Application title
    title: 'Local AI Agent',
    // Description
    description: 'A local AI Agent with Manus-like functionality',
    // Primary color
    primaryColor: '#6366f1', // Indigo
    // Secondary color
    secondaryColor: '#8b5cf6', // Violet
    // Dark mode settings
    darkMode: {
      enabled: true,
      default: 'system' // 'light', 'dark', 'system'
    },
    // Logo settings
    logo: {
      path: '../assets/logo.png',
      altText: 'AI Agent Logo'
    }
  },
  
  // Layout settings
  layout: {
    // Sidebar
    sidebar: {
      enabled: true,
      defaultOpen: true,
      width: 280, // in pixels
      collapsible: true
    },
    // Main area
    mainArea: {
      defaultView: 'chat', // 'chat', 'flows', 'settings'
      chatView: {
        showHistory: true,
        showToolbar: true
      }
    },
    // Header
    header: {
      height: 60, // in pixels
      showLogo: true,
      showTitle: true
    }
  },
  
  // Component settings
  components: {
    // Chat component
    chat: {
      bubbleStyle: 'modern', // 'classic', 'modern', 'minimal'
      userBubbleColor: '#e0e7ff', // Light indigo
      botBubbleColor: '#f3f4f6', // Light gray
      showTimestamp: true,
      showTypingIndicator: true,
      codeHighlighting: true,
      markdownSupport: true
    },
    // Workflow editor
    flowEditor: {
      showMinimap: true,
      snapToGrid: true,
      autoLayout: false,
      zoomControls: true
    },
    // Settings area
    settings: {
      sections: [
        'general',
        'models',
        'api',
        'storage',
        'advanced'
      ],
      showAdvancedOptions: false
    }
  },
  
  // Responsive design
  responsive: {
    breakpoints: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    },
    mobileLayout: {
      sidebarCollapsed: true,
      simplifiedUI: true
    }
  },
  
  // Accessibility
  accessibility: {
    highContrast: false,
    largeText: false,
    screenReaderSupport: true,
    keyboardNavigation: true
  }
};
