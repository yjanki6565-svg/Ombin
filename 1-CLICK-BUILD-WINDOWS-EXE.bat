@echo off
title Om-LifeOS — 1-Click Windows Native EXE Builder
echo ========================================================
echo   Om-LifeOS Sovereign Windows EXE Builder (Tauri v2)
echo   Building production Windows NSIS installer...
echo ========================================================
call npm install
call npm run build
call npm run tauri:build:windows
echo.
echo Build finished! Check: src-tauri\target\release\bundle\nsis\
pause
