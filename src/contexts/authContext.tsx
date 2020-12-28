import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { useApolloClient } from '@apollo/client';

interface ISignIn {
  _id: string;
  token: string;
}

interface IAuthContext {
  signed: boolean;
  loading: boolean;
  isConnected: boolean;
  wallet: string | null;
  walletName: string | null;
  handleSetWallet(walletID: string, walletName: string): void;
  handleSignIn(user: ISignIn): Promise<void>;
  handleSignOut(): Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [signed, setSigned] = useState<boolean>(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const client = useApolloClient();

  const { isConnected } = useNetInfo();

  const loadStorageData = useCallback(async () => {
    const [
      storageToken,
      storageWallet,
      storageWalletName,
    ] = await AsyncStorage.multiGet([
      '@authToken',
      '@authWallet',
      '@authWalletName',
    ]);

    if (storageToken[1]) {
      setSigned(true);
    }

    if (storageWallet[1] && storageWalletName[1]) {
      setWallet(storageWallet[1]);
      setWalletName(storageWalletName[1]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadStorageData();
  }, []);

  const handleSignIn = useCallback(async (userLogin: ISignIn) => {
    setLoading(true);

    try {
      const { token } = userLogin;

      await AsyncStorage.setItem('@authToken', token);
      setSigned(true);

      setLoading(false);
    } catch (err) {
      handleSignOut();
      setLoading(false);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    await client.clearStore();
    await AsyncStorage.multiRemove([
      '@authWallet',
      '@authWalletName',
      '@authToken',
      '@authEmail',
      '@authPass',
    ]);
    setSigned(false);
    setWallet(null);
    setWalletName(null);
  }, []);

  const handleSetWallet = useCallback(
    async (walletID: string, walletName: string) => {
      await AsyncStorage.multiSet([
        ['@authWallet', walletID],
        ['@authWalletName', walletName],
      ]);
      setWallet(walletID);
      setWalletName(walletName);
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        signed,
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
