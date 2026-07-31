import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

import SplashScreen from "../screens/Splash/SplashScreen.jsx";

import { getAuth, onAuthChanged } from "../utils/authStorage";
import { syncProfile } from "../utils/profileSync";
import { shouldRefreshProfile } from "../utils/profileUtils";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // 🔐 Check Auth
  // const checkAuth = async () => {
  //   try {
  //     const { user } = await getAuth();

  //     console.log(user, "User====== ==");

  //     // ✅ Login hai to profile sync karo
  //     if (user) {
  //       await syncProfile();
  //     }

  //     setLoggedIn(!!user);
  //   } catch (error) {
  //     console.log("Auth Error:", error);
  //     setLoggedIn(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };




  const checkAuth = async () => {
    try {
      const { user } = await getAuth();

      if (user) {
        try {
          if (shouldRefreshProfile()) {
            await syncProfile();
          }
        } catch (e) {
          console.log("Profile sync failed:", e);
        }
      }

      setLoggedIn(!!user);
    } catch (error) {
      console.log("Auth Error:", error);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    // First check
    checkAuth();

    // Listen auth change
    const unsubscribe = onAuthChanged(checkAuth);

    // Cleanup
    return () => unsubscribe();

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {loading && (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
          />
        )}

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