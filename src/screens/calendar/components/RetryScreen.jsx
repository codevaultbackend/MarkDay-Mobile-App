import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import NetInfo from "@react-native-community/netinfo";

const RetryScreen = ({ onRetry, error }) => {

  const [isConnected, setIsConnected] = useState(true);
  const [hasRetried, setHasRetried] = useState(false);

 useEffect(() => {

const unsubscribe = NetInfo.addEventListener(state => {

const connected =
state.isConnected && state.isInternetReachable;

setIsConnected(connected);

// Auto retry only when internet comes back
if (connected && !hasRetried) {

setTimeout(() => {
onRetry?.();
}, 500);

setHasRetried(true);

}

// Reset when internet lost again
if (!connected) {
setHasRetried(false);
}

});

return () => unsubscribe();

}, [hasRetried]);



  return (
    <View className="flex-1 justify-center items-center px-6">

      {/* Icon */}
      <View className="bg-red-50 p-5 rounded-full mb-5">
        <Ionicons
          name="wifi-outline"
          size={42}
          color="#EF4444"
        />
      </View>

      {/* Title */}
      <Text
        className="text-lg font-semibold text-secondary"
        style={{ includeFontPadding: false }}
      >
        No Internet Connection
      </Text>

      {/* Description */}
      <Text
        className="text-sm text-gray-500 text-center mt-2 font-normal" 
        style={{ includeFontPadding: false }}
      >
        Please check your internet connection and try again.
        We'll automatically retry when you're back online.
      </Text>

      {/* Retry Button */}
      <TouchableOpacity
        onPress={onRetry}
        className="bg-accent px-8 py-3 rounded-2xl mt-6"
      >
        <Text
          className="text-white font-medium"
          style={{ includeFontPadding: false }}
        >
          Retry
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default RetryScreen;