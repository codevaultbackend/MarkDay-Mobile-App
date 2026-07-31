import React, { useMemo, useEffect, useState } from "react";
import { View, Text } from "react-native";
import dayjs from "dayjs";

import {
  useGetAttendanceQuery,
  useGetLeavesQuery
} from "../../redux/features/attendance/attendanceApi";

import { getAuth } from "../../utils/authStorage";
import RecentActivitySkeleton from "./components/RecentActivitySkeleton";
import { cardStyle } from "../../utils/cardStyle";



/* ===============================
Today Card
=============================== */

const TodayCard = ({ item }) => (

  <View
    style={cardStyle}
    className="bg-white p-4 rounded-3xl mt-3 flex-row items-center border border-gray-200"
  >

    {/* Date Box */}

    <View className="bg-[#9A7354] w-14 h-14 rounded-2xl items-center justify-center mr-3">

      <Text className="text-white text-lg font-bold" style={{ includeFontPadding: false }}>
        {dayjs(item.date, "M/D/YYYY").format("DD")}
      </Text>

      <Text className="text-white text-xs font-normal" style={{ includeFontPadding: false }}>
        {dayjs(item.date, "M/D/YYYY").format("ddd")}
      </Text>

    </View>


    {/* Center Content */}

    <View className="flex-1">

      <Text className="font-semibold text-base" style={{ includeFontPadding: false }}>
        {item.title}
      </Text>

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="text-xs text-[#2D2D2D] mt-1 font-medium"
        style={{ includeFontPadding: false }}
      >
        {item.location}
      </Text>

    </View>


    {/* Right Side */}

    <View className="items-end">

      <Text className="font-semibold text-base text-secondary" style={{ includeFontPadding: false }}>
        {item.time}
      </Text>

      <Text
        style={{ includeFontPadding: false }}
        className={` font-normal text-xs font-normal mt-1 ${item.status === "Late"
          ? "text-red-400"
          : "text-gray-400"
          }`}
      >
        {item.status}
      </Text>

    </View>

  </View>

)



/* ===============================
Yesterday Card
=============================== */

