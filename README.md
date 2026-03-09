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

\`\`\`
loyalty-app/
├── app/                        # Expo Router routes (thin re-exports only)
│   ├── _layout.tsx             # Root layout
│   ├── (auth)/                 # Auth group (login, register, forgot-password)
│   ├── (tabs)/                 # Tab group (home, rewards, wallet, referral, profile)
│   ├── notifications.tsx
│   └── reward-details.tsx
├── src/
│   ├── screens/                # All screen UI components (TypeScript strict)
│   ├── components/             # Reusable UI (Button, Card, Input, Badge, Header…)
│   ├── services/               # Business logic (auth, loyalty, rewards, wallet…)
│   ├── api/                    # Axios domain API files (authApi, rewardsApi…)
│   ├── store/                  # Zustand global store (useStore.ts)
│   ├── data/                   # Static/mock data (loyaltyData.ts)
│   └── styles/                 # Unistyles theme (theme.ts, unistyles.d.ts)
├── android/                    # Android native project
├── eas.json                    # EAS Build + Update profiles
└── app.json                    # Expo config with OTA update URL
\`\`\`

**Key principles:**
- **Strict separation of concerns** — screens only handle UI, all logic in `services/`
- **Easy backend switch** — change `BASE_URL` in `src/services/apiService.ts`
- **File-based routing** — each `app/` route file is a one-line re-export of a `src/screens/` component

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
