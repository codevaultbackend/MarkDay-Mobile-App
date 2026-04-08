


import React, { useEffect } from "react";
import { View, ScrollView, StatusBar, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "./Header";
import CheckGrid from "./CheckGrid";
import AttendanceCard from "./AttendanceCard";
import RecentActivity from "./RecentActivity";
import BottomTab from "./BottomTab";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";






const HomeScreen = () => {
  const { getCurrentLocation } = useCurrentLocation();
  useEffect(() => {
    const init = async () => {
      //  Alert.alert("fetching location start (Home Screen)")
      const loc = await getCurrentLocation();
       console.log(loc ,"")
    // Alert.alert("fetching location end (Home Screen)")
      if (loc) {
        console.log("location ready")
      }
    };

    init();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-primary " edges={['top', 'left', 'right']}>
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