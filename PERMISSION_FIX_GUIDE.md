# 🔧 Permission & Path Error Fix

## Error: ENOENT: no such file or directory, mkdir '.expo\metro\externals\node:sea'

This is a Windows permission or Node.js compatibility issue.

## ⚡ QUICK FIX - Try These in Order:

### Fix 1: Run PowerShell as Administrator

1. **Right-click** on PowerShell
2. Select **"Run as administrator"**
3. Navigate to your project:
   ```powershell
   cd C:\Users\CEC\Documents\GitHub\CESLA_SYSTEM
   ```
4. Run these commands:
   ```powershell
   # Remove problematic folders
   Remove-Item -Recurse -Force .expo -ErrorAction SilentlyContinue
   Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
   
   # Clear caches
   npm cache clean --force
   
   # Reinstall
   npm install --legacy-peer-deps
   
   # Try starting
   npx expo start --tunnel
   ```

### Fix 2: Use Different Start Method (Tunnel Mode)

Instead of `npx expo start --clear`, use:

```powershell
# Tunnel mode (works around network issues)
npx expo start --tunnel

# Or offline mode
npx expo start --offline

# Or LAN mode
npx expo start --lan
```

### Fix 3: Update Node.js

Your Node.js might be too new or too old:

1. Check version: `node --version`
2. If not v20.x.x, download Node.js v20 LTS from: https://nodejs.org/
3. Install it
4. Restart PowerShell
5. Try again

### Fix 4: Use Different Project Location

The path might be too long or have permission issues:

```powershell
# Create project in simpler path
cd C:\
mkdir Projects
cd Projects

# Copy your project
xcopy /E /I C:\Users\CEC\Documents\GitHub\CESLA_SYSTEM C:\Projects\CESLA_SYSTEM

# Navigate to it
cd C:\Projects\CESLA_SYSTEM

# Clean install
Remove-Item -Recurse -Force node_modules
npm install --legacy-peer-deps

# Start
npx expo start
```

### Fix 5: Disable Antivirus Temporarily

Sometimes antivirus blocks folder creation:

1. Temporarily disable Windows Defender/Antivirus
2. Run the commands again
3. Re-enable after setup

### Fix 6: Fresh Install with Different Template

```powershell
cd C:\Users\CEC\Documents\GitHub

# Remove old folder
Remove-Item -Recurse -Force CESLA_SYSTEM

# Create with blank template (more stable)
npx create-expo-app@latest CESLA_SYSTEM --template blank

cd CESLA_SYSTEM

# Install navigation
npm install @react-navigation/native @react-navigation/stack --legacy-peer-deps

# Install Expo packages
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler expo-linear-gradient

# Copy your src folder from backup

# Start
npx expo start
```

## 🎯 Recommended Steps (In Order):

1. **First:** Try Fix 1 (Run as Administrator)
2. **Then:** Try Fix 2 (Use tunnel mode)
3. **Then:** Try Fix 4 (Different location)
4. **Last resort:** Fix 6 (Fresh install)

## 📋 Alternative: Use Expo Go Web Version

If nothing works, test on web first:

```powershell
# Start in web mode
npx expo start --web

# Or
npm run web
```

This will open in browser and you can test the UI there first.

## ✅ Expected Working Output:

```
Starting Metro Bundler
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go

› Press w │ open web
› Press a │ open Android
```

## 🔍 Check Your Environment:

```powershell
# Check Node version (should be 18.x or 20.x)
node --version

# Check npm version (should be 9.x or 10.x)
npm --version

# Check if running as admin
net session
# Should not show "Access is denied"
```

## 💡 Quick Test if Node.js is the Problem:

```powershell
# Try older stable Expo version
npm install expo@49.0.0 --save --legacy-peer-deps

# Then try starting
npx expo start
```

---

**Most Common Solution:** Run PowerShell as Administrator + use `--tunnel` flag
