import * as SecureStore from "expo-secure-store";

const STORAGE_KEY = "loyalty_app_state";

export const saveState = async (state: object): Promise<boolean> => {
  try {
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (e) {
    console.error("Error saving state", e);
    return false;
  }
};

export const loadState = async (): Promise<Record<string, unknown> | null> => {
  try {
    const jsonValue = await SecureStore.getItemAsync(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error loading state", e);
    return null;
  }
};

export const clearStoredState = async (): Promise<boolean> => {
  try {
    await SecureStore.deleteItemAsync(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error("Error clearing state", e);
    return false;
  }
};
