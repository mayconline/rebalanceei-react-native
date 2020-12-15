import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import AsyncStorage from '@react-native-community/async-storage';
import { LOGIN } from '../pages/public/Login';

const httpLink = createHttpLink({
  uri: 'http://192.168.1.3:4000/',
  credentials: 'include',
});

const authErrorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(async ({ message, extensions }) => {
      if (message === 'Context creation failed: Token Invalid or Expired') {
        const [storageEmail, storagePass] = await AsyncStorage.multiGet([
          '@authEmail',
          '@authPass',
        ]);

        if (storageEmail[1] && storagePass[1]) {
          retryLogin(storageEmail[1], storagePass[1])
            .then(async res => {
              if (res.data) {
                const token = res?.data?.login?.token;

                await AsyncStorage.setItem('@authToken', token);

                // modify the operation context with a new token
                const oldHeaders = operation.getContext().headers;

                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${token}`,
                  },
                });

                // retry the request, returning the new observable
              }
            })
            .catch(async err => {
              await AsyncStorage.removeItem('@authToken');
            });
        } else {
          await AsyncStorage.removeItem('@authToken');
        }

        return forward(operation);
      }
    });
  }
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
  link: ApolloLink.from([authErrorLink, authLink, httpLink]),
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

function retryLogin(email: string, password: string) {
  return client.query({
    query: LOGIN,
    variables: {
      email,
      password,
    },
  });
}
