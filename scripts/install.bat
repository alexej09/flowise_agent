@echo off
REM Wechsel in den Repository-Root (Elternverzeichnis des "scripts"-Ordners)
cd /d "%~dp0\.."
echo Aktuelles Verzeichnis: %CD%
echo.

echo ===================================================
echo Flowise AI Agent - Installationsskript (Lokal)
echo ===================================================
echo.

REM Prüfe, ob Node.js installiert ist
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js ist nicht installiert!
    echo Bitte installiere Node.js manuell von https://nodejs.org/ und fuehre dieses Skript erneut aus.
    pause
    exit /b 1
)
echo Node.js gefunden:
call node --version
echo.

REM Prüfe, ob npm installiert ist
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo npm ist nicht installiert!
    echo Bitte installiere Node.js neu, um npm zu erhalten.
    pause
    exit /b 1
)
echo npm gefunden:
call npm --version
echo.

REM Initialisiere package.json, falls nicht vorhanden
if not exist package.json (
    echo Initialisiere ein neues npm-Projekt...
    call npm init -y
    echo.
) else (
    echo package.json existiert bereits.
    echo.
)

echo Installiere Flowise und erforderliche Abhaengigkeiten lokal...
call npm install flowise langchainhub @opentelemetry/exporter-trace-otlp-grpc @opentelemetry/sdk-node @opentelemetry/sdk-trace-node @opentelemetry/semantic-conventions
if ERRORLEVEL 1 (
    echo Fehler bei der Installation der Abhaengigkeiten.
    pause
    exit /b 1
)
echo.
echo Überprüfe: Zeige Inhalt von node_modules:
dir node_modules
echo.
echo Installation abgeschlossen!
echo.
echo Um den AI-Agent zu starten, fuehre start.bat aus.
echo.
pause
