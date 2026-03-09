# 🎖️ Loyalty Rewards App

A production-ready mobile loyalty rewards application built with **React Native (Expo SDK 55)** and **TypeScript strict**. Users can view reward points, earn and redeem rewards, track wallet transactions, manage referrals, and receive real-time notifications.

> **Internal distribution APK** is built via EAS Build (`preview-arm64` profile) and updates are pushed instantly via EAS Update (OTA) — no reinstall needed for JS/UI changes.

---

## 📸 Features

- **Authentication** — Login, Registration, Forgot Password with secure token storage (`expo-secure-store`)
- **Loyalty Dashboard** — Total points, tier status (Bronze → Silver → Gold → Platinum), progress bar, recent activity
- **Rewards Catalog** — Browse, filter, and redeem rewards by points cost
- **Points Wallet** — Transaction history with sorting and balance tracking
- **Referral Program** — Unique referral code with share & tracking stats
- **User Profile** — Account details, lifetime stats, settings
- **Notifications** — Real-time alerts for earned points, redeemed offers, promotions

---

## 🚀 Tech Stack

| Technology | Usage |
|---|---|
| **React Native + Expo SDK 55** | Cross-platform mobile framework |
| **TypeScript (strict)** | Type-safe codebase throughout |
| **Expo Router v4** | File-based routing (`app/` directory) |
| **Unistyles v3** | Theme system & styling (replaced NativeWind) |
| **Zustand v5** | Global state management |
| **Axios** | Centralised HTTP client with token handling |
| **expo-secure-store** | Secure token & credential storage |
| **expo-updates** | OTA (Over-The-Air) instant JS updates |
| **EAS Build** | Cloud APK/AAB builds with ABI splits |

---

## 🏗️ Project Architecture

```text
loyalty-app/
│
├── app/                              # 📍 Expo Router — file-based routing (thin re-exports only)
│   ├── _layout.tsx                   #    Root layout: loads fonts, initialises Unistyles & Zustand
│   ├── (auth)/                       #    Auth route group (unauthenticated users)
│   │   ├── _layout.tsx               #      Auth stack layout
│   │   ├── login.tsx                 #      → re-exports LoginScreen
│   │   ├── register.tsx              #      → re-exports RegisterScreen
│   │   └── forgot-password.tsx       #      → re-exports ForgotPasswordScreen
│   ├── (tabs)/                       #    Tab route group (authenticated users)
│   │   ├── _layout.tsx               #      Bottom tab navigator layout
│   │   ├── index.tsx                 #      → re-exports HomeScreen
│   │   ├── rewards.tsx               #      → re-exports RewardsScreen
│   │   ├── wallet.tsx                #      → re-exports WalletScreen
│   │   ├── referral.tsx              #      → re-exports ReferralScreen
│   │   └── profile.tsx               #      → re-exports ProfileScreen
│   ├── notifications.tsx             #    → re-exports NotificationsScreen
│   └── reward-details.tsx            #    → re-exports RewardDetailsScreen
│
├── src/
│   ├── screens/                      # 🖥️  All screen UI components (TypeScript strict)
│   │   ├── SplashScreen.tsx          #    App splash / loading screen
│   │   ├── LoginScreen.tsx           #    User login form
│   │   ├── RegisterScreen.tsx        #    User registration form
│   │   ├── ForgotPasswordScreen.tsx  #    Password recovery
│   │   ├── HomeScreen.tsx            #    Dashboard: points, tier, activity
│   │   ├── RewardsScreen.tsx         #    Rewards catalog with filter/redeem
│   │   ├── RewardDetailsScreen.tsx   #    Single reward detail & redeem CTA
│   │   ├── WalletScreen.tsx          #    Transaction history & balance
│   │   ├── ReferralScreen.tsx        #    Referral code, share, stats
│   │   ├── ProfileScreen.tsx         #    User profile & settings
│   │   └── NotificationsScreen.tsx   #    Notification feed
│   │
│   ├── components/                   # 🧩 Reusable UI primitives (Unistyles v3)
│   │   ├── Button.tsx                #    Themed button with variants
│   │   ├── Input.tsx                 #    Themed text input with validation state
│   │   ├── Card.tsx                  #    Rounded surface container
│   │   ├── Badge.tsx                 #    Chip/tag badge (tier, status)
│   │   ├── Header.tsx                #    Screen header with back/title
│   │   ├── EmptyState.tsx            #    Empty list placeholder with icon
│   │   └── SkeletonLoader.tsx        #    Animated loading skeleton
│   │
│   ├── services/                     # ⚙️  Business logic — no UI, no direct API calls
│   │   ├── apiService.ts             #    Axios instance, interceptors, token injection
│   │   ├── authService.ts            #    Login, register, logout, token refresh
│   │   ├── loyaltyService.ts         #    Points calculation, tier logic
│   │   ├── rewardsService.ts         #    Fetch, filter, and redeem rewards
│   │   ├── walletService.ts          #    Transaction fetch & balance helpers
│   │   ├── notificationService.ts    #    Notification fetch & mark-read
│   │   ├── referralService.ts        #    Referral code generation & stats
│   │   └── storageService.ts         #    expo-secure-store wrapper (all persistence)
│   │
│   ├── api/                          # 🌐 Axios domain API files (one file per resource)
│   │   ├── index.ts                  #    Barrel export for all API modules
│   │   ├── authApi.ts                #    /auth endpoints
│   │   ├── loyaltyApi.ts             #    /loyalty endpoints
│   │   ├── rewardsApi.ts             #    /rewards endpoints
│   │   ├── walletApi.ts              #    /wallet endpoints
│   │   ├── notificationsApi.ts       #    /notifications endpoints
│   │   └── referralApi.ts            #    /referral endpoints
│   │
│   ├── store/                        # 🗂️  Global state (Zustand v5)
│   │   └── useStore.ts               #    Single store: auth, points, user, notifications
│   │
│   ├── data/                         # 📊 Static & mock data
│   │   └── loyaltyData.ts            #    Typed mock responses (used until backend is live)
│   │
│   └── styles/                       # 🎨 Design system (Unistyles v3)
│       ├── theme.ts                  #    Colours, spacing, typography, breakpoints
│       └── unistyles.d.ts            #    Type augmentation for useStyles() auto-complete
│
├── android/                          # 🤖 Android native project (do not edit manually)
│   └── app/
│       ├── build.gradle              #    ABI splits, minify, resource shrinking
│       ├── proguard-rules.pro        #    Keep rules for RN, Expo, Unistyles, OkHttp
│       └── src/main/AndroidManifest.xml
│
├── assets/                           # 🖼️  Static assets (icons, splash)
├── eas.json                          # ☁️  EAS Build & Update profiles
├── app.json                          # ⚙️  Expo config (bundle ID, OTA update URL)
├── babel.config.js                   #    Babel: expo preset + Unistyles plugin
├── metro.config.js                   #    Metro: SVG + Unistyles resolver
└── tsconfig.json                     #    TypeScript strict mode
```

