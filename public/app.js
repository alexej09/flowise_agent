// app.js - Hauptskript für den lokalen KI-Agenten

// DOM-Elemente
const themeToggle = document.getElementById('theme-toggle');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');
const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeSettings = document.getElementById('close-settings');
const tabButtons = document.querySelectorAll('.tab-button');
const saveSettings = document.getElementById('save-settings');
const resetSettings = document.getElementById('reset-settings');
const themeSelect = document.getElementById('theme-select');

// Zustandsvariablen
let currentTheme = localStorage.getItem('theme') || 'light';
let isSidebarCollapsed = false;
let isTyping = false;

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    // Theme initialisieren
    applyTheme(currentTheme);
    themeSelect.value = currentTheme;
    
    // Event-Listener hinzufügen
    setupEventListeners();
    
    // Automatische Größenanpassung für Textarea
    setupTextareaAutoResize();
    
    // Navigationslinks initialisieren
    setupNavigation();
});

// Theme anwenden
function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    
    // Icon im Theme-Toggle aktualisieren
    if (theme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Theme speichern
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

// Event-Listener einrichten
function setupEventListeners() {
    // Theme-Toggle
    themeToggle.addEventListener('click', () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });
    
    // Sidebar-Toggle
    sidebarToggle.addEventListener('click', () => {
        toggleSidebar();
    });
    
    // Chat-Eingabe senden
    sendButton.addEventListener('click', () => {
        sendMessage();
    });
    
    // Enter-Taste zum Senden (Shift+Enter für neue Zeile)
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Einstellungen öffnen
    settingsButton.addEventListener('click', () => {
        settingsModal.classList.add('active');
    });
    
    // Einstellungen schließen
    closeSettings.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });
    
    // Außerhalb des Modals klicken, um es zu schließen
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.remove('active');
        }
    });
    
    // Tab-Buttons in den Einstellungen
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Aktiven Tab-Button aktualisieren
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Tab-Inhalt anzeigen
            const tabId = button.getAttribute('data-tab');
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}-settings`).classList.add('active');
        });
    });
    
    // Einstellungen speichern
    saveSettings.addEventListener('click', () => {
        // Theme-Einstellung speichern
        applyTheme(themeSelect.value);
        
        // Weitere Einstellungen speichern...
        
        // Modal schließen
        settingsModal.classList.remove('active');
    });
    
    // Einstellungen zurücksetzen
    resetSettings.addEventListener('click', () => {
        // Standardeinstellungen wiederherstellen
        themeSelect.value = 'light';
        
        // Weitere Einstellungen zurücksetzen...
    });
}

// Sidebar ein-/ausklappen
function toggleSidebar() {
    isSidebarCollapsed = !isSidebarCollapsed;
    
    if (isSidebarCollapsed) {
        sidebar.classList.add('collapsed');
        sidebarToggle.innerHTML = '<i class="fas fa-chevron-right"></i>';
    } else {
        sidebar.classList.remove('collapsed');
        sidebarToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
    }
}

// Nachricht senden
function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message) {
        // Benutzernachricht anzeigen
        addMessage(message, 'user');
        
        // Eingabefeld leeren
        chatInput.value = '';
        
        // Textarea-Höhe zurücksetzen
        chatInput.style.height = 'auto';
        
        // Tippindikator anzeigen
        showTypingIndicator();
        
        // Simulierte Antwort vom Bot (in einer echten Anwendung würde hier die API-Anfrage erfolgen)
        setTimeout(() => {
            // Tippindikator entfernen
            removeTypingIndicator();
            
            // Bot-Antwort anzeigen
            const botResponse = "Ich habe deine Nachricht erhalten. Als lokaler KI-Agent kann ich dir bei verschiedenen Aufgaben helfen. Was möchtest du genau wissen oder tun?";
            addMessage(botResponse, 'bot');
        }, 1500);
    }
}

// Nachricht zur Chat-Ansicht hinzufügen
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`, 'fade-in');
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    
    // Text mit Markdown formatieren (einfache Implementierung)
    const formattedText = formatText(text);
    contentDiv.innerHTML = formattedText;
    
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('message-time');
    timeDiv.textContent = getCurrentTime();
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);
    
    chatMessages.appendChild(messageDiv);
    
    // Zum Ende des Chats scrollen
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Tippindikator anzeigen
function showTypingIndicator() {
    if (!isTyping) {
        isTyping = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.classList.add('message', 'bot-message');
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content', 'typing-indicator');
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            contentDiv.appendChild(dot);
        }
        
        typingDiv.appendChild(contentDiv);
        chatMessages.appendChild(typingDiv);
        
        // Zum Ende des Chats scrollen
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Tippindikator entfernen
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
        isTyping = false;
    }
}

// Aktuelle Zeit im Format HH:MM formatieren
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Text formatieren (einfache Markdown-Implementierung)
function formatText(text) {
    // Code-Blöcke
    text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Inline-Code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Fettdruck
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Kursiv
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    
    // Zeilenumbrüche
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

// Automatische Größenanpassung für Textarea
function setupTextareaAutoResize() {
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}

// Navigation einrichten
function setupNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Aktiven Link aktualisieren
            document.querySelectorAll('.sidebar-nav li').forEach(item => {
                item.classList.remove('active');
            });
            link.parentElement.classList.add('active');
            
            // Ansicht wechseln
            const viewId = link.getAttribute('href').substring(1) + '-view';
            document.querySelectorAll('.view').forEach(view => {
                view.classList.remove('active');
            });
            document.getElementById(viewId)?.classList.add('active');
            
            // Auf mobilen Geräten Sidebar nach Klick schließen
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        });
    });
}

// API-Kommunikation (Beispiel)
async function sendMessageToAPI(message) {
    try {
        const response = await fetch('/api/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message
            })
        });
        
        if (!response.ok) {
            throw new Error('API-Anfrage fehlgeschlagen');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Fehler bei der API-Kommunikation:', error);
        return {
            error: true,
            message: 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten.'
        };
    }
}

// Modell-Verwaltung (Beispiel)
async function getAvailableModels() {
    try {
        const response = await fetch('/api/v1/models');
        
        if (!response.ok) {
            throw new Error('Modell-Anfrage fehlgeschlagen');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Fehler beim Abrufen der Modelle:', error);
        return [];
    }
}

// Workflow-Verwaltung (Beispiel)
async function getWorkflows() {
    try {
        const response = await fetch('/api/v1/workflows');
        
        if (!response.ok) {
            throw new Error('Workflow-Anfrage fehlgeschlagen');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Fehler beim Abrufen der Workflows:', error);
        return [];
    }
}

// Exportiere Funktionen für externe Verwendung
window.appFunctions = {
    sendMessage,
    toggleTheme: () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    },
    toggleSidebar
};
