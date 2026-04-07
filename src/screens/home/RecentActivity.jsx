import React from "react";
import { View, Text } from "react-native";

const Item = () => {
  return (
    <View className="bg-white p-4 rounded-2xl shadow mb-3 flex-row items-center">

      <View className="bg-accent w-14 h-14 rounded-xl items-center justify-center mr-3">
        <Text className="text-white text-lg font-bold">
          22
        </Text>

        <Text className="text-white text-xs">
          Wed
        </Text>
      </View>

      <View className="flex-1">
        <Text className="font-semibold">
          Start Shift
        </Text>

        <Text className="text-xs text-gray-400 mt-1">
          Spaze IT Park, Gurgaon
        </Text>
      </View>

      <View>
        <Text className="font-semibold">
          09:58 AM
        </Text>

        <Text className="text-xs text-gray-400">
          Late
        </Text>
      </View>

    </View>
  );
};

const RecentActivity = () => {
  return (
    <View className="px-5 mt-5 mb-24">

      <Text className="text-lg font-semibold mb-3">
        Recent Activity
      </Text>

      <Item />
      <Item />

    </View>
  );
};

export default RecentActivity;