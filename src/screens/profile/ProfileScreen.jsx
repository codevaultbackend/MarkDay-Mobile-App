import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import { cardStyle } from "../../utils/cardStyle";
import { getAuth, removeAuth } from "../../utils/authStorage";

const ProfileScreen = ({ navigation }) => {

  const [user, setUser] = useState(null)

  useEffect(() => {

    const loadUser = async () => {

      const auth = await getAuth()
      setUser(auth?.user)

    }

    loadUser()

  }, [])


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

            <Ionicons
              name="chevron-back"
              size={24}
            />

          </TouchableOpacity>


          <Text
            className="text-lg font-semibold text-center flex-1"
            style={{
              includeFontPadding: false
            }}
          >
            Profile
          </Text>

          <View className="w-8" />

        </View>


        {/* Profile Card */}

        <View
          style={cardStyle}
          className="bg-white rounded-3xl p-5 mt-5 items-center border border-gray-200 min-h-[197px] flex-row items-center justify-center flex-col"
        >

          {/* Edit */}




          {/* Avatar */}

          <Image
            source={{
              uri: user?.profileImage ||
                "https://randomuser.me/api/portraits/men/32.jpg"
            }}
            className="w-[80px] h-[80px] rounded-full"
          />


          {/* Name */}

          <Text
            className="text-lg font-semibold mt-3"
            style={{
              includeFontPadding: false
            }}
          >
            {user?.name || "Thomas Singh"}
          </Text>


          {/* Role */}

          <Text
            className="text-sm text-gray-400 mt-1"
            style={{
              includeFontPadding: false
            }}
          >
            {user?.designation || "Digital Product Designer"}
          </Text>

        </View>



        {/* Menu Card */}

        <View
          style={cardStyle}
          className="bg-white rounded-3xl mt-5 border border-gray-200 "
        >

          {menuItems.map((item, index) => {

            return (

              <TouchableOpacity
              onPress={async()=>{
                 if(item.title=="Logout"){
                  await removeAuth()

                 }
                
              // await removeAuth ()
               
              }}
                key={index}
                className="flex-row items-center justify-between px-4 py-5 border-b border-gray-100 back"
              >

                <View className="flex-row items-center gap-3">

                  <Ionicons
                    name={item.icon}
                    size={20}
                    color="#374151"
                  />

                  <Text
                    className="text-md"
                    style={{
                      includeFontPadding: false
                    }}
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

            )

          })}

        </View>


      </ScrollView>

    </SafeAreaView>

  )

}

export default ProfileScreen