import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useMutation, gql } from '@apollo/client';
import { useNetInfo } from '@react-native-community/netinfo';

interface IAccountRegister {
  email: string;
  password: string;
  checkTerms: boolean;
}

interface ISignIn {
  login: {
    _id: string;
    token: string;
  };
}

interface IAuthContext {
  signed: boolean;
  loading: boolean;
  isConnected: boolean;
  user: string | null;
  wallet: string | null;
  walletName: string | null;
  handleSetWallet(walletID: string, walletName: string): void;
  handleSignUp(user: IAccountRegister): Promise<void>;
  handleSignIn(user: ISignIn): Promise<void>;
  handleSignOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [
    createUser,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_USER);

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

  const handleSignUp = async (userRegister: IAccountRegister) => {
    setLoading(true);

    try {
      const response = await createUser({
        variables: userRegister,
      });

      const { _id, token } =
        !mutationLoading && !mutationError && response?.data?.createUser;

      let userLogin = {
        login: {
          _id,
          token,
        },
      };

      await handleSignIn(userLogin);
    } catch (err) {
      console.error(err);
      handleSignOut();
      setLoading(false);
    }
  };

  const handleSignIn = async (userLogin: ISignIn) => {
    setLoading(true);

    try {
      const { _id, token } = userLogin?.login;

      setUser(_id);

      await AsyncStorage.setItem('@authUser', _id);
      await AsyncStorage.setItem('@authToken', token);

      setLoading(false);
    } catch (err) {
      console.error(err);
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
        handleSignUp,
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

const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $password: String!
    $checkTerms: Boolean!
  ) {
    createUser(
      input: { email: $email, password: $password, checkTerms: $checkTerms }
    ) {
      _id
      token
    }
  }
`;
