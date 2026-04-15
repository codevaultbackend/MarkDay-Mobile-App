import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/home/HomeScreen";
import BottomTabNavigator from "./BottomTabNavigator.js";
import AttendanceSuccessScreen from "../screens/facialVerification/AttendanceSuccessScreen.jsx";

import Notification from "../screens/Notification/Notification.jsx";
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

    </Stack.Navigator>
  );
}