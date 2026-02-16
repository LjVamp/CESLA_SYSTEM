# CESLA_SYSTEM - Insurance Cooperative Portal

Web and Mobile Application system for CLIMBS Life and General Insurance Cooperative

## Features
- Membership Portal (Member/Admin registration and login)
- Ordering System (Employee food ordering)

## Tech Stack
- React Native (Expo)
- MySQL Database
- React Navigation

## Setup Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git
- Expo Go app (for mobile testing)

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/LjVamp/CESLA_SYSTEM.git

# Navigate to project directory
cd CESLA_SYSTEM

# Install dependencies
npm install

# Start the development server
npm start
```

### 3. Running the App

**On Android:**
```bash
npm run android
```

**On iOS:**
```bash
npm run ios
```

**On Web:**
```bash
npm run web
```

**Using Expo Go:**
1. Install Expo Go app on your phone
2. Scan the QR code from the terminal
3. App will load on your phone

### 4. Building APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK
eas build -p android --profile preview
```

## Project Structure

```
CESLA_SYSTEM/
├── App.js                 # Main app component
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── src/
│   └── screens/
│       ├── HomeScreen.js       # Portal selection screen
│       ├── MembershipScreen.js # Membership portal
│       └── OrderingScreen.js   # Ordering system
└── assets/               # Images and icons
```

## Database Setup (MySQL)

Coming soon...

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Contact

Your Name - LjVamp
Project Link: https://github.com/LjVamp/CESLA_SYSTEM
