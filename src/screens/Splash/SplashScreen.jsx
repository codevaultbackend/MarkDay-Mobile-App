import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  StatusBar,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = () => {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 60,
        useNativeDriver: true,
      }),

    ]).start();

  }, []);


  return (
    <SafeAreaView className="flex-1 bg-primary">

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FCF7ED"
      />

      <View className="flex-1 items-center justify-center">

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="items-center"
        >

          <Image
            source={require("../Splash/MarkdayLogo.png")}
            resizeMode="contain"
            className="w-80 h-80"
          />

         

        </Animated.View>

      </View>

      <View className="items-center mb-8">

        <Text
          className="text-xs text-gray-400 font-normal"
          style={{ includeFontPadding: false }}
        >
          Powered by AthraTech
        </Text>

      </View>

    </SafeAreaView>
  );
};

export default SplashScreen;