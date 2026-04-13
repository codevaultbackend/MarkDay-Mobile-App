import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { cardStyle } from "../../utils/cardStyle";

const Card = ({ icon, title, value }) => {

  return (

    <View
      className="bg-white w-[48%] p-4 rounded-2xl mb-4 border border-gray-200"
      style={cardStyle}
    >

      <View className="flex-row items-center">

        <View className="bg-[#A67C52] w-10 h-10 rounded-full items-center justify-center">
          <Ionicons name={icon} size={18} color="white" />
        </View>

        <View className="ml-3">

          <Text
            className="text-xs text-gray-400"
            style={{ includeFontPadding: false }}
          >
            {title}
          </Text>

          <Text
            className="text-lg font-semibold"
            style={{ includeFontPadding: false }}
          >
            {value}
          </Text>

        </View>

      </View>

    </View>

  );

};


const CheckGrid = () => {

  const {
    checkInTime,
    checkOutTime,
    inLocation
  } = useSelector(state => state.todayAttendance);


  const [workDuration, setWorkDuration] = useState("00:00 hrs");


  // Work Duration Logic
  useEffect(() => {

    if (!checkInTime) return;


    // If checkout already done
    if (checkOutTime) {

      const start = dayjs(checkInTime, "h:mm A");
      const end = dayjs(checkOutTime, "h:mm A");

      const diff = end.diff(start, "minute");

      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;

      setWorkDuration(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")} hrs`
      );

      return;

    }


    // Live Timer
    const interval = setInterval(() => {

      const start = dayjs(checkInTime, "h:mm A");
      const now = dayjs();

      const diff = now.diff(start, "minute");

      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;

      setWorkDuration(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")} hrs`
      );

    }, 1000);


    return () => clearInterval(interval)

  }, [checkInTime, checkOutTime]);



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
        value={checkInTime ? workDuration : "00:00 hrs"}
      />

      <Card
        icon="location"
        title="Location"
        value={inLocation ? "Office" : "--"}
      />

    </View>

  );

};

export default CheckGrid;