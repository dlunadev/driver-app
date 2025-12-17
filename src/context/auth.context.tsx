import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import axiosInstance from '@/src/axios/axios.config';

type addressType = {
  address: string;
  latitude: number;
  longitude: number;
};

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  state: {
    user_info: addressType;
    hotel_info: addressType;
  };
  updatePayload: (newData: {}) => void;
  clearLocation: () => void;
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [state, setState] = useState({
    user_info: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
    hotel_info: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
  });

  const [location, setLocation] = useState<null | {
    latitude: number;
    longitude: number;
  }>(null);

  const clearLocation = () => {
    setState({
      user_info: { address: '', latitude: 0, longitude: 0 },
      hotel_info: { address: '', latitude: 0, longitude: 0 },
    });
  };

  const updatePayload = (newData: Partial<typeof state>) => {
    setState((prevState) => ({
      ...prevState,
      ...newData,
    }));
  };

  const handleClearToken = async () => {
    try {
      await AsyncStorage.clear();

      setToken(null);
      setState({
        user_info: { address: '', latitude: 0, longitude: 0 },
        hotel_info: { address: '', latitude: 0, longitude: 0 },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error al limpiar datos:', error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const savedToken = await AsyncStorage.getItem('auth_token');
        if (!savedToken) return;

        const tokenData = JSON.parse(savedToken);
        if (!tokenData?.token || !tokenData?.refreshToken) {
          await handleClearToken();
          return;
        }

        try {
          await axiosInstance.get('/user/logged');
          setToken(savedToken);
        } catch {
          await handleClearToken();
        }
      } catch {
        await handleClearToken();
      }
    })();
  }, []);

  const handleSetToken = async (token: string) => {
    await AsyncStorage.setItem('auth_token', token);

    setToken(token);
  };

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = loc.coords;
        setLocation({ latitude, longitude });

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 10000,
            distanceInterval: 10,
          },
          (loc) => {
            const { latitude, longitude } = loc.coords;
            setLocation({ latitude, longitude });
          }
        );
      } else {
        // eslint-disable-next-line no-console
        console.warn('Permiso de ubicación denegado');
        setLocation(null);
        clearLocation();
      }
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: handleSetToken,
        clearToken: handleClearToken,
        state,
        updatePayload,
        location,
        clearLocation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
