import React from 'react';
import ReactDOM from 'react-dom/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

import App from './App';
import './index.css';
import DarkModeProvider from './contexts/DarkModeProvider';

const authLink = setContext((_, { headers }) => {
  const user = JSON.parse(localStorage.getItem('current-user')!);

  return {
    headers: {
      ...headers,
      authorization: user ? `Bearer ${user.token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: () => {
      const user = JSON.parse(localStorage.getItem('current-user')!);
      return {
        authorization: user ? `Bearer ${user.token}` : null,
      };
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  ApolloLink.from([authLink, httpLink]),
);

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: splitLink,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DarkModeProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </DarkModeProvider>
  </React.StrictMode>,
);
