import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-community/async-storage';

const httpLink = createHttpLink({
  uri: 'http://192.168.43.239:4000/',
  credentials: 'include',
});

const authLink = setContext(async (_, { headers }) => {
  const storageToken = await AsyncStorage.getItem('@authToken');

  return {
    headers: {
      ...headers,
      authorization: storageToken
        ? `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIwLjAzNTk2Mzg0NDAzMzkxNjI4IiwiaWF0IjoxNjAwODk3MjY0LCJleHAiOjE2MDA5ODM2NjR9.Gz12SMg1hNYOl2t9h25FmPSU3dMKIjcLAA4mq32AqYQ`
        : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
