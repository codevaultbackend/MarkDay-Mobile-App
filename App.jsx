import { View, Text } from 'react-native'
import React from 'react'
import RootNavigator from './src/navigation/RootNavigator'
import CustomToastStack from './src/Toats/CustomToastStack'
const App = () => {

  const defaultTextProps = {
    allowFontScaling: false,
    style: {
      includeFontPadding: false,
    },
  };

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps = {
    ...Text.defaultProps,
    ...defaultTextProps,
  };

  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps = {
    ...TextInput.defaultProps,
    ...defaultTextProps,
  };

  return (
    <>
      <CustomToastStack />
 
      <RootNavigator />
    </>
  )
}

export default App