import React from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const AboutUs = ({ navigation }) => {

  return (
    <SafeAreaView
      className="flex-1 bg-primary px-5"
      edges={["top", "left", "right"]}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FCF7ED"
      />

      {/* Header */}

      <View className="flex-row items-center justify-between mt-4">

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
          About Us
        </Text>

        <View className="w-8" />

      </View>


      {/* Content */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >

        {/* Intro */}

        <View className="bg-white rounded-3xl p-5 mt-6">

          <View className="items-center">

            <View className="bg-accent w-20 h-20 rounded-full items-center justify-center mb-4">

              <Ionicons
                name="calendar-outline"
                size={38}
                color="white"
              />

            </View>


            <Text
              className="text-2xl font-bold text-secondary"
              style={{ includeFontPadding: false }}
            >
              Mark Day
            </Text>


            <Text
              className="text-sm text-gray-400 text-center mt-2 font-normal"
              style={{ includeFontPadding: false }}
            >
              Smart Attendance & Leave Management
            </Text>

          </View>


          <Text
            className="text-md text-gray-500 leading-6 mt-5 font-normal"
            style={{ includeFontPadding: false }}
          >
            Mark Day is a smart attendance and leave management
            application designed to simplify everyday workforce
            activities. It enables employees to easily manage their
            attendance, leaves, and monthly attendance history from
            one convenient platform.
          </Text>

        </View>


        {/* Attendance */}

        <View className="bg-white rounded-3xl p-5 mt-4">

          <Text
            className="text-lg font-semibold text-secondary mb-4"
            style={{ includeFontPadding: false }}
          >
            Attendance Management
          </Text>


          {/* Check In */}

          <View className="flex-row items-center mb-4">

            <View className="bg-accent w-10 h-10 rounded-full items-center justify-center">

              <Ionicons
                name="log-in-outline"
                size={20}
                color="white"
              />

            </View>


            <View className="ml-3 flex-1">

              <Text
                className="text-sm font-semibold text-secondary"
                style={{ includeFontPadding: false }}
              >
                Check In & Check Out
              </Text>


              <Text
                className="text-xs text-gray-400 mt-1 font-normal"
                style={{ includeFontPadding: false }}
              >
                Employees can easily mark their daily check-in
                and check-out attendance.
              </Text>

            </View>

          </View>


          {/* Reminders */}

          <View className="flex-row items-center mb-4">

            <View className="bg-accent w-10 h-10 rounded-full items-center justify-center">

              <Ionicons
                name="notifications-outline"
                size={20}
                color="white"
              />

            </View>


            <View className="ml-3 flex-1">

              <Text
                className="text-sm font-semibold text-secondary"
                style={{ includeFontPadding: false }}
              >
                Smart Attendance Reminders
              </Text>


              <Text
                className="text-xs text-gray-400 mt-1 font-normal"
                style={{ includeFontPadding: false }}
              >
                If an employee has not checked in, a reminder
                can be shown on the Home screen. A shift-end
                reminder can also appear before the shift ends.
              </Text>

            </View>

          </View>


          {/* Work Duration */}

          <View className="flex-row items-center">

            <View className="bg-accent w-10 h-10 rounded-full items-center justify-center">

              <Ionicons
                name="time-outline"
                size={20}
                color="white"
              />

            </View>


            <View className="ml-3 flex-1">

              <Text
                className="text-sm font-semibold text-secondary"
                style={{ includeFontPadding: false }}
              >
                Work Duration
              </Text>


              <Text
                className="text-xs text-gray-400 mt-1 font-normal"
                style={{ includeFontPadding: false }}
              >
                Employees can track their working duration
                throughout the day.
              </Text>

            </View>

          </View>

        </View>


        {/* Leave Management */}

        <View className="bg-white rounded-3xl p-5 mt-4">

          <View className="flex-row items-center mb-3">

            <View className="bg-accent w-10 h-10 rounded-full items-center justify-center">

              <Ionicons
                name="calendar-clear-outline"
                size={20}
                color="white"
              />

            </View>


            <Text
              className="text-lg font-semibold text-secondary ml-3"
              style={{ includeFontPadding: false }}
            >
              Leave Management
            </Text>

          </View>


          <Text
            className="text-md text-gray-500 leading-6 font-normal"
            style={{ includeFontPadding: false }}
          >
            Employees can apply for leave, track leave requests,
            and view their leave history. Leave information such
            as total, used, and remaining leaves can also be
            accessed easily.
          </Text>

        </View>


        {/* Attendance Calendar */}

        <View className="bg-white rounded-3xl p-5 mt-4">

          <View className="flex-row items-center mb-3">

            <View className="bg-accent w-10 h-10 rounded-full items-center justify-center">

              <Ionicons
                name="grid-outline"
                size={20}
                color="white"
              />

            </View>


            <Text
              className="text-lg font-semibold text-secondary ml-3"
              style={{ includeFontPadding: false }}
            >
              Attendance Calendar
            </Text>

          </View>


          <Text
            className="text-md text-gray-500 leading-6 font-normal"
            style={{ includeFontPadding: false }}
          >
            Employees can view their monthly attendance based
            on the selected month. The calendar provides a clear
            view of Present, Absent, Leave, and Holiday days.
          </Text>

        </View>


        {/* Benefits */}

        <View className="bg-white rounded-3xl p-5 mt-4">

          <Text
            className="text-lg font-semibold text-secondary mb-4"
            style={{ includeFontPadding: false }}
          >
            Why Mark Day?
          </Text>


          {/* Benefit 1 */}

          <View className="flex-row items-center mb-3">

            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#A67C52"
            />

            <Text
              className="text-sm text-gray-500 ml-3 flex-1 font-normal"
              style={{ includeFontPadding: false }}
            >
              Simple and convenient attendance tracking
            </Text>

          </View>


          {/* Benefit 2 */}

          <View className="flex-row items-center mb-3">

            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#A67C52"
            />

            <Text
              className="text-sm text-gray-500 ml-3 flex-1 font-normal"
              style={{ includeFontPadding: false }}
            >
              Easy leave application and history tracking
            </Text>

          </View>


          {/* Benefit 3 */}

          <View className="flex-row items-center mb-3">

            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#A67C52"
            />

            <Text
              className="text-sm text-gray-500 ml-3 flex-1 font-normal"
              style={{ includeFontPadding: false }}
            >
              Clear monthly attendance insights
            </Text>

          </View>


          {/* Benefit 4 */}

          <View className="flex-row items-center">

            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#A67C52"
            />

            <Text
              className="text-sm text-gray-500 ml-3 flex-1 font-normal"
              style={{ includeFontPadding: false }}
            >
              Timely reminders for attendance activities
            </Text>

          </View>

        </View>


        {/* Footer */}

        <View className="items-center mt-8">

          <Text
            className="text-xs text-gray-400 font-normal"
            style={{ includeFontPadding: false }}
          >
            Mark Day
          </Text>


          <Text
            className="text-xs text-gray-400 mt-1 font-normal"
            style={{ includeFontPadding: false }}
          >
            Smart Attendance & Leave Management
          </Text>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

export default AboutUs;