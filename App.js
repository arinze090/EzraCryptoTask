import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import {ApolloProvider} from '@apollo/client';
import {Provider as ReduxStoreProvider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import client from './src/utils/graphql/apollo-client';
import store, {persistor} from './src/redux/store';

export default function App({}) {
  return (
    <ApolloProvider client={client}>
      <ReduxStoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </PersistGate>
      </ReduxStoreProvider>
    </ApolloProvider>
  );
}
