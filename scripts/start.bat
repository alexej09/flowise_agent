@echo off
REM Wechsel in den Repository-Root (Elternverzeichnis des "scripts"-Ordners)
cd /d "%~dp0\.."
echo Aktuelles Verzeichnis: %CD%
echo.

echo ===================================================
echo Flowise AI Agent - Start-Skript (Lokal)
echo ===================================================
echo.

REM Prüfe, ob der Ordner node_modules existiert
if not exist node_modules (
    echo Die node_modules wurden nicht gefunden!
    echo Bitte fuehre zuerst install.bat aus, um die Abhaengigkeiten zu installieren.
    pause
    exit /b 1
)

echo Starte Flowise AI Agent...
echo.
echo Der Server wird gestartet. Bitte warten Sie einen Moment...
echo Sobald der Server bereit ist, oeffnen Sie http://localhost:3000 in Ihrem Browser.
echo.
echo Druecken Sie STRG+C, um den Server zu beenden.
echo.

npx flowise start
pause
