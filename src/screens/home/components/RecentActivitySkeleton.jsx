import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming
} from "react-native-reanimated";


/*
=====================================
Reusable Shimmer
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
    transform: [{ translateX: translateX.value }]
  }));


  return (

    <View
      style={[
        {
          width,
          height,
          backgroundColor: "#E5E7EB",
          overflow: "hidden",
          borderRadius: 6
        },
        style
      ]}
    >

      <Animated.View
        style={[
          {
            width: "60%",
            height: "100%",
            backgroundColor: "#F3F4F6",
            position: "absolute"
          },
          animatedStyle
        ]}
      />

    </View>

  );

};



/*
=====================================
Recent Activity Skeleton
=====================================
*/

const RecentActivitySkeleton = () => {

  return (

    <>

      {[1, 2, 3, 4].map((i) => (

        <View
          key={i}
          className="bg-white p-4 rounded-2xl mt-3 flex-row items-center border border-gray-200 " 
        >

          {/* Date Box */}

          <Shimmer
            width={56}
            height={56}
            style={{ borderRadius: 12 }}
          />


          {/* Text Section */}

          <View className="flex-1 ml-3">

            <Shimmer width={140} height={14} />

            <Shimmer
              width={180}
              height={12}
              style={{ marginTop: 8 }}
            />

          </View>


          {/* Time Section */}

          <View>

            <Shimmer width={60} height={14} />

            <Shimmer
              width={40}
              height={10}
              style={{ marginTop: 6 }}
            />

          </View>

        </View>

      ))}

    </>

  );

};

export default RecentActivitySkeleton;