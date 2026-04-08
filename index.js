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

import { store } from './src/redux/store';
import { Provider } from 'react-redux';


const Root = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </SafeAreaProvider>
);

AppRegistry.registerComponent(appName, () => Root);