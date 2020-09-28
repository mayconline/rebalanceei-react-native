import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  SetStateAction,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useMutation, gql } from '@apollo/client';
import { useNetInfo } from '@react-native-community/netinfo';

interface IAccountRegister {
  email: string;
  password: string;
  active: boolean;
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
  handleSignUp(user: IAccountRegister): Promise<void>;
  handleSignIn(user: ISignIn): Promise<void>;
  handleSignOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
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

      if (storageUser && storageToken) {
        setUser(storageUser);
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const handleSignUp = async (userRegister: IAccountRegister) => {
    setLoading(true);

    try {
      const response = await createUser({
        variables: { ...userRegister, active: true, checkTerms: true },
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
      await AsyncStorage.clear();
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
      await AsyncStorage.clear();
      setLoading(false);
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
    $active: Boolean!
    $checkTerms: Boolean!
  ) {
    createUser(
      input: {
        email: $email
        password: $password
        active: $active
        checkTerms: $checkTerms
      }
    ) {
      _id
      token
    }
  }
`;
