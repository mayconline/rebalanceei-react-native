import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';

interface ISignIn {
  _id: string;
  token: string;
}

interface IAuthContext {
  signed: boolean;
  loading: boolean;
  isConnected: boolean;
  user: string | null;
  wallet: string | null;
  walletName: string | null;
  handleSetWallet(walletID: string, walletName: string): void;
  handleSignIn(user: ISignIn): Promise<void>;
  handleSignOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { isConnected } = useNetInfo();

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@authUser');
      const storageToken = await AsyncStorage.getItem('@authToken');
      const storageWallet = await AsyncStorage.getItem('@authWallet');
      const storageWalletName = await AsyncStorage.getItem('@authWalletName');

      if (storageUser && storageToken) {
        setUser(storageUser);
      }

      if (storageWallet && storageWalletName) {
        setWallet(storageWallet);
        setWalletName(storageWalletName);
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);

  const handleSignIn = async (userLogin: ISignIn) => {
    setLoading(true);

    try {
      const { _id, token } = userLogin;

      setUser(_id);

      await AsyncStorage.setItem('@authUser', _id);
      await AsyncStorage.setItem('@authToken', token);

      setLoading(false);
    } catch (err) {
      handleSignOut();
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await AsyncStorage.clear();
    setUser(null);
    setWallet(null);
    setWalletName(null);
  };

  const handleSetWallet = async (walletID: string, walletName: string) => {
    await AsyncStorage.setItem('@authWallet', walletID);
    await AsyncStorage.setItem('@authWalletName', walletName);
    setWallet(walletID);
    setWalletName(walletName);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        wallet,
        walletName,
        handleSetWallet,
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
