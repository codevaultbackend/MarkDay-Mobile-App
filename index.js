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
 
const Root = () => (
 <SafeAreaProvider>
 <App/>

 </SafeAreaProvider>
   
)

AppRegistry.registerComponent(appName, () => Root);
