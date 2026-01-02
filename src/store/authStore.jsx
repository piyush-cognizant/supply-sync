import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
      user: null,

      getUser: () => get().user,
      login: (userData) => {
        set({ token: userData.token, isAuthenticated: true, user: userData });
      },
      logout: () => set({ token: null, isAuthenticated: false, user: null }),
    }),
    {
      name: "auth-store",
    }
  )
);

export default useAuthStore;
