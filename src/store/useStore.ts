import { create } from "zustand";
import { getUnreadCount } from "../services/notificationService";
import { loadState, saveState } from "../services/storageService";

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone?: string;
  joinDate?: string;
  avatar?: null;
}

interface AppState {
  rewardPoints: number;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  unreadCount: number;
}

interface Store {
  state: AppState;
  initializeStore: () => Promise<void>;
  syncStateToStorage: () => void;
  login: (user: User) => void;
  logout: () => void;
  setRewardPoints: (points: number) => void;
  addPoints: (points: number) => void;
  spendPoints: (points: number) => void;
  setUnreadCount: (count: number) => void;
  markAllRead: () => void;
}

export const useStore = create<Store>((set, get) => ({
  state: {
    rewardPoints: 1280,
    user: null,
    isAuthenticated: false,
    isLoading: true,
    unreadCount: 0,
  },

  initializeStore: async () => {
    const saved = await loadState();
    const unreadCount = getUnreadCount();
    if (saved) {
      set((prev) => ({
        state: { ...prev.state, ...(saved as Partial<AppState>), isLoading: false, unreadCount },
      }));
    } else {
      set((prev) => ({
        state: { ...prev.state, isLoading: false, unreadCount },
      }));
    }
  },

  syncStateToStorage: () => {
    const { isLoading, ...stateToSave } = get().state;
    saveState(stateToSave);
  },

  login: (userData: User) => {
    set((prev) => ({
      state: { ...prev.state, user: userData, isAuthenticated: true },
    }));
    get().syncStateToStorage();
  },

  logout: () => {
    set((prev) => ({
      state: { ...prev.state, user: null, isAuthenticated: false, rewardPoints: 1280 },
    }));
    get().syncStateToStorage();
  },

  setRewardPoints: (points: number) => {
    set((prev) => ({
      state: { ...prev.state, rewardPoints: Math.max(0, points) },
    }));
    get().syncStateToStorage();
  },

  /** Add earned points to the balance */
  addPoints: (points: number) => {
    set((prev) => ({
      state: { ...prev.state, rewardPoints: prev.state.rewardPoints + points },
    }));
    get().syncStateToStorage();
  },

  /** Spend points — never goes below 0 */
  spendPoints: (points: number) => {
    set((prev) => ({
      state: {
        ...prev.state,
        rewardPoints: Math.max(0, prev.state.rewardPoints - points),
      },
    }));
    get().syncStateToStorage();
  },

  setUnreadCount: (count: number) => {
    set((prev) => ({
      state: { ...prev.state, unreadCount: count },
    }));
    get().syncStateToStorage();
  },

  markAllRead: () => {
    set((prev) => ({
      state: { ...prev.state, unreadCount: 0 },
    }));
    get().syncStateToStorage();
  },
}));
