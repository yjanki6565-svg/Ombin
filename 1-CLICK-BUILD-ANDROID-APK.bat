@echo off
title Om-LifeOS — 1-Click Android Mobile APK Builder
echo ========================================================
echo   Om-LifeOS Mobile APK Builder (Tauri Android)
echo   Building production Android APK...
echo ========================================================
call npm install
call npm run tauri:android:init
call npm run tauri:android:build
echo.
echo Build finished! Check: src-tauri\gen\android\app\build\outputs\apk\release\
pause
