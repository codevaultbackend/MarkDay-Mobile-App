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
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
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

          {/* Logo */}
          <View className="w-24 h-24 bg-accent rounded-3xl items-center justify-center shadow-lg">

            <Text className="text-white text-3xl font-bold">
              M
            </Text>

          </View>

          {/* App Name */}
          <Text className="text-2xl font-semibold text-secondary mt-5">
            MarkDay
          </Text>

          {/* Tagline */}
          <Text className="text-sm text-gray-500 mt-1 font-normal" style={{includeFontPadding:false}}>
            Smart Attendance System
          </Text>

        </Animated.View>

      </View>


      {/* Bottom Footer */}
      <View className="items-center mb-8">

        <Text className="text-xs text-gray-400 font-normal" style={{includeFontPadding:false}}>
          Powered by MarkDay
        </Text>

      </View>

    </SafeAreaView>
  );
};

export default SplashScreen;