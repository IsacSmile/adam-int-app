import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserState {
  username: string;
  email: string;
  name: string;
  phone: string;
  qualification: string;
  age: string;
  isRegistered: boolean;
  setUser: (data: Partial<UserState>) => void;
  registerUser: () => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: '',
      email: '',
      name: '',
      phone: '',
      qualification: '',
      age: '',
      isRegistered: false,
      setUser: (data) => set((state) => ({ ...state, ...data })),
      registerUser: () => set({ isRegistered: true }),
      resetUser: () =>
        set({
          username: '',
          email: '',
          name: '',
          phone: '',
          qualification: '',
          age: '',
          isRegistered: false,
        }),
    }),
    {
      name: 'edupath-user',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
