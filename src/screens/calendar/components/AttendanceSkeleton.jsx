import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolate
} from "react-native-reanimated";

import { cardStyle } from "../../../utils/cardStyle";

const { width } = Dimensions.get("window");

const Shimmer = () => {

  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, {
        duration: 1200
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {

    return {
      transform: [
        {
          translateX: translateX.value
        }
      ]
    };

  });

  return (
    <View className="absolute inset-0 overflow-hidden">

      <Animated.View
        style={[
          {
            width: width * 0.6,
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.5)"
          },
          animatedStyle
        ]}
      />

    </View>
  );

};

const SkeletonBox = ({ className }) => {

  return (
    <View className={`bg-gray-200 overflow-hidden ${className}`}>
      <Shimmer />
    </View>
  );

};

const AttendanceSkeleton = () => {

  return (

    <View
      style={cardStyle}
      className="bg-white rounded-3xl mt-5 p-4 border border-gray-200"
    >

      {/* Header */}
      <View className="flex-row justify-between mb-4">
        <SkeletonBox className="w-28 h-5 rounded-lg" />
        <SkeletonBox className="w-20 h-5 rounded-full" />
      </View>

      {/* Mark In Out */}
      <View className="flex-row gap-3">

        <View className="flex-1">
          <SkeletonBox className="w-20 h-3 rounded mb-2" />
          <SkeletonBox className="h-14 rounded-xl" />
        </View>

        <View className="flex-1">
          <SkeletonBox className="w-20 h-3 rounded mb-2" />
          <SkeletonBox className="h-14 rounded-xl" />
        </View>

      </View>


      {/* Work Duration */}
      <View className="mt-4">
        <SkeletonBox className="w-24 h-3 rounded mb-2" />
        <SkeletonBox className="h-14 rounded-xl" />
      </View>


      {/* Leave */}
      <View className="mt-4">
        <SkeletonBox className="w-24 h-3 rounded mb-2" />
        <SkeletonBox className="h-14 rounded-xl" />
      </View>

    </View>

  );

};

export default AttendanceSkeleton;