const YesterdayCard = ({ item }) => (

  <View className="mt-3">

    <Text className="text-xs text-gray-400 mb-2 ml-2 font-normal" style={{ includeFontPadding: false }}>
      Yesterday
    </Text>

    <View
      style={cardStyle}
      className="bg-white p-4 rounded-3xl flex-row items-center border border-gray-200"
    >

      {/* Date Box */}

      <View className="bg-[#9A7354] w-14 h-14 rounded-2xl items-center justify-center mr-3">

        <Text className="text-white text-lg font-bold" style={{ includeFontPadding: false }}>
          {dayjs(item.date, "M/D/YYYY").format("DD")}
        </Text>

        <Text className="text-white text-xs font-normal" style={{ includeFontPadding: false }}>
          {dayjs(item.date, "M/D/YYYY").format("ddd")}
        </Text>

      </View>


      {/* Content */}

      <View className="flex-1">

        <Text className="font-semibold text-base text-secondary" style={{ includeFontPadding: false }}>
          {item.title}
        </Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-xs text-[#2D2D2D] mt-1 font-medium"
          style={{ includeFontPadding: false }}
        >
          {item.location}
        </Text>

      </View>


      {/* Right */}

      <View className="items-end">

        <Text className="font-semibold text-base text-secondary" style={{ includeFontPadding: false }}>
          {item.time}
        </Text>

        <Text className="text-xs text-gray-400 mt-1 font-normal" style={{ includeFontPadding: false }}>
          {item.status}
        </Text>

      </View>

    </View>

  </View>

)



/* ===============================
Leave Card
=============================== */

const LeaveCard = ({ item }) => (

  <View
    style={cardStyle}
    className="bg-white p-4 rounded-3xl mt-3 flex-row flex-start border border-gray-200"
  >

    {/* Date Box */}

    <View className="bg-[#9A7354] w-14 h-14 rounded-2xl items-center justify-center mr-3">

      <Text className="text-white text-lg font-bold" style={{ includeFontPadding: false }}>
        {dayjs(item.date, "M/D/YYYY").format("DD")}
      </Text>

      <Text className="text-white text-xs font-normal" style={{ includeFontPadding: false }}>
        {dayjs(item.date, "M/D/YYYY").format("ddd")}
      </Text>

    </View>


    {/* Center Content */}

    <View className="flex-1">

      <Text className="font-semibold text-base text-secondary" style={{ includeFontPadding: false }}>
        Leave Applied
      </Text>

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="text-xs text-[#2D2D2D] mt-1 font-medium "
        style={{ includeFontPadding: false }}
      >

      </Text>

    </View>


    {/* Right Side */}

    <View className="items-end ">

      <Text
        style={{ includeFontPadding: false }}
        className={`text-xs font-semibold mt-1 ${item.status === "pending"
          ? "text-yellow-500"
          : item.status === "approved"
            ? "text-green-500"
            : "text-red-500"
          }`}
      >
        {item.status}
      </Text>

    </View>

  </View>

)



/* ===============================
Main Component
=============================== */

const RecentActivity = ({
  attendance,
  leaves,
  loading
}) => {

  const [empId, setEmpId] = useState(null)

  useEffect(() => {

    const load = async () => {
      const auth = await getAuth()
      setEmpId(auth?.user?.empId)
    }

    load()

  }, [])

 





  const activities = useMemo(() => {

    let arr = []

    const today =
      dayjs().format("M/D/YYYY")

    const yesterday =
      dayjs()
        .subtract(1, "day")
        .format("M/D/YYYY")



    /* Attendance */

    attendance?.forEach(item => {

      if (item.inTime) {

        arr.push({
          date: item.date,
          title: "Start Shift",
          time:
            dayjs(
              item.inTime,
              "h:mm:ss A"
            ).format("hh:mm A"),

          status:
            dayjs(
              item.inTime,
              "h:mm:ss A"
            ).isAfter(
              dayjs("10:15 AM", "h:mm A")
            )
              ? "Late"
              : "On Time",

          location: item.inLocation
        })

      }


      if (item.outTime) {

        arr.push({
          date: item.date,
          title: "End Shift",
          time:
            dayjs(
              item.outTime,
              "h:mm:ss A"
            ).format("hh:mm A"),

          status: "Completed",
          location: item.outLocation
        })

      }

    })



    /* Latest Leave */

    const latestLeave =
      [...(leaves?.leaves || [])]
        .sort((a, b) =>
          dayjs(b.appliedAt) -
          dayjs(a.appliedAt)
        )[0]


    if (latestLeave) {

      arr.push({

        type: "leave",

        date:
          dayjs(
            latestLeave.appliedAt
          ).format("M/D/YYYY"),

        status:
          latestLeave.status,

        subtitle:
          `${dayjs(latestLeave.startDate)
            .format("DD MMM")} -
            ${dayjs(latestLeave.endDate)
            .format("DD MMM")}`

      })

    }


    return arr.filter(
      item =>
        item.date === today ||
        item.date === yesterday
    )


  }, [attendance, leaves])



  //   if (isLoading || leaveLoading) {
  //  return <View className="px-5"> 
  //      <RecentActivitySkeleton /> </View>
  //   }



  return (

    <View className="px-5 mt-5 mb-24">

      <Text className="text-lg font-semibold" style={{ includeFontPadding: false }}>
        Recent Activity
      </Text>


     {
  activities.length === 0 ? (

    <View
      style={cardStyle}
      className="bg-white p-6 rounded-3xl mt-3 items-center justify-center border border-gray-200"
    >
      <Text
        className="text-base font-semibold text-gray-700 font-medium"
        style={{ includeFontPadding: false }}
      >
        No Recent Activity
      </Text>

      <Text
        className="text-sm text-gray-400 mt-1 text-center font-normal"
        style={{ includeFontPadding: false }}
      >
        Your recent attendance or leave activity will appear here.
      </Text>
    </View>

  ) : (

    activities.map((item, index) => {

      const isToday =
        dayjs(item.date, "M/D/YYYY")
          .isSame(dayjs(), "day")

      const isYesterday =
        dayjs(item.date, "M/D/YYYY")
          .isSame(
            dayjs().subtract(1, "day"),
            "day"
          )

      if (item.type === "leave")
        return (
          <LeaveCard
            key={index}
            item={item}
          />
        )

      if (isYesterday)
    
        return (
          <YesterdayCard
            key={index}
            item={item}
          />
        )

      return (
        <TodayCard
          key={index}
          item={item}
        />
      )

    })

  )
}

    </View>

  )

}

export default RecentActivity
