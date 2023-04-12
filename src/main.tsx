import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client';
import DarkModeProvider from './contexts/DarkModeProvider';

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/',
  }),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DarkModeProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
