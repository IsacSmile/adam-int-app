declare module 'expo-router' {
  export const Stack: any;
  export const Tabs: any;
  export const Link: any;
  export const Slot: any;
  export const useRouter: () => any;
  export const useLocalSearchParams: <T extends Record<string, string | string[] | undefined> = Record<string, string | string[]>>() => T;
  export const useGlobalSearchParams: <T extends Record<string, string | string[] | undefined> = Record<string, string | string[]>>() => T;
  export const usePathname: () => string;
  export const useSegments: () => string[];
  export const useFocusEffect: (effect: () => void | (() => void)) => void;
  export const router: any;
  export const ExpoRoot: any;
  export const Unmatched: any;
  export const SplashScreen: any;
}
