# 🎖️ XYZ Loyalty Rewards App

A beautifully designed mobile loyalty rewards application built with **React Native (Expo)** to help users engage with the **XYZ e-commerce platform**. Users can view their reward points, earn and redeem rewards, track their wallet transactions, and share referrals.

The application follows a strict **Separation of Concerns (SoC)** approach, with business logic strictly separated from UI components and a centralized API service ready for backend integration.

## 📸 Core Features

- **Authentication Flow** — Secure Login, Registration, and Password Recovery.
- **Loyalty Points Dashboard** — View your total earned points, current tier status, recent activity feed, and progress bar to the next tier.
- **Rewards Catalog** — Browse rewards categorised by groups, check details, and safely redeem them.
- **Points Wallet** — Track your point balance and transaction history with handy sorting filters.
- **Referral Program** — Share your unique referral code instantly with tracking statistics.
- **User Profile** — Manage your user details, settings, and visualize your lifetime loyalty stats.
- **Real-Time Notifications** — Keep track of earned points, redeemed offers, and promotions.

## 🚀 Technical Highlights

| Technology                   | Usage                                                              |
| ---------------------------- | ------------------------------------------------------------------ |
| **React Native**             | Cross-platform mobile framework                                    |
| **Expo** (Managed)           | Development toolchain & runtime (SDK 55)                           |
| **JavaScript**               | Programming language                                               |
| **Zustand**                  | Global state management                                            |
| **React Navigation**         | Native Stack & Bottom Tabs                                         |
| **NativeWind & TailwindCSS** | Theme and styling utility framework                                |
| **Axios & API Service**      | Centralised network client bridging mock data to real backend APIs |
| **AsyncStorage**             | Persistent local state and caching storage                         |

## 🏗️ Project Architecture

```
src/
├── components/        # Reusable UI components (buttons, cards, inputs, loaders)
├── data/              # Static/mock data (XYZ-branded)
├── navigation/        # Navigation configuration (Bottom Tabs + Stack)
├── screens/           # Screen-level UI components (no business logic)
├── services/          # Business logic + API integration layer
│   ├── apiService.js  # ← Centralized API client (change BASE_URL to connect)
│   ├── authService.js
│   ├── loyaltyService.js
│   ├── notificationService.js
│   ├── referralService.js
│   ├── rewardsService.js
│   ├── storageService.js
│   └── walletService.js
├── store/             # State management (Zustand + Context)
└── styles/            # Theme configuration (global.css)
```

**Key Architectural Principles:**

- **Zero UI-Bound Logic**: Screens strictly dictate design patterns. Complex calculations and data fetching are pushed to `services/*`.
- **Easy Backend Switch**: Currently powered by mock responses via `apiService.js` that can be effortlessly swapped for a real API backend point.

## 🔌 API Integration Guide

The `services/apiService.js` file handles all network-layer communications.

1. **Change the `BASE_URL`** inside `apiService.js` to point to a production/staging backend server instead of mock responses.
2. The code base has established API Modules for easy extensibility:
   - `authAPI`, `profileAPI`, `pointsAPI`, `rewardsAPI`, `referralsAPI`, `notificationsAPI`.
3. Merely replace mock imports with API Service endpoints across all data layers.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`
- [Expo Go](https://expo.dev/client) app installed on your physical mobile device.

### Local Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/devnex-pvt/loyalty-app.git
   cd loyalty-app
   ```

2. **Install project dependencies:**

   ```bash
   npm install
   ```

3. **Inaugurate development server:**

   ```bash
   npx expo start -c
   ```

4. **Boot App**: Scan the generated QR code via the **Expo Go** application on your device.

## 🔑 Typical Test Credentials (If needed)

| Field        | Value         |
| ------------ | ------------- |
| **Username** | `testuser`    |
| **Password** | `password123` |

## 📜 License

This application forms a part of an educational, demonstrable piece of engineering and UI UX aesthetics created by DevNex.
