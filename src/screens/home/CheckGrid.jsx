import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { cardStyle } from "../../utils/cardStyle";

const Card = ({ icon, title, value, onPress }) => {

  const content = (
    <View
      className="bg-white w-full h-[72px] rounded-3xl mb-4 border border-gray-200 justify-center px-3"
      style={cardStyle}
    >
      <View className="flex-row items-center">

        <View className="bg-[#A67C52] w-10 h-10 rounded-full items-center justify-center">
          <Ionicons
            name={icon}
            size={18}
            color="white"
          />
        </View>

        <View className="ml-3 flex-1">

          <Text
            numberOfLines={1}
            className="text-xs text-gray-400 font-medium"
            style={{ includeFontPadding: false }}
          >
            {title}
          </Text>

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
            className="text-lg font-semibold"
            style={{ includeFontPadding: false }}
          >
            {value}
          </Text>

        </View>

      </View>
    </View>
  );


  if (onPress) {

    return (
      <Pressable
        className="w-[48%]"
        onPress={onPress}
        android_ripple={{ color: "#F3E8D8" }}
      >
        {content}
      </Pressable>
    );

  }


  return (
    <View className="w-[48%]">
      {content}
    </View>
  );

};


const CheckGrid = ({ leaves, navigation }) => {

  const {
    checkInTime,
    checkOutTime
  } = useSelector(state => state.todayAttendance);


  const [workDuration, setWorkDuration] =
    useState("00:00:00");


  // Work Duration Logic
  useEffect(() => {

    if (!checkInTime) {
      setWorkDuration("00:00 hrs");
      return;
    }


    const calculate = () => {

      const start = dayjs(
        checkInTime,
        ["h:mm:ss A", "h:mm A"]
      );

      const end = checkOutTime
        ? dayjs(
          checkOutTime,
          ["h:mm:ss A", "h:mm A"]
        )
        : dayjs();


      const diff = end.diff(
        start,
        "second"
      );


      if (diff < 0) {
        setWorkDuration("00:00:00");
        return;
      }


      const hours =
        Math.floor(diff / 3600);

      const minutes =
        Math.floor(
          (diff % 3600) / 60
        );

      const seconds =
        diff % 60;


      setWorkDuration(
        `${hours
          .toString()
          .padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );

    };


    calculate();


    if (!checkOutTime) {

      const interval =
        setInterval(
          calculate,
          1000
        );

      return () =>
        clearInterval(interval);
    }

  }, [
    checkInTime,
    checkOutTime
  ]);


  // Leave Data
  const totalLeave =
    (leaves?.paidLeave?.total ?? 0) +
    (leaves?.optionalLeave?.total ?? 0);

  const takenLeave =
    (leaves?.paidLeave?.used ?? 0) +
    (leaves?.optionalLeave?.used ?? 0);


  // Leave Navigation
  const handleLeavePress = () => {

    navigation.navigate("Leave");

  };


  return (

    <View className="px-5 mt-4 flex-row flex-wrap justify-between">

      <Card
        icon="arrow-down"
        title="Check In"
        value={checkInTime || "--:--"}
      />

      <Card
        icon="arrow-up"
        title="Check Out"
        value={checkOutTime || "--:--"}
      />

      <Card
        icon="time"
        title="Work Duration"
        value={
          checkInTime
            ? workDuration
            : "00:00:00"
        }
      />

      <Card
        icon="calendar"
        title="Leave"
        value={`${totalLeave} / ${takenLeave}`}
        onPress={handleLeavePress}
      />

    </View>

  );

};

export default CheckGrid;