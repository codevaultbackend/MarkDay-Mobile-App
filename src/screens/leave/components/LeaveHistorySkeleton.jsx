import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

/*
=====================================
Reusable Shimmer Component
=====================================
*/

const Shimmer = ({ width, height, style }) => {

  const translateX = useSharedValue(-100);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(100, { duration: 1000 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor: "#E5E7EB",
          overflow: "hidden",
          borderRadius: 6,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            width: "60%",
            height: "100%",
            backgroundColor: "#F3F4F6",
            position: "absolute",
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};



const LeaveHistorySkeleton = () => {

  return (
    <>

      {[1, 2, 3].map((i) => (

        <View
          key={i}
          className="bg-white rounded-3xl p-4 mt-4"
        >

          {/* Header */}

          <View className="flex-row justify-between">

            <Shimmer width={160} height={16} />

            <Shimmer
              width={80}
              height={24}
              style={{ borderRadius: 20 }}
            />

          </View>


          {/* Applied Date */}

          <Shimmer
            width={130}
            height={12}
            style={{ marginTop: 10 }}
          />


          {/* Dates Row */}

          <View className="flex-row justify-between mt-4">

            {[1, 2, 3].map((j) => (

              <View key={j}>

                <Shimmer
                  width={70}
                  height={12}
                />

                <Shimmer
                  width={60}
                  height={16}
                  style={{ marginTop: 6 }}
                />

              </View>

            ))}

          </View>

        </View>

      ))}

    </>
  )

}

export default LeaveHistorySkeleton