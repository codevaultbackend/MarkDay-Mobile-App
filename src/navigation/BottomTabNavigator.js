import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeScreen from "../screens/home/HomeScreen";
import CalendarScreen from "../screens/calendar/CalendarScreen";
import LeaveScreen from "../screens/leave/LeaveScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import MainImage from './UserFocus.svg'
import FacialVerificationScreen from '../screens/facialVerification/FacialVerificationScreen'
const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, navigation }) => {
  return (
    <SafeAreaView edges={["bottom"]}>
      <View className="bg-white flex-row items-center justify-between px-4 py-2 border-t border-t-[1px] border-gray-100">

        {state.routes.map((route, index) => {

          const isFocused = state.index === index;

          const icons = {
            Home: "home",
            Calendar: "calendar",
            Leave: "file-text",
            Profile: "user",
          };

          const onPress = () => {
            navigation.navigate(route.name);
          };

          // CENTER BUTTON
          if (route.name === "Atendence") {
            const isCameraScreen = isFocused;

            return (
              <View key={route.key} className="items-center relative bottom-[32px] ">
                <TouchableOpacity
                  onPress={() => {

                    if (isCameraScreen) {

                      navigation.emit({
                        type: "take-photo"
                      });
                    } else {
                      navigation.navigate(route.name);
                    }
                  }}
                  className="bg-accent w-16 h-16 rounded-full items-center justify-center border-4 border-gray-50"
                >
                  {isCameraScreen ? (
                    // <Icon name="camera" size={26} color="white" />
                    <Icon name="aperture" color="white" size={30} />
                  ) : (
                    <MainImage style={{ width: 32, height: 32 }} />
                  )}
                </TouchableOpacity>
              </View>
            );
          }

          // NORMAL TABS
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              className="items-center flex-1"
            >
              <Icon
                name={icons[route.name]}
                size={22}
                color={isFocused ? "#A67C52" : "#94A3B8"}
              />

              <Text
              style={{includeFontPadding:false}}
                className={` font-medium text-xs mt-1 ${isFocused ? "text-accent" : "text-gray-400"
                  }`}
              >
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Atendence" component={FacialVerificationScreen} />
      <Tab.Screen name="Leave" component={LeaveScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}