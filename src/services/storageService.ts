/**
 * storageService.ts
 *
 * Uses expo-secure-store for all persistence (per boss requirement).
 *
 * ⚠️  SecureStore has a 2048-byte limit per key on iOS.
 *     To stay within the limit, each state field is stored under
 *     its own key ("loyalty_app_<field>") instead of one big JSON blob.
 *
 * Secure keys:
 *   loyalty_app_rewardPoints   — number (plain string, tiny)
 *   loyalty_app_isAuthenticated — boolean ("true"/"false", tiny)
 *   loyalty_app_unreadCount    — number (plain string, tiny)
 *   loyalty_app_user           — JSON object (name/email/id, well within 2048 B)
 */

import * as SecureStore from "expo-secure-store";

const PREFIX = "loyalty_app_";

// ─── Low-level helpers ────────────────────────────────────────────────────────

const secureSet = async (key: string, value: string): Promise<void> => {
  await SecureStore.setItemAsync(PREFIX + key, value);
};

const secureGet = async (key: string): Promise<string | null> => {
  return SecureStore.getItemAsync(PREFIX + key);
};

const secureDelete = async (key: string): Promise<void> => {
  await SecureStore.deleteItemAsync(PREFIX + key);
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Persist app state — each field stored under its own SecureStore key.
 * Only persists fields that are safe & small enough for SecureStore.
 */
export const saveState = async (state: object): Promise<boolean> => {
  try {
    const s = state as Record<string, unknown>;
    const writes: Promise<void>[] = [];

    if (s.rewardPoints !== undefined)
      writes.push(secureSet("rewardPoints", String(s.rewardPoints)));

    if (s.isAuthenticated !== undefined)
      writes.push(secureSet("isAuthenticated", String(s.isAuthenticated)));

    if (s.unreadCount !== undefined)
      writes.push(secureSet("unreadCount", String(s.unreadCount)));

    if (s.user !== undefined)
      writes.push(secureSet("user", JSON.stringify(s.user)));

    await Promise.all(writes);
    return true;
  } catch (e) {
    console.error("[storageService] Error saving state:", e);
    return false;
  }
};

/**
 * Load persisted state — reads each key individually and reassembles the object.
 */
export const loadState = async (): Promise<Record<string, unknown> | null> => {
  try {
    const [rewardPoints, isAuthenticated, unreadCount, user] = await Promise.all([
      secureGet("rewardPoints"),
      secureGet("isAuthenticated"),
      secureGet("unreadCount"),
      secureGet("user"),
    ]);

    // Nothing stored yet
    if (!rewardPoints && !isAuthenticated && !user) return null;

    return {
      rewardPoints: rewardPoints !== null ? Number(rewardPoints) : undefined,
      isAuthenticated: isAuthenticated !== null ? isAuthenticated === "true" : undefined,
      unreadCount: unreadCount !== null ? Number(unreadCount) : undefined,
      user: user !== null ? JSON.parse(user) : undefined,
    };
  } catch (e) {
    console.error("[storageService] Error loading state:", e);
    return null;
  }
};

/**
 * Clear all persisted state keys from SecureStore.
 */
export const clearStoredState = async (): Promise<boolean> => {
  try {
    await Promise.all([
      secureDelete("rewardPoints"),
      secureDelete("isAuthenticated"),
      secureDelete("unreadCount"),
      secureDelete("user"),
    ]);
    return true;
  } catch (e) {
    console.error("[storageService] Error clearing state:", e);
    return false;
  }
};

// ─── Auth token helpers (used by apiService.ts) ───────────────────────────────

export const saveAuthToken = async (token: string): Promise<void> => {
  await secureSet("auth_token", token);
};

export const loadAuthToken = async (): Promise<string | null> => {
  return secureGet("auth_token");
};

export const clearAuthToken = async (): Promise<void> => {
  await secureDelete("auth_token");
};
