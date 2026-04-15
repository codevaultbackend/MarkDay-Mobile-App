import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Notification = () => {
  return (
  <SafeAreaView className="flex-1 bg-primary" edges={['top', 'right', 'left']}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FCF7ED"
      />
      <View className='flex-1 flex-col items-center justify-center'>

             <Text>Notification Screen</Text>
      </View>



    </SafeAreaView>
  )
}

export default Notification