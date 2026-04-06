/**
 * @format
 */
import './global.css';
import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import App from './App';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { name as appName } from './app.json';


import { Text, TextInput } from "react-native";
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

const Root = () => (
    <SafeAreaProvider>
        <Provider store={store}>



            <App />
        </Provider>
    </SafeAreaProvider>

)

AppRegistry.registerComponent(appName, () => Root);
