@echo off
chcp 65001 >nul
cd /d %~dp0

echo Запускаем 3 окна...

start "1. SERVER" cmd /k "node server/server.js"
start "2. TUNNEL (lh.run)" cmd /k "node server/tunnel.js"
start "3. DEPLOY" cmd /k "node server/deploy.js"

echo Окна открыты. Следи за окном TUNNEL и DEPLOY.
pause