import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { signIn } from '../services/auth';

interface IUser {
  email: string;
  password: string;
}

interface IAuthContext {
  signed: boolean;
  loading: boolean;
  isConnected: boolean;
  user: IUser | null;
  handleSignIn(): Promise<void>;
  handleSignOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const { isConnected } = useNetInfo();

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@authUser');
      const storageToken = await AsyncStorage.getItem('@authToken');

      await new Promise(resolve => setTimeout(resolve, 2000));

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signIn();
      setUser(response.user);

      await AsyncStorage.setItem('@authUser', JSON.stringify(response.user));
      await AsyncStorage.setItem('@authToken', response.token);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error(`Failed save asyncStorage - ${err}`);
    }
  };

  const handleSignOut = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        handleSignIn,
        handleSignOut,
        loading,
        isConnected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
