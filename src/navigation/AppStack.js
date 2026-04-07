import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/home/HomeScreen";
import BottomTabNavigator from "./BottomTabNavigator.js";
const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
 <Stack.Screen
        name="Tabs"
        component={BottomTabNavigator}
      />
      {/* <Stack.Screen
        name="Home"
        component={HomeScreen}
      /> */}

    </Stack.Navigator>
  );
}