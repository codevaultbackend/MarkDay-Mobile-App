import React from "react";
import { View, Text } from "react-native";

const AttendanceCard = () => {
  return (
    <View className="mx-5 bg-white p-4 rounded-2xl mt-3 shadow">

      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold">
          Attendance
        </Text>

        <View className="bg-gray-100 px-3 py-1 rounded-full">
          <Text className="text-xs">This Month</Text>
        </View>
      </View>

      {/* Progress Bar */}

      <View className="h-2 bg-gray-200 rounded-full mt-4 flex-row overflow-hidden">
        <View className="bg-green-500 w-[45%]" />
        <View className="bg-blue-400 w-[30%]" />
        <View className="bg-yellow-400 w-[15%]" />
      </View>

      <View className="flex-row justify-between mt-4">

        <View className="bg-gray-50 p-3 rounded-xl w-[30%]">
          <Text className="text-xs text-gray-400">
            Working Days
          </Text>

          <Text className="text-lg font-semibold mt-1">
            6
          </Text>
        </View>

        <View className="bg-gray-50 p-3 rounded-xl w-[30%]">
          <Text className="text-xs text-gray-400">
            Half Days
          </Text>

          <Text className="text-lg font-semibold mt-1">
            3
          </Text>
        </View>

        <View className="bg-gray-50 p-3 rounded-xl w-[30%]">
          <Text className="text-xs text-gray-400">
            Leaves
          </Text>

          <Text className="text-lg font-semibold mt-1">
            2
          </Text>
        </View>

      </View>

    </View>
  );
};

export default AttendanceCard;