@echo off
title Om-LifeOS — 1-Click Web Dev Server
echo ========================================================
echo   Om-LifeOS Sovereign Personal Operating System
echo   Starting Web Dev Server (Port 3000)...
echo ========================================================
call npm install
call npm run dev
pause
