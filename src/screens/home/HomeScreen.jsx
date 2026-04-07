// import { View, Text } from 'react-native'
// import React from 'react'

// const  HomeScreen = () => {
//   return (
//     <View>
//       <Text> HomeScreen</Text>
//     </View>
//   )
// }

// export default  HomeScreen


import React from "react";
import { View, ScrollView, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "./Header";
 import CheckGrid from "./CheckGrid";
 import AttendanceCard from "./AttendanceCard";
  import RecentActivity from "./RecentActivity";
import BottomTab from "./BottomTab";
 

// const HomeScreen = () => {

  
//   return (
//     <SafeAreaView className="flex-1 bg-primary">
//       <StatusBar barStyle="dark-content" backgroundColor="#FCF7ED" />

//       <View className="flex-1">
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <Header />

//           <CheckGrid />

//           <AttendanceCard />

//           <RecentActivity />
//         </ScrollView>
 
//       </View>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

 

const HomeScreen = () => {
  return (
      <SafeAreaView className="flex-1 bg-primary " edges={['top' ,'left' ,'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCF7ED" />

      <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header />

          <CheckGrid />

          <AttendanceCard />

          <RecentActivity />
          
        </ScrollView>

        
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen