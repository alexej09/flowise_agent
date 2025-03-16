@echo off
REM Finalisierungsskript für den lokalen KI-Agenten mit Flowise

echo Finalisiere den lokalen KI-Agenten...

REM Erstelle Zip-Datei für die Verteilung
echo Erstelle Zip-Datei für die Verteilung...
powershell Compress-Archive -Path * -DestinationPath flowise-agent.zip -Force

echo.
echo Finalisierung abgeschlossen!
echo.
echo Der lokale KI-Agent wurde erfolgreich finalisiert und ist bereit für die Verteilung.
echo Die Zip-Datei "flowise-agent.zip" enthält alle notwendigen Dateien und kann in das
echo Zielverzeichnis C:\Users\alexe\Documents\Business\Weiterbildung entpackt werden.
echo.
echo Installationsanweisungen:
echo 1. Entpacken Sie die Zip-Datei in C:\Users\alexe\Documents\Business\Weiterbildung
echo 2. Navigieren Sie zum entpackten Verzeichnis
echo 3. Führen Sie scripts\install.bat aus, um den KI-Agenten zu installieren
echo 4. Führen Sie scripts\start.bat aus, um den KI-Agenten zu starten
echo 5. Öffnen Sie einen Webbrowser und navigieren Sie zu http://localhost:3000
echo.
echo Viel Spaß mit Ihrem lokalen KI-Agenten!
echo.
pause
