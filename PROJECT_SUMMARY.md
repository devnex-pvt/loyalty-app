# XYZ Rewards App – Project Summary & Task Tracker

## 📋 Project Overview

A mobile loyalty rewards application for **XYZ e-commerce platform** built with **React Native (Expo)** that allows users to view reward points, earn and redeem rewards, track transactions, and manage profiles. Business logic is strictly separated from UI components. The app has a **centralized API service** for easy backend integration.

**Deadline**: March 4, 2026 → March 11, 2026 (1 week)  
**Client**: DevNex  
**Started**: March 4, 2026

---

## 🏗️ Architecture

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
├── store/             # State management (Context + Reducer)
└── styles/            # Theme & Unistyles configuration
```

**Key Principles:**

- UI screens contain ZERO business logic — all delegated to services
- State management via Zustand
- Styling via NativeWind and Tailwind CSS
- Mock data simulates API responses — ready for backend swap via `apiService.js`
- All data branded for **XYZ e-commerce** platform

---

## 🔌 API Integration Guide

The `services/apiService.js` file contains a centralized API client. To connect to a real backend:

1. **Change `BASE_URL`** in `apiService.js` to your backend URL
2. **Each endpoint is documented** with method, path, and parameters
3. **Swap mock data** in service files with `apiService` calls

### Available API Modules:

| Module             | Endpoints                                                           |
| ------------------ | ------------------------------------------------------------------- |
| `authAPI`          | `login`, `register`, `forgotPassword`, `logout`                     |
| `profileAPI`       | `getProfile`, `updateProfile`                                       |
| `pointsAPI`        | `getBalance`, `getTransactions`, `getStats`, `getTierInfo`          |
| `rewardsAPI`       | `getRewards`, `getRewardById`, `getCategories`, `redeemReward`      |
| `referralsAPI`     | `getReferralInfo`, `getReferralHistory`, `getReferralStats`         |
| `notificationsAPI` | `getNotifications`, `markAsRead`, `markAllAsRead`, `getUnreadCount` |

### Example: Replacing Mock with API

```javascript
// BEFORE (mock data):
import { transactions } from "../data/loyaltyData";
export const getAllTransactions = () => transactions;

