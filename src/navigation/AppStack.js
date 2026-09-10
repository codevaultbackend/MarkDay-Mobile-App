import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/home/HomeScreen";
import BottomTabNavigator from "./BottomTabNavigator.js";
import AttendanceSuccessScreen from "../screens/facialVerification/AttendanceSuccessScreen.jsx";

import Notification from "../screens/Notification/Notification.jsx";
import AboutUs from "../screens/AboutUs/AboutUs.jsx";
import PrivacyPolicy from "../screens/PrivacyPolicy/PrivacyPolicy.jsx";
import TermsAndCondition from "../screens/TermsAndCondition/TermsAndCondition.jsx";
const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Tabs"
        component={BottomTabNavigator}
      />
    
       
      <Stack.Screen
        name="attendance-mark-success"
        component={AttendanceSuccessScreen}
      />
        <Stack.Screen
        name="notification-screen"
        component={Notification}
      />
        <Stack.Screen
        name="privacy-policy-screen"
        component={PrivacyPolicy}
      />
        <Stack.Screen
        name="terms-and-condition-screen"
        component={TermsAndCondition}
      />
        <Stack.Screen
        name="about-us-screen"
        component={AboutUs}
      />

    </Stack.Navigator>
  );
}