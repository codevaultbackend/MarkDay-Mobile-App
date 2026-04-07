import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const BottomTab = () => {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white py-3 flex-row justify-around items-center shadow-lg">

      <TouchableOpacity className="items-center">
        <Icon name="home" size={22} color="#A67C52" />
        <Text className="text-xs text-accent mt-1">
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center">
        <Icon name="calendar" size={22} />
        <Text className="text-xs mt-1">
          Calendar
        </Text>
      </TouchableOpacity>

      <View className="bg-accent w-16 h-16 rounded-full items-center justify-center -mt-10">
        <Icon name="camera" size={22} color="#fff" />
      </View>

      <TouchableOpacity className="items-center">
        <Icon name="file-text" size={22} />
        <Text className="text-xs mt-1">
          Leave
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center">
        <Icon name="user" size={22} />
        <Text className="text-xs mt-1">
          Profile
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default BottomTab;