import { create } from "zustand";

const useThemeStore = create((set) => ({
  isLightMode: true, // Initial theme state
  toggleTheme: () => set((state) => ({ isLightMode: !state.isLightMode })), // Toggling function
}));

export default useThemeStore;