// AFTER (real API):
import { pointsAPI } from "./apiService";
export const getAllTransactions = async (token) => {
  return await pointsAPI.getTransactions("all", token);
};
```

---

## ✅ Task Status

### Authentication

| Task                          | Status  | File(s)                           |
| ----------------------------- | ------- | --------------------------------- |
| Login Screen (Email/Phone)    | ✅ Done | `screens/LoginScreen.js`          |
| Registration Screen           | ✅ Done | `screens/RegisterScreen.js`       |
| Password Recovery Screen      | ✅ Done | `screens/ForgotPasswordScreen.js` |
| Auth Service (business logic) | ✅ Done | `services/authService.js`         |

### Home / Dashboard

| Task                           | Status  | File(s)                 |
| ------------------------------ | ------- | ----------------------- |
| Points overview & tier display | ✅ Done | `screens/HomeScreen.js` |
| Recent activity feed           | ✅ Done | `screens/HomeScreen.js` |
| Rewards preview                | ✅ Done | `screens/HomeScreen.js` |
| Progress bar to next tier      | ✅ Done | `screens/HomeScreen.js` |

### Rewards

| Task                             | Status  | File(s)                          |
| -------------------------------- | ------- | -------------------------------- |
| Rewards catalog with images      | ✅ Done | `screens/RewardsScreen.js`       |
| Category filters                 | ✅ Done | `screens/RewardsScreen.js`       |
| Reward Details screen            | ✅ Done | `screens/RewardDetailsScreen.js` |
| Redeem action + confirmation     | ✅ Done | `screens/RewardDetailsScreen.js` |
| Rewards Service (business logic) | ✅ Done | `services/rewardsService.js`     |

### Points Wallet

| Task                             | Status  | File(s)                     |
| -------------------------------- | ------- | --------------------------- |
| Current balance display          | ✅ Done | `screens/WalletScreen.js`   |
| Transaction history with filters | ✅ Done | `screens/WalletScreen.js`   |
| Wallet Service (business logic)  | ✅ Done | `services/walletService.js` |

### Referral

| Task                              | Status  | File(s)                       |
| --------------------------------- | ------- | ----------------------------- |
| Referral code display & copy      | ✅ Done | `screens/ReferralScreen.js`   |
| Social sharing options            | ✅ Done | `screens/ReferralScreen.js`   |
| Referral stats tracking           | ✅ Done | `screens/ReferralScreen.js`   |
| Referral Service (business logic) | ✅ Done | `services/referralService.js` |

### Profile

| Task               | Status  | File(s)                    |
| ------------------ | ------- | -------------------------- |
| User info & avatar | ✅ Done | `screens/ProfileScreen.js` |
| Tier badge display | ✅ Done | `screens/ProfileScreen.js` |
| Stats grid         | ✅ Done | `screens/ProfileScreen.js` |
| Settings menu      | ✅ Done | `screens/ProfileScreen.js` |
| Logout             | ✅ Done | `screens/ProfileScreen.js` |

### Notifications

| Task                                     | Status  | File(s)                           |
| ---------------------------------------- | ------- | --------------------------------- |
| Notifications screen                     | ✅ Done | `screens/NotificationsScreen.js`  |
| Notification types (earn, redeem, promo) | ✅ Done | `screens/NotificationsScreen.js`  |
| Read/unread state management             | ✅ Done | `services/notificationService.js` |

### Navigation

| Task                                                   | Status  | File(s)                    |
| ------------------------------------------------------ | ------- | -------------------------- |
| Bottom tabs (Home, Rewards, Wallet, Referral, Profile) | ✅ Done | `navigation/BottomTabs.js` |
| Stack navigation for auth flow                         | ✅ Done | `App.js`                   |
| Stack navigation for Reward Details & Notifications    | ✅ Done | `navigation/BottomTabs.js` |

### Reusable Components

| Task                  | Status  | File(s)                        |
| --------------------- | ------- | ------------------------------ |
| Custom Button         | ✅ Done | `components/Button.js`         |
| Card component        | ✅ Done | `components/Card.js`           |
| Input field component | ✅ Done | `components/Input.js`          |
| Header component      | ✅ Done | `components/Header.js`         |
| Skeleton Loader       | ✅ Done | `components/SkeletonLoader.js` |
| Empty State           | ✅ Done | `components/EmptyState.js`     |
| Badge component       | ✅ Done | `components/Badge.js`          |

### Technical

| Task                       | Status  | File(s)                        |
| -------------------------- | ------- | ------------------------------ |
| Business logic separation  | ✅ Done | `services/*`                   |
| API service layer          | ✅ Done | `services/apiService.js`       |
| Theme system (NativeWind)  | ✅ Done | `global.css`                   |
| State management (Zustand) | ✅ Done | `store/useStore.js`            |
| Responsive design          | ✅ Done | All screens                    |
| Loading states             | ✅ Done | `components/SkeletonLoader.js` |
| Empty states               | ✅ Done | `components/EmptyState.js`     |
| Error handling             | ✅ Done | All screens                    |

---

## 📱 Screen Flow

```
Auth Flow:
  Login → Register → ForgotPassword

Main App (Bottom Tabs):
  Home ─────── (tap reward) ──→ RewardDetails
  ↓ (bell icon)
  Notifications

  Rewards ──── (tap reward) ──→ RewardDetails

  Wallet

  Referral

  Profile
```

---

## 🔧 Tech Stack

- **Framework**: React Native (Expo SDK 55)
- **Styling**: NativeWind and Tailwind CSS
- **State**: Zustand
- **Navigation**: @react-navigation (bottom-tabs + native-stack)
- **Icons**: @expo/vector-icons (Ionicons)
- **Storage**: expo-secure-store
- **API Client**: Axios (`apiService.js`)
