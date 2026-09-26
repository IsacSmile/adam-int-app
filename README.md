# Edupath 🎓

Edupath is a modern, cross-platform mobile application designed to help students explore, compare, and plan their international higher education journey. Built with **React Native**, **Expo SDK 57**, **Expo Router**, and **NativeWind (Tailwind CSS)**.

---

## 📱 Features

- **🌍 Destination Countries**: Explore study abroad destinations, visa regulations, estimated living costs, post-study work rights, and popular fields of study.
- **🏛️ Universities Directory**: Browse world-class universities, campus locations, tuition estimates, and admission requirements.
- **📚 Academic Courses**: Search and filter undergraduate and postgraduate programs across diverse disciplines.
- **👤 Profile & Authentication**: User registration, personalized preferences, and essential support info (Contact, About, Privacy Policy).
- **✅ Data Validation Engine**: Automated TypeScript verification script validating schema integrity for countries, universities, and courses datasets.
- **🚀 EAS Cloud Build Ready**: Pre-configured Expo Application Services (EAS) setup for generating standalone Android `.apk` preview builds.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React Native](https://reactnative.dev/) `0.86.3` / [React](https://react.dev/) `19.2.3` |
| **Tooling** | [Expo SDK](https://expo.dev/) `~57.0.25` |
| **Navigation** | [Expo Router](https://docs.expo.dev/router/introduction/) `~57.0.23` (File-based routing) |
| **Styling** | [NativeWind](https://www.nativewind.dev/) `v4` & [Tailwind CSS](https://tailwindcss.com/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) `^5.0.15` |
| **Storage** | [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) `~6.0.3` |
| **Animations** | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) & [Moti](https://moti.fyi/) |
| **Build System** | [EAS Build](https://docs.expo.dev/build/introduction/) |

---

## 📁 Repository Structure

```text
adam-int-app/
├── edupath/
│   ├── app/                      # Expo Router screens & layouts
│   │   ├── (auth)/               # Authentication flow (Sign-up, etc.)
│   │   ├── (tabs)/               # Main bottom-tab navigation
│   │   │   ├── countries/        # Country listings & detailed views
│   │   │   ├── courses/          # Course catalog & course details
│   │   │   ├── universities/     # University directory & profiles
│   │   │   └── profile/          # User profile, About, Contact, Privacy
│   │   └── _layout.tsx           # Root navigation layout
│   ├── assets/                   # Images, icons, and fonts
│   ├── components/               # Reusable UI components (Card, Button, Header, etc.)
│   ├── data/                     # Local JSON datasets (countries, universities, courses)
│   ├── scripts/                  # Data validation and utility scripts
│   ├── store/                    # Zustand global state stores
│   ├── app.json                  # Expo project manifest & Android package configuration
│   ├── eas.json                  # EAS Build configuration (preview APK & production profiles)
│   ├── tailwind.config.js        # Tailwind CSS design tokens
│   ├── tsconfig.json             # TypeScript configuration
│   └── package.json              # Project dependencies and scripts
└── README.md                     # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher recommended (e.g. using `nvm`)
- **npm** or **yarn**
- **Expo Go** app installed on your physical device (Android / iOS) or an Android Emulator / iOS Simulator

### 1. Clone & Navigate

```bash
git clone git@github.com:IsacSmile/adam-int-app.git
cd adam-int-app/edupath
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npx expo start -c
```

Scan the displayed QR code with the **Expo Go** app (Android) or the default **Camera** app (iOS) to run the application immediately.

---

## 🧪 Available Scripts

Inside the `edupath` directory:

| Command | Description |
|---|---|
| `npm run start` | Starts the Expo development server. |
| `npm run android` | Starts the app in an Android emulator or connected device. |
| `npm run ios` | Starts the app in an iOS simulator (macOS required). |
| `npm run web` | Serves the web-compatible version in browser. |
| `npm run validate:data` | Runs schema & relationship validation on all JSON datasets. |
| `npx tsc --noEmit` | Runs TypeScript static type checking. |

---

## 📦 Building Standalone Android APK (EAS Build)

The project includes an `eas.json` profile pre-configured to output a directly installable `.apk` file for internal testing.

1. Install EAS CLI globally:
   ```bash
   npm install -g eas-cli
   ```

2. Log in to your Expo account:
   ```bash
   eas login
   ```

3. Trigger the preview APK build:
   ```bash
   eas build --profile preview --platform android
   ```

Once the cloud build finishes, EAS provides a QR code and direct download link for the `.apk`.

---

## 📄 License

This repository is maintained for the Edupath mobile application. All rights reserved.
