# 🚨 CRITICAL ERROR FIX - Expo CLI Corrupted

## Error: Cannot find module './utils/autoAddConfigPlugins.js'

This means your Expo CLI installation is corrupted. Here's how to fix it completely.

## ⚡ OPTION 1: Automated Fix (Recommended)

1. Download `complete-fix.bat`
2. Place in your CESLA_SYSTEM folder
3. Double-click to run
4. Wait 5-10 minutes
5. Done!

## 🔧 OPTION 2: Manual Fix (Step by Step)

Open PowerShell as Administrator in your project folder:

### Step 1: Kill All Node Processes
```powershell
# Stop all Node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

### Step 2: Complete Clean
```powershell
# Remove everything
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .expo -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .expo-shared -ErrorAction SilentlyContinue

# Clear npm cache
npm cache clean --force

# Clear global Expo cache
Remove-Item -Recurse -Force "$env:USERPROFILE\.expo" -ErrorAction SilentlyContinue
```

### Step 3: Reinstall Expo CLI Globally
```powershell
# Uninstall old Expo CLI
npm uninstall -g expo-cli

# Install fresh Expo CLI
npm install -g expo-cli@latest
```

### Step 4: Reinstall Project Dependencies
```powershell
# Install with legacy peer deps (fixes compatibility issues)
npm install --legacy-peer-deps
```

### Step 5: Install Expo Packages
```powershell
# Install required Expo packages
npx expo install expo-constants
npx expo install expo-linear-gradient
npx expo install react-native-reanimated
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-gesture-handler
```

### Step 6: Start Fresh
```powershell
# Start with cleared cache
npx expo start --clear
```

## 🎯 OPTION 3: Complete Fresh Start (If Above Fails)

If nothing works, start completely fresh:

```powershell
# 1. Backup your src folder
Copy-Item -Recurse src C:\Users\CEC\Desktop\src_backup

# 2. Go to parent folder
cd C:\Users\CEC\Documents\GitHub

# 3. Delete the broken project
Remove-Item -Recurse -Force CESLA_SYSTEM

# 4. Create fresh Expo project
npx create-expo-app@latest CESLA_SYSTEM --template blank

# 5. Navigate to project
cd CESLA_SYSTEM

# 6. Install navigation dependencies
npm install @react-navigation/native @react-navigation/stack

# 7. Install Expo packages
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-gesture-handler react-native-reanimated
npx expo install expo-linear-gradient expo-constants

# 8. Copy back your src folder
Copy-Item -Recurse C:\Users\CEC\Desktop\src_backup\* .\src\

# 9. Replace App.js with your custom one

# 10. Start
npx expo start
```

## 📋 What Caused This Error?

1. ❌ Incomplete npm install
2. ❌ Corrupted Expo CLI files
3. ❌ Version conflicts between packages
4. ❌ Corrupted node_modules

## ✅ Expected Result After Fix:

```
Starting Metro Bundler
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code with Expo Go
```

## 🔍 Verify Installation:

```powershell
# Check Expo CLI version
expo --version
# Should show: 52.x.x or higher

# Check if packages exist
npm list expo-constants
npm list react-native-reanimated

# Check Node version
node --version
# Should be: v18.x.x or v20.x.x

# Check npm version
npm --version
# Should be: 10.x.x or higher
```

## 🆘 Common Issues After Fix:

### Issue 1: "expo command not found"
```powershell
npm install -g expo-cli@latest
```

### Issue 2: "Cannot find module"
```powershell
npm install --legacy-peer-deps
```

### Issue 3: "Port already in use"
```powershell
npx kill-port 8081
npx expo start
```

### Issue 4: Metro bundler crashes
```powershell
npx expo start --clear --no-dev --minify
```

## 💡 Tips to Prevent This:

1. Always use `--legacy-peer-deps` when installing
2. Don't mix npm and yarn
3. Clear cache regularly
4. Keep Expo CLI updated
5. Use Node.js LTS version

## 📞 If Still Broken:

1. Update Node.js to latest LTS
2. Update npm: `npm install -g npm@latest`
3. Restart computer
4. Use Option 3 (Complete Fresh Start)

## ⏱️ Time Required:

- Option 1 (Automated): 5-10 minutes
- Option 2 (Manual): 10-15 minutes
- Option 3 (Fresh Start): 15-20 minutes

---

**Priority:** Use Option 1 (Automated) first!
**If fails:** Try Option 2 (Manual)
**Last resort:** Option 3 (Fresh Start)
