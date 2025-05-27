# Career Booster

A React Native mobile application for career development, CV generation, and course recommendations.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd career-booster
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install Expo CLI globally (if not already installed):
```bash
npm install -g expo-cli
```

## Running the App

1. Start the development server:
```bash
npm start
# or
yarn start
```

2. Run on specific platform:
- Press `a` to run on Android emulator
- Press `i` to run on iOS simulator (macOS only)
- Scan QR code with Expo Go app on your physical device

## Features

- User Authentication (Login/Register)
- CV Generation
- CV ATS Compatibility Check
- Course Recommendations
- About Us Information

## Project Structure

```
career-booster/
├── screens/           # Screen components
├── styles.js         # Global styles
├── App.js           # Main application component
└── package.json     # Project dependencies
```

## API Endpoints

The app uses the following API endpoints:

- Authentication:
  - POST `/api/auth/login`
  - POST `/api/auth/register`

- CV Management:
  - POST `/api/cv/generate`
  - POST `/api/cv/validate`

- Courses:
  - GET `/api/courses/recommendations`

## Development

1. Make sure your backend server is running on `http://localhost:8080`
2. For Android development, use `http://10.0.2.2:8080` as the API base URL
3. The app will automatically handle the correct API base URL based on the platform

## Troubleshooting

If you encounter any issues:

1. Clear npm cache:
```bash
npm cache clean --force
```

2. Delete node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

3. Reset Expo cache:
```bash
expo start -c
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 