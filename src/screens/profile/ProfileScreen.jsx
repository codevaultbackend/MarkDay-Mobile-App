import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import { cardStyle } from "../../utils/cardStyle";
import { getAuth, removeAuth } from "../../utils/authStorage";
import { useGetProfileQuery } from "../../redux/features/auth/authApi";

import RetryScreen from "../calendar/components/RetryScreen";

const ProfileScreen = ({ navigation }) => {

  const [user, setUser] = useState(null)
  const [imageError, setImageError] = useState(false)

  const empId = user?.empId


  /* ------------------------------- */
  /* Load Auth User */
  /* ------------------------------- */

  useEffect(() => {

    const loadUser = async () => {
      const auth = await getAuth()
      setUser(auth?.user)
    }

    loadUser()

  }, [])



  /* ------------------------------- */
  /* Profile API */
  /* ------------------------------- */

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch
  } = useGetProfileQuery(empId, {
    skip: !empId
  })


  const ApiLoading = isLoading || isFetching
  const ApiError = error



  /* ------------------------------- */
  /* Retry Handler */
  /* ------------------------------- */

  const handleRetry = () => {
    refetch()
  }



  /* ------------------------------- */
  /* Error Screen */
  /* ------------------------------- */

  if (ApiError) {

    return (

      <SafeAreaView className="flex-1 bg-primary">

        <RetryScreen
          onRetry={handleRetry}
          error={ApiError}
        />

      </SafeAreaView>

    )

  }



  /* ------------------------------- */
  /* Image Handler */
  /* ------------------------------- */

  const getImageUri = () => {

    if (!data?.photo) return null

    // Base64
    if (data.photo.startsWith("data:image")) {
      return data.photo
    }

    // URL
    if (data.photo.startsWith("http")) {
      return data.photo
    }

    return null

  }

  const imageUri = getImageUri()



  const menuItems = [
    {
      title: "Notifications",
      icon: "notifications-outline"
    },
    {
      title: "Terms & Conditions",
      icon: "document-text-outline"
    },
    {
      title: "Privacy Policy",
      icon: "shield-outline"
    },
    {
      title: "About Us",
      icon: "information-circle-outline"
    },
    {
      title: "Logout",
      icon: "log-out-outline"
    }
  ]


  return (

    <SafeAreaView
      className="flex-1 bg-primary px-5"
      edges={['top', 'left', 'right']}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >

        {/* Header */}

        <View className="flex-row items-center justify-between mt-4">

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-8"
          >
            <Ionicons name="chevron-back" size={24} />
          </TouchableOpacity>

          <Text
            className="text-lg font-semibold text-center flex-1"
            style={{ includeFontPadding: false }}
          >
            Profile
          </Text>

          <View className="w-8" />

        </View>



        {/* Profile Card */}

        <View
          style={cardStyle}
          className="bg-white rounded-3xl p-5 mt-5 items-center border border-gray-200 min-h-[197px]"
        >

          {/* Profile Image */}

          {ApiLoading ? (

            <View className="w-[80px] h-[80px] rounded-full bg-gray-200" />

          ) : !imageUri || imageError ? (

            <View className="w-[80px] h-[80px] rounded-full bg-gray-100 items-center justify-center border border-gray-200">

              <Ionicons
                name="person-outline"
                size={32}
                color="#9CA3AF"
              />

            </View>

          ) : (

            <Image
              source={{ uri: imageUri }}
              className="w-[80px] h-[80px] rounded-full"
              onError={() => setImageError(true)}
            />

          )}



          {/* Name */}

          {ApiLoading ? (

            <View className="mt-3 w-32 h-4 bg-gray-200 rounded" />

          ) : (

            <Text
              className="text-lg font-semibold mt-3"
              style={{ includeFontPadding: false }}
            >
              {data?.name || "Employee"}
            </Text>

          )}



          {/* Designation */}

          {ApiLoading ? (

            <View className="mt-2 w-24 h-3 bg-gray-200 rounded" />

          ) : (

            <Text
              className="text-sm text-gray-400 mt-1"
              style={{ includeFontPadding: false }}
            >
              {data?.designation || "Employee"}
            </Text>

          )}

        </View>



        {/* Menu Card */}

        <View
          style={cardStyle}
          className="bg-white rounded-3xl mt-5 border border-gray-200 "
        >

          {menuItems.map((item, index) => (

            <TouchableOpacity
              onPress={async () => {
                if (item.title === "Logout") {
                  await removeAuth()
                }
              }}
              key={index}
              className="flex-row items-center justify-between px-4 py-5 border-b border-gray-100"
            >

              <View className="flex-row items-center gap-3">

                <Ionicons
                  name={item.icon}
                  size={20}
                  color="#374151"
                />

                <Text
                  className="text-md"
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

    </SafeAreaView>

  )

}

export default ProfileScreen