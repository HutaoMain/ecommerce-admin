import { create } from "zustand";

interface AuthStore {
  user: string | null;
  setUser: (user: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: localStorage.getItem("groceryAdminUser") || null,
  setUser: (user) => {
    localStorage.setItem("groceryAdminUser", user);
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("groceryAdminUser");
    set({ user: null });
  },
}));

export default useAuthStore;
