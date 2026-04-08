import { View, Text } from 'react-native'
import React from 'react'
import RootNavigator from './src/navigation/RootNavigator'
import CustomToastStack from './src/Toats/CustomToastStack'
// import "./src/config/TextDefaults";
const App = () => {


  
  return (
   <>
   <CustomToastStack />
   

     <RootNavigator /> 
   </>
  )
}

export default App