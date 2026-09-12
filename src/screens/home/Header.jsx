import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { getAuth } from "../../utils/authStorage";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

const Header = ({ loading, address }) => {
  const navigation = useNavigation();

  const todayDate = dayjs().format("ddd, DD MMM, YYYY");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const res = await getAuth();

      setUser(res?.user);
    };

    loadUser();
  }, []);

  const getGreeting = useCallback(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";

    return "Good Night";
  }, []);

  return (
    <View className="px-5 mt-2">

      {/* Top Row */}
      <View className="flex-row justify-between items-center">

        {/* User Info */}
        <View className="flex-1 mr-3 min-w-0">

          <Text
            className="text-sm text-[#717171] font-normal"
            style={{ includeFontPadding: false }}
          >
            {getGreeting()},
          </Text>

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-2xl font-medium text-secondary mt-1"
            style={{
              includeFontPadding: false,
              flexShrink: 1,
            }}
          >
            {user?.name || ""}
          </Text>

        </View>

        {/* Notification */}
        <TouchableOpacity
          className="bg-white p-3 rounded-full border border-gray-200"
          onPress={() => {
            navigation.navigate("notification-screen");
          }}
        >
          <Icon name="bell" size={20} color="#000" />
        </TouchableOpacity>

      </View>

      {/* Bottom Row */}
      <View className="flex-row justify-between items-center mt-3">

        <Text
          className="text-xs text-[#717171] font-normal"
          style={{ includeFontPadding: false }}
        >
          {todayDate}
        </Text>

        <View className="bg-accent px-4 py-2 rounded-full flex-1 ml-5">

          <View className="flex-row items-center">

            <Icon name="map-pin" size={12} color="#fff" />

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-xs ml-2 flex-1 font-normal"
              style={{
                includeFontPadding: false,
                flexShrink: 1,
              }}
            >
              {loading
                ? "Fetching address..."
                : address
                  ? address
                  : "Getting location..."}
            </Text>

          </View>

        </View>

      </View>

    </View>
  );
};

export default Header;