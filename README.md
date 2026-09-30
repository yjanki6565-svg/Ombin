# ॐ Om-LifeOS — Universal Sovereign Personal Operating System

> **A sovereign, offline-first, 10-year personal operating system** designed for high-leverage execution, double-entry financial accounting, health mastery, and lifelong personal knowledge management. Built to run seamlessly across **Windows Desktop (.exe)**, **Android Mobile (.apk)**, and **Web Browser / Self-Hosted PWA**.

---

## 🌟 Core Pillars

- **100% Local Sovereign Storage**: Complete independence from centralized cloud vendors. All tasks, ledgers, notes, habits, audio recordings, and journals are stored locally in your browser/device database (IndexedDB / Local Vault).
- **Universal Multi-Target Architecture**:
  - 🖥 **Windows Desktop Application**: Native desktop shell with translucent glassmorphic frame, tray, system shortcuts, and background audio alarm engine via Tauri v2.
  - 📱 **Mobile Application**: Responsive touch interface, bottom navigation dock, offline cache, and full biometric/local storage support.
  - 🌐 **Web Site & PWA**: Accessible from any modern browser with instant installability (`manifest.json` and service worker offline caching).
- **10-Year Longevity Guarantee**:
  - Full Atomic Vault Snapshots (`.omlifeos` encrypted JSON export & import).
  - Direct computer folder synchronization and zero-dependency standalone HTML build.
  - Double-entry accounting ledger conforming to international standard financial integrity.

---

## 🚀 Quick Start (Development)

### Prerequisites
- [Node.js](https://nodejs.org/) v20+ (v22 recommended)
- [Rust & Cargo](https://rustup.rs/) (only required for building native Windows `.exe` or Android `.apk`)

### 1. Run in Browser
```bash
# Install dependencies
npm install

# Start local dev server (port 3000)
npm run dev

# Open in browser: http://localhost:3000
```

### 2. Build for Web Production
```bash
npm run build
# Output files will be generated in ./dist directory
# You can serve ./dist with any static file server or deploy to Vercel/Netlify/Cloudflare
```

---

## 🖥 Windows Desktop Build (.exe / NSIS)

Om-LifeOS utilizes **Tauri v2** to generate ultra-lightweight, native Windows executables (typically under 15MB, compared to 150MB+ Electron apps).

```bash
# 1. Install Tauri CLI if not already installed globally
npm install -g @tauri-apps/cli

# 2. Build production Windows installer
npm run tauri:build

# Or specifically targeting 64-bit Windows MSVC:
npm run tauri:build:windows
```

The resulting Windows installer `.exe` and `.msi` will be located in:
`src-tauri/target/release/bundle/nsis/Om-LifeOS_4.7.9_x64-setup.exe`

---

## 📱 Mobile Build (Android .apk)

Om-LifeOS can be bundled into a native Android APK using Tauri Android:

```bash
# 1. Initialize Android platform project
npm run tauri:android:init

# 2. Build Android APK
npm run tauri:android:build
```

The compiled `.apk` will be in:
`src-tauri/gen/android/app/build/outputs/apk/release/app-release-unsigned.apk`

---

## 📦 Automated GitHub Releases (.github/workflows/release.yml)

Whenever you push a Git tag (e.g. `v4.8.0`), GitHub Actions will automatically:
1. Compile the native **Windows `.exe` / NSIS installer**.
2. Compile the **Web Site distribution bundle (`om-lifeos-web-dist.zip`)**.
3. Create a GitHub Release with direct download links for all binaries.

```bash
git tag v4.8.0
git push origin v4.8.0
```

---

## 🔒 Security & Sovereign Permissions

- **Local Storage**: Data never leaves your machine unless you explicitly export or peer-pair.
- **Microphone / Speech Engine**: Uses browser-native Web Speech API and Web Audio synthesis.
- **Alarms**: High-precision local web worker timer with continuous background ringtones.

---

## 📜 License
MIT License. Created with sovereign personal governance principles.
