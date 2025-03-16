#!/bin/bash

# Testskript für den lokalen KI-Agenten mit Flowise

echo "Starte Tests für den lokalen KI-Agenten..."

# Verzeichnisstruktur prüfen
echo "Prüfe Verzeichnisstruktur..."
directories=("config" "docs" "flows" "models" "public" "scripts" "src")
for dir in "${directories[@]}"; do
  if [ -d "$dir" ]; then
    echo "✓ Verzeichnis $dir existiert"
  else
    echo "✗ Verzeichnis $dir fehlt"
    exit 1
  fi
done

# Dateien prüfen
echo "Prüfe wichtige Dateien..."
files=(
  "README.md"
  "docs/user_manual.md"
  "config/.env"
  "config/api-endpoints.js"
  "config/backend-init.js"
  "config/backend.config.js"
  "config/database-init.js"
  "config/gui-config.js"
  "config/model-integration.js"
  "flows/manus-like-agent.json"
  "public/index.html"
  "public/styles.css"
  "public/app.js"
  "scripts/install.bat"
  "scripts/start.bat"
  "src/model-interface.js"
  "src/model-loader.js"
  "src/model-manager.js"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ Datei $file existiert"
  else
    echo "✗ Datei $file fehlt"
    exit 1
  fi
done

echo "Alle erforderlichen Dateien und Verzeichnisse sind vorhanden."
echo "Tests erfolgreich abgeschlossen!"
