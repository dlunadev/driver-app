import '@/global.css';
import 'react-native-reanimated';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useFonts } from 'expo-font';
import { getLocales } from 'expo-localization';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Sentry from 'sentry-expo';
import { SWRConfig } from 'swr';
import { Stack, useRouter, usePathname } from 'expo-router';
import { EXPO_SENTRY_URL_DEV } from '@/config';
import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider';
import { AuthProvider } from '@/src/context/auth.context';
import { DrawerProvider } from '@/src/context/drawer.context';
import { AuthRoutesLink } from '@/src/utils/enum/auth.routes';
import { userRoles } from '@/src/utils/enum/role.enum';
import { useMe } from '../hooks';
import { initializeI18next } from '../utils/i18n/i18next';

SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: EXPO_SENTRY_URL_DEV,
  enableInExpoDevelopment: true,
  debug: __DEV__,
});

export default function RootLayout() {
  const pathname = usePathname();
  const [token, setToken] = useState<{
    token: string;
    refreshToken: string;
  } | null>({
    token: '',
    refreshToken: '',
  });
  const { user, isLoading } = useMe();

  const [loaded] = useFonts({
    'Outfit-Black': require('../../assets/fonts/Outfit-Black.ttf'),
    'Outfit-Bold': require('../../assets/fonts/Outfit-Bold.ttf'),
    'Outfit-ExtraBold': require('../../assets/fonts/Outfit-ExtraBold.ttf'),
    'Outfit-ExtraLight': require('../../assets/fonts/Outfit-ExtraLight.ttf'),
    'Outfit-Light': require('../../assets/fonts/Outfit-Light.ttf'),
    'Outfit-Medium': require('../../assets/fonts/Outfit-Medium.ttf'),
    'Outfit-Regular': require('../../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Thin': require('../../assets/fonts/Outfit-Thin.ttf'),
    'Outfit-SemiBold': require('../../assets/fonts/Outfit-SemiBold.ttf'),
  });

  const [hasRedirected, setHasRedirected] = useState(false);
  const router = useRouter();

  const onboardingStep = user?.role === userRoles.USER_HOPPER ? 5 : 4;

  const publicRoutes = ['/', '/sign-up', '/sign-in', '/recovery-password', '/new-password'];

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('auth_token');

      if (!token && !publicRoutes.includes(pathname as AuthRoutesLink)) {
        if (!hasRedirected) {
          setHasRedirected(true);
          router.replace(AuthRoutesLink.SIGN_IN);
        }
        SplashScreen.hideAsync();
        return;
      }

      if (user) {
        if (!hasRedirected) {
          setHasRedirected(true);

          if (!user.isVerified && !user.isActive) {
            router.replace({
              pathname: AuthRoutesLink.SIGN_UP,
              params: { step: onboardingStep, user_type: user.role },
            });
          } else if (!user.isActive) {
            router.replace(AuthRoutesLink.WAITING_VALIDATION);
          } else {
            router.replace('/(tabs)/');
          }
        }

        SplashScreen.hideAsync();
        return;
      }

      SplashScreen.hideAsync();
    };

    if (loaded && !isLoading) {
      checkAuth();
    }
  }, [loaded, isLoading, user, hasRedirected, router]);

  useEffect(() => {
    const language = getLocales()[0].languageCode;

    const setupI18n = async () => {
      await initializeI18next(language ?? 'es');
    };

    const loadToken = async () => {
      const token = (await AsyncStorage.getItem('auth_token')) as string;
      setToken(JSON.parse(token) || null);
    };

    loadToken();
    setupI18n();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <SWRConfig
        value={{
          provider: () => new Map(),
          isVisible: () => {
            return true;
          },
          initFocus(callback) {
            let appState = AppState.currentState;

            const onAppStateChange = (nextAppState: AppStateStatus) => {
              if (appState.match(/inactive|background/) && nextAppState === 'active') {
                callback();
              }
              appState = nextAppState;
            };

            const subscription = AppState.addEventListener('change', onAppStateChange);

            return () => {
              subscription.remove();
            };
          },
          initReconnect(callback) {
            const unsubscribe = NetInfo.addEventListener((state) => {
              if (state.isConnected && state.isInternetReachable) {
                callback();
              }
            });

            return () => {
              unsubscribe();
            };
          },
        }}
      >
        <GestureHandlerRootView>
          <GluestackUIProvider mode="light">
            <DrawerProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                {Boolean(token?.token) ? (
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                ) : (
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                )}
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="error" />
              </Stack>
              <StatusBar style="auto" />
            </DrawerProvider>
          </GluestackUIProvider>
        </GestureHandlerRootView>
      </SWRConfig>
    </AuthProvider>
  );
}
