import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const Notification = ({ navigation }) => {

  return (
    <SafeAreaView
      className="flex-1 bg-primary"
      edges={["top", "right", "left"]}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FCF7ED"
      />


      {/* Header */}

      <View className="flex-row items-center justify-between mt-4 px-5 mb-2">

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-8"
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color="#000000"
          />
        </TouchableOpacity>


        <Text
          className="text-lg font-semibold flex-1 text-center text-secondary"
          style={{ includeFontPadding: false }}
        >
          Notifications
        </Text>


        <View className="w-8" />

      </View>


      {/* Coming Soon */}

      <View className="flex-1 items-center justify-center px-5">

        <View className="bg-accent w-20 h-20 rounded-full items-center justify-center mb-5">

          <Ionicons
            name="notifications-outline"
            size={38}
            color="white"
          />

        </View>


        <Text
          className="text-2xl font-semibold text-secondary"
          style={{ includeFontPadding: false }}
        >
          Coming Soon
        </Text>


        <Text
          className="text-sm text-gray-400 text-center mt-2 font-normal"
          style={{ includeFontPadding: false }}
        >
          Notifications are coming soon.
        </Text>

      </View>

    </SafeAreaView>
  );

};

export default Notification;