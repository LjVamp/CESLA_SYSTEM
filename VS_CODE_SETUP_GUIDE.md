# VS Code Setup Checklist for CESLA_SYSTEM

## ✅ Installation Checklist:

### Required Software:
- [ ] Node.js installed (check: `node --version`)
- [ ] npm installed (check: `npm --version`)
- [ ] Git installed (check: `git --version`)
- [ ] VS Code installed

### VS Code Extensions:
- [ ] ES7+ React/Redux/React-Native snippets
- [ ] React Native Tools
- [ ] Prettier - Code formatter
- [ ] ESLint
- [ ] Auto Rename Tag
- [ ] Path Intellisense
- [ ] Expo Tools

### Optional but Recommended:
- [ ] GitLens (Git visualization)
- [ ] Import Cost (shows package size)
- [ ] Color Highlight (highlights color codes)
- [ ] Material Icon Theme (better file icons)
- [ ] Bracket Pair Colorizer 2

## 📂 Project Files to Add:

1. Copy `.vscode/settings.json` to your project
2. Copy `.prettierrc` to your project
3. Copy `.eslintrc.json` to your project
4. Copy custom snippets (optional)

## 🔧 Configuration Steps:

### 1. Install ESLint & Prettier packages:
```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
```

### 2. VS Code User Settings:
- Press `Ctrl + ,` to open settings
- Search "Format On Save" → Enable it
- Search "Default Formatter" → Select Prettier

### 3. Terminal Setup:
- Press `Ctrl + `` to open terminal
- Should open inside your project folder
- Test: `npm start` should work

## 🎨 Customization (Optional):

### Theme:
- Press `Ctrl + K, Ctrl + T`
- Choose your favorite theme
- Recommended: "Dark+ (default dark)" or "One Dark Pro"

### Font:
- Install Fira Code font for ligatures
- Settings → Font Family → "Fira Code"
- Settings → Font Ligatures → Enable

## ⚡ Performance Optimization:

Add to `.vscode/settings.json`:
```json
{
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.expo/**": true,
    "**/.git/**": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/.expo": true
  }
}
```

## 🧪 Test Your Setup:

1. Open project in VS Code: `code .`
2. Open any .js file
3. Make a change and save → Should auto-format
4. Open terminal: `Ctrl + ``
5. Run: `npm start`
6. Should start without errors

## 🐛 Troubleshooting:

**If Prettier not working:**
- Restart VS Code
- Check if extension is enabled
- Check `.prettierrc` exists

**If ESLint not working:**
- Run: `npm install`
- Restart VS Code
- Check `.eslintrc.json` exists

**If terminal not opening:**
- Go to Settings → Terminal
- Set default profile to Command Prompt (Windows) or Bash (Mac/Linux)

**If IntelliSense not working:**
- Delete `node_modules` folder
- Run: `npm install`
- Restart VS Code

## 🎯 Shortcuts to Remember:

- `rnfc` → React Native Functional Component
- `rnscreen` → React Native Screen
- `rnstyle` → StyleSheet
- `Ctrl + Space` → Trigger IntelliSense
- `Ctrl + .` → Quick fix

## ✨ You're Ready!

Everything is configured! Now you can:
- Write code with auto-completion
- Format automatically on save
- Debug easily
- Navigate files quickly
- Work efficiently!

Happy Coding! 🚀
