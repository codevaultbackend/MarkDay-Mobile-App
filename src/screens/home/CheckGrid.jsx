import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const Card = ({ icon }) => {
  return (
    <View className="bg-white w-[48%] p-4 rounded-2xl shadow mb-4">

      <View className="bg-accent w-10 h-10 rounded-full items-center justify-center mb-2">
        <Icon name={icon} color="#fff" size={18} />
      </View>

      <Text className="text-lg font-semibold">
        07:58
      </Text>

      <Text className="text-gray-400 text-xs">
        Check In
      </Text>

    </View>
  );
};

const CheckGrid = () => {
  return (
    <View className="px-5 mt-5 flex-row flex-wrap justify-between">

      <Card icon="arrow-down-left" />
      <Card icon="arrow-up-right" />
      <Card icon="clock" />
      <Card icon="map-pin" />

    </View>
  );
};

export default CheckGrid;