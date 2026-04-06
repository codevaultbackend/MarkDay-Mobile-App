import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

import SplashScreen from "../screens/Splash/SplashScreen.jsx";

import { getAuth, onAuthChanged } from "../utils/authStorage";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const checkAuth = async () => {
    const {user } = await getAuth();
 console.log(user ,"user")
    setLoggedIn(!!user);
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
    onAuthChanged(checkAuth);
  }, []);

  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* Splash */}
        {loading && (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
          />
        )}

        {/* Auth / App */}
        {!loading && (
          <Stack.Screen name="Main">
            {() =>
              loggedIn ? (
                <AppStack />
              ) : (
                <AuthStack />
              )
            }
          </Stack.Screen>
        )}

      </Stack.Navigator>

    </NavigationContainer>
  );
}