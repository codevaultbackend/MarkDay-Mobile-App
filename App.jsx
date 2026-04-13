import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import RootNavigator from './src/navigation/RootNavigator'
import CustomToastStack from './src/Toats/CustomToastStack'
import { useSelector } from 'react-redux'
// import "./src/config/TextDefaults";

const App = () => {

  const apiCache = useSelector((state) => state.api);
 
   const state = useSelector((state)=>{
     console.log(state ,"state")

   })


  useEffect(() => {
 
    console.log("🧠 RTK QUERY CACHE:", apiCache);
  }, [apiCache]);
  
  return (
   <>
   <CustomToastStack />
   

     <RootNavigator /> 
   </>
  )
}

export default App