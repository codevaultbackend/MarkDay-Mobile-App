


import React, { useEffect } from "react";
import { View, ScrollView, StatusBar, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "./Header";
import CheckGrid from "./CheckGrid";
import AttendanceCard from "./AttendanceCard";
import RecentActivity from "./RecentActivity";
import BottomTab from "./BottomTab";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import HomeStatusBanner from "./components/HomeStatusBanner";

import ShiftEndingBanner from './components/ShiftEndingBanner'
import { useSelector } from "react-redux";
import CheckInBanner from './components/CheckInBanner'
import CheckInSuccessBanner from './components/CheckInSuccessBanner'
const HomeScreen = ({ navigation }) => {
  const { getCurrentLocation } = useCurrentLocation();
  useEffect(() => {
    const init = async () => {
      //  Alert.alert("fetching location start (Home Screen)")
      const loc = await getCurrentLocation();
      console.log(loc, "")
      // Alert.alert("fetching location end (Home Screen)")
      if (loc) {
        console.log("location ready")
      }
    };

    init();
  }, []);
  const { checkInTime } = useSelector(
    state => state.todayAttendance
  )
  return (
    <SafeAreaView className="flex-1 bg-primary " edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCF7ED" />

      <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header />
          {!checkInTime && (
            <CheckInBanner navigation={navigation} />
          )}

          {/* {checkInTime && (
            <CheckInSuccessBanner />
          )} */}
          {
            checkInTime && <ShiftEndingBanner navigation={navigation} />
          }
          
          <CheckGrid />

          <AttendanceCard />

          <RecentActivity />

        </ScrollView>


      </View>
    </SafeAreaView>
  )
}

export default HomeScreen