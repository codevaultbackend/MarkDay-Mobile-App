import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  RefreshControl,
  Linking,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import { cardStyle } from "../../utils/cardStyle";
import { removeAuth } from "../../utils/authStorage";
import { syncProfile } from "../../utils/profileSync";

import LogoutModal from "../../components/LogoutModal.jsx";
import useUser from "../../hooks/useUser";

const ProfileScreen = ({ navigation }) => {
  /* ------------------------------- */
  /* User */
  /* ------------------------------- */

  const user = useUser();

  /* ------------------------------- */
  /* States */
  /* ------------------------------- */

  const [imageError, setImageError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  /* ------------------------------- */
  /* Pull To Refresh */
  /* ------------------------------- */

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      setLoading(true);

      await syncProfile();

      setImageError(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /* ------------------------------- */
  /* Image */
  /* ------------------------------- */

  const getImageUri = () => {
    if (!user?.photo) return null;

    if (user.photo.startsWith("data:image")) {
      return user.photo;
    }

    if (user.photo.startsWith("http")) {
      return user.photo;
    }

    return null;
  };

  const imageUri = getImageUri();

  /* ------------------------------- */
  /* Menu */
  /* ------------------------------- */

  const menuItems = [
    {
      title: "Notifications",
      icon: "notifications-outline",
    },
    // {
    //   title: "Terms & Conditions",
    //   icon: "document-text-outline",
    // },
    
    {
      title: "Privacy Policy",
      icon: "shield-outline",
    },
    {
      title: "About Us",
      icon: "information-circle-outline",
    },
    {
      title: "Logout",
      icon: "log-out-outline",
    },
  ];
  return (
    <>
      <SafeAreaView
        className="flex-1 bg-primary px-5"
        edges={["top", "left", "right"]}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FCF7ED"
        />
        <View className="flex-row items-center justify-between mt-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-8"
          >
            <Ionicons
              name="chevron-back"
              size={24}
            />
          </TouchableOpacity>

          <Text
            className="text-lg font-semibold text-center flex-1"
            style={{ includeFontPadding: false }}
          >
            Profile
          </Text>

          <View className="w-8" />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#F59E0B"]}
              tintColor="#F59E0B"
            />
          }
        >
          {/* Header */}



          {/* Profile Card */}

          <View
            style={cardStyle}
            className="bg-white rounded-3xl p-5 mt-5 border border-gray-200 min-h-[197px] items-center justify-center"
          >
            {/* Profile Image */}

            {loading ? (
              <View className="w-20 h-20 rounded-full bg-gray-200" />
            ) : !imageUri || imageError ? (
              <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center border border-gray-200">
                <Ionicons
                  name="person-outline"
                  size={32}
                  color="#9CA3AF"
                />
              </View>
            ) : (
              <Image
                source={{ uri: imageUri }}
                className="w-20 h-20 rounded-full"
                onError={() => setImageError(true)}
              />
            )}

            {/* Name */}

            {loading ? (
              <View className="mt-3 w-32 h-4 bg-gray-200 rounded" />
            ) : (
              <Text
                className="text-lg font-semibold mt-3 text-center"
                style={{ includeFontPadding: false }}
              >
                {user?.name || "Employee"}
              </Text>
            )}

            {/* Designation */}

            {loading ? (
              <View className="mt-2 w-24 h-3 bg-gray-200 rounded" />
            ) : (
              <Text
                className="text-sm text-gray-400 mt-1 font-normal text-center"
                style={{ includeFontPadding: false }}
              >
                {user?.designation || "Employee"}
              </Text>
            )}
          </View>

          {/* Menu Card */}

          <View
            style={cardStyle}
            className="bg-white rounded-3xl mt-5 border border-gray-200"
          >
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {

                  if (item.title === "Notifications") {
                    navigation.navigate("notification-screen");
                  }

                if (item.title === "Privacy Policy") {
  Linking.openURL(
    "https://markday.athratech.com/privacy-policy/"
  ).catch(() => {
    Alert.alert("Error", "Unable to open Privacy Policy.");
  });
}

                  // if (item.title === "Terms & Conditions") {
                  //   navigation.navigate("terms-and-condition-screen");
                  // }

                  if (item.title === "About Us") {
                    navigation.navigate("about-us-screen");
                  }

                  if (item.title === "Logout") {
                    setLogoutVisible(true);
                  }

                }}
                className="flex-row items-center justify-between px-4 py-5 border-b border-gray-100"
              >
                <View className="flex-row items-center gap-3">

                  <Ionicons
                    name={item.icon}
                    size={20}
                    color="#374151"
                  />

                  <Text
                    className="text-md font-normal"
                    style={{ includeFontPadding: false }}
                  >
                    {item.title}
                  </Text>

                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#9CA3AF"
                />

              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <LogoutModal
          visible={logoutVisible}
          onClose={() => setLogoutVisible(false)}
          onLogout={async () => {
            await removeAuth();
            setLogoutVisible(false);
          }}
        />
      </SafeAreaView>
    </>
  )
}
export default ProfileScreen