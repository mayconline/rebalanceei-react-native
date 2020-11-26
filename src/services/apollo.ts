import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-community/async-storage';

const httpLink = createHttpLink({
  uri: 'http://192.168.1.3:4000/',
  credentials: 'include',
});

const authLink = setContext(async (_, { headers }) => {
  const storageToken = await AsyncStorage.getItem('@authToken');

  return {
    headers: {
      ...headers,
      authorization: storageToken ? `Bearer ${storageToken}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getTicketsByWallet: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          getWalletByUser: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          getRentability: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          rebalances: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
