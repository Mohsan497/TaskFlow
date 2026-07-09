# TaskFlow

An offline-first, project-based task manager built with React Native, Expo SDK 54, TypeScript, and Expo Router. Features Material 3 design principles, glassmorphism accents, and full dark/light theme support.

## Tech Stack
- React Native + Expo SDK 54
- TypeScript (strict)
- Expo Router (file-based navigation, routes live in `src/app`)
- React Native Reanimated + Gesture Handler
- React Native SVG
- AsyncStorage (offline-first persistence)

## Folder Structure
```
taskflow/
├── src/
│   ├── app/              # Expo Router screens (routes)
│   ├── components/       # Reusable UI, task, project, dashboard components
│   ├── context/          # ThemeContext, DataContext (global state)
│   ├── hooks/             # useTasks, useProjects, useTheme
│   ├── services/          # AsyncStorage CRUD layer
│   ├── theme/              # Colors, typography, spacing tokens
│   ├── types/               # Shared TypeScript types
│   ├── utils/                 # Date helpers, validators
│   └── constants/              # Seed data, storage keys
├── assets/                        # Icon, splash, favicon
├── app.json
├── package.json
├── tsconfig.json
├── babel.config.js
└── metro.config.js
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Fix native dependency versions for your Expo SDK** (recommended, ensures exact compatible versions):
   ```bash
   npx expo install --fix
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. Scan the QR code with **Expo Go** on your phone, or press `a` for Android emulator / `i` for iOS simulator.

## Notes

- This project uses the `src/app` convention for Expo Router — routes are automatically picked up from `src/app` instead of a root-level `app` folder. No extra config needed on recent Expo Router versions.
- The app seeds itself with 3 sample projects (Sports, Cooking, Work) and a couple of sample tasks on first launch — all stored locally via AsyncStorage. Clear this anytime from **Settings → Clear all data**.
- Theme can be toggled between Light / Dark / System from the **Settings** tab.
- `app.json` includes placeholder icon/splash assets in `/assets` — swap these with your own branded artwork before publishing.

## Building for Android (Play Store)

```bash
npx expo prebuild
eas build --platform android
```
(Requires an [EAS](https://docs.expo.dev/eas/) account and `eas-cli` installed: `npm install -g eas-cli`)
