import React, { useEffect } from "react";
import { View } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolate
} from "react-native-reanimated";

const Shimmer = ({ style }) => {

  const translateX = useSharedValue(-150);

  useEffect(() => {

    translateX.value = withRepeat(
      withTiming(300, { duration: 1400 }),
      -1,
      false
    );

  }, []);

  const animatedStyle = useAnimatedStyle(() => {

    return {
      transform: [
        { translateX: translateX.value }
      ]
    };

  });

  return (

    <View
      style={style}
      className="overflow-hidden bg-gray-200"
    >

      <Animated.View
        style={[
          {
            width: "40%",
            height: "100%",
            backgroundColor: "#f1f5f9",
            position: "absolute"
          },
          animatedStyle
        ]}
      />

    </View>

  );

};


const CalendarSkeleton = () => {

  return (

    <View className="bg-white rounded-3xl mt-5 p-4">

      {/* Header */}

      <Shimmer
        style={{
          height: 20,
          width: 150,
          borderRadius: 6
        }}
      />

      {/* Week Days */}

      <View className="flex-row justify-between mt-4 mb-3">

        {[...Array(7)].map((_, i) => (
          <Shimmer
            key={i}
            style={{
              height: 12,
              width: 30,
              borderRadius: 4
            }}
          />
        ))}

      </View>


      {/* Dates Grid */}

      <View className="flex-row flex-wrap">

        {[...Array(35)].map((_, i) => (

          <View
            key={i}
            className="w-[14.28%] h-12 mb-2 p-1"
          >

            <Shimmer
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10
              }}
            />

          </View>

        ))}

      </View>

    </View>

  );
};

export default CalendarSkeleton;