### Key Principles

| Principle | Detail |
|---|---|
| **Strict separation of concerns** | Screens handle UI only — all business logic lives in `src/services/` |
| **Thin route files** | Every file in `app/` is a single-line re-export of a `src/screens/` component |
| **Secure-first persistence** | `expo-secure-store` is used for **all** storage — no AsyncStorage, no plain localStorage |
| **Easy backend switch** | Set `BASE_URL` in `src/services/apiService.ts` — all domain API files update automatically |
| **OTA-first release** | JS/UI changes are shipped in ~2 min via `eas update`, no 2-hour rebuild required |
| **Minimal APK size** | ABI splits + ProGuard minify + resource shrinking keeps the arm64 APK to ~40–50 MB |

---

## 🔌 Connecting a Real Backend

1. Open `src/services/apiService.ts`
2. Change `BASE_URL` to your production/staging API endpoint
3. Domain API files in `src/api/` map directly to endpoints — replace mock responses with real calls
4. Run `eas update --branch production --message "connected backend" --environment production`

---

## 🛠️ Local Development

### Prerequisites
- Node.js v18+
- EAS CLI: `npm install -g eas-cli`
- Android device with Expo Dev Client installed (or Android emulator)

### Setup

\`\`\`bash
# Clone
git clone https://github.com/devnex-pvt/loyalty-app.git
cd loyalty-app

# Install dependencies
npm install

# Start dev server
npx expo start
\`\`\`

Scan the QR code with the **Expo Dev Client** app on your device.

### Test Credentials

| Field | Value |
|---|---|
| Email | `test@example.com` |
| Password | `password123` |

---

## 📦 Building & Releasing

### Internal APK (arm64, minimized ~40–50MB)
\`\`\`bash
eas build --platform android --profile preview-arm64
\`\`\`

### Push instant OTA update (no rebuild needed)
\`\`\`bash
eas update --branch production --message "your message" --environment production
\`\`\`

### Production AAB (Play Store)
\`\`\`bash
eas build --platform android --profile production
\`\`\`

### When do you need a new build vs OTA update?

| Change | Action |
|---|---|
| UI / screen / logic fix | `eas update` ✅ (~2 min) |
| New JS-only npm package | `eas update` ✅ (~2 min) |
| New native Expo module | `eas build` ⏳ (~1–2 hrs) |
| App icon / splash / permissions | `eas build` ⏳ (~1–2 hrs) |

---

## 📜 License

Built by **DevNex**. Internal use only.
