import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/loginScreen/LoginScreen";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

    </Stack.Navigator>
  );
}