/**
 * @format
 */

import './global.css';
import 'react-native-reanimated';

import React from "react";
import { AppRegistry, Text } from 'react-native';

import App from './App';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { name as appName } from './app.json';

import { store , persistor } from './src/redux/store';
import { Provider } from 'react-redux';

import { PersistGate } from "redux-persist/integration/react"
const Root = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <App />
      </PersistGate>



    </Provider>
  </SafeAreaProvider>
);

AppRegistry.registerComponent(appName, () => Root);