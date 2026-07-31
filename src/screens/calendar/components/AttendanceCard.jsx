import React, { useMemo } from "react";
import { View, Text } from "react-native";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { cardStyle } from '../../../utils/cardStyle'
import AttendanceSkeleton from "./AttendanceSkeleton";
import Animated, {
  LinearTransition
} from "react-native-reanimated";
dayjs.extend(customParseFormat);

const AttendanceCard = ({
  attendance,
  leaves,
  selectedDate,
  type,
  holidays,
  hireDate,
  loading
}) => {

  // Work Duration
  const workDuration = useMemo(() => {

    if (!attendance?.inTime || !attendance?.outTime)
      return null;

    const inTime = dayjs(attendance.inTime, "hh:mm:ss A");
    const outTime = dayjs(attendance.outTime, "hh:mm:ss A");

    const diff = outTime.diff(inTime, "second");

    if (diff < 0) return "Invalid";

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);

    return `${hours}h ${minutes}m`;

  }, [attendance]);


  // Half Day
  // const isHalfDay = useMemo(() => {

  //   if (!attendance?.inTime || !attendance?.outTime)
  //     return false;

  //   const inTime = dayjs(attendance.inTime, "hh:mm:ss A");
  //   const outTime = dayjs(attendance.outTime, "hh:mm:ss A");

  //   const diff = outTime.diff(inTime, "hour", true);

  //   return diff > 0 && diff < 4;

  // }, [attendance]);


  // Leave
  const leaveStatus = useMemo(() => {

    if (!leaves?.leaves) return null;

    const leave = leaves.leaves.find(l => {

      const start = dayjs(l.startDate);
      const end = dayjs(l.endDate);
      const selected = dayjs(selectedDate);

      return (
        selected.isAfter(start.subtract(1, "day")) &&
        selected.isBefore(end.add(1, "day"))
      );

    });

    return leave?.status || null;

  }, [leaves, selectedDate]);


  // Holiday
  const holidayName = useMemo(() => {

    if (type !== "holiday") return null;

    const holiday = holidays?.find(
      h => dayjs(h.date).format("M/D/YYYY") === selectedDate
    );

    return holiday?.title;

  }, [type, holidays, selectedDate]);
  const isBeforeHire = useMemo(() => {
    if (!hireDate) return false;

    return dayjs(selectedDate).isBefore(dayjs(hireDate), "day");
  }, [selectedDate, hireDate]);
  if (loading) {
    return <AttendanceSkeleton />
  }
  return (

    <Animated.View
      layout={LinearTransition.springify()}
      style={cardStyle}
      className="bg-white rounded-3xl mt-5 p-4 border border-gray-200"
    >




      {/* Top Description */}

      {/* Status Description */}

      <View className="flex-row items-center justify-between">

        <Text
          className="text-lg font-semibold"
          style={{ includeFontPadding: false }}
        >
          Attendance
        </Text>

        {/* Status Badge */}

        {type === "absent" && !isBeforeHire && (
          <View className="bg-red-100 px-3 py-1 rounded-full">
            <Text
              className="text-red-600 text-xs font-medium"
              style={{ includeFontPadding: false }}
            >
              Absent
            </Text>
          </View>
        )}

        {type === "holiday" && (
          <View className="bg-blue-100 px-3 py-1 rounded-full">

            <Text
              className="text-blue-600 text-xs font-medium"
              style={{ includeFontPadding: false }}
              numberOfLines={1}
            >
              {holidayName || "Holiday"}

            </Text>

          </View>
        )}

        {type === "leave" && (

          <View
            className={`
px-3 py-1 rounded-full
${leaveStatus === "approved" && "bg-green-100"}
${leaveStatus === "pending" && "bg-yellow-100"}
${leaveStatus === "rejected" && "bg-red-100"}
`}
          >

            <Text
              className={`
text-xs font-medium capitalize
${leaveStatus === "approved" && "text-green-600"}
${leaveStatus === "pending" && "text-yellow-600"}
${leaveStatus === "rejected" && "text-red-600"}
`}
              style={{ includeFontPadding: false }}
            >

              {leaveStatus || "Leave"}

            </Text>

          </View>

        )}

      </View>


      {!isBeforeHire ? <>
        <View className="flex-row gap-3 mt-4">

          <View className="flex-1">
            <Text
              className="text-gray-400 text-xs font-medium"
              style={{ includeFontPadding: false }}
            >
              Mark-in
            </Text>

            <View className="bg-gray-100 rounded-xl p-4 mt-1">
              <Text
                className="text-md font-medium"
                style={{ includeFontPadding: false }}
              >
                {attendance?.inTime || "—"}
              </Text>
            </View>

          </View>


          <View className="flex-1">
            <Text
              className="text-gray-400 text-xs font-medium"
              style={{ includeFontPadding: false }}
            >
              Mark-out
            </Text>

            <View className="bg-gray-100 rounded-xl p-4 mt-1 font-medium">
              <Text
                className="text-md font-medium"
                style={{ includeFontPadding: false }}
              >
                {attendance?.outTime || "—"}
              </Text>
            </View>

          </View>

        </View>



        {/* Work Duration */}

        <View className="mt-4">

          <Text
            className="text-gray-400 text-xs font-medium"
            style={{ includeFontPadding: false }}
          >
            Work Duration
          </Text>

          <View className="bg-gray-100 rounded-xl p-4 mt-1">

            <View className="flex-row items-center justify-between">

              <Text
                className="text-md font-medium"
                style={{ includeFontPadding: false }}
              >
                {workDuration || "—"}
              </Text>

              {/* {isHalfDay && (
              <View className="bg-yellow-100 px-2 py-1 rounded-md">
                <Text
                  className="text-yellow-600 text-xs"
                  style={{ includeFontPadding: false }}
                >
                  Half Day
                </Text>
              </View>
            )} */}

            </View>

          </View>

        </View>



        {/* Leave */}

        <View className="mt-4">

          <Text
            className="text-gray-400 text-xs font-medium"
            style={{ includeFontPadding: false }}
          >
            Leave Type
          </Text>

          <View className="bg-gray-100 rounded-xl p-4 mt-1">

            <View className="flex-row justify-between items-center">

              <Text
                className={`
text-md capitalize font-medium
${leaveStatus === "approved" && "text-green-600"}
${leaveStatus === "pending" && "text-yellow-600"}
${leaveStatus === "rejected" && "text-red-600"}
`}
                style={{ includeFontPadding: false }}
              >
                {leaveStatus || "None"}
              </Text>

              {attendance?.inTime && leaveStatus && (
                <View className="bg-green-100 px-2 py-1 rounded-md">
                  <Text
                    className="text-green-600 text-xs font-medium"
                    style={{ includeFontPadding: false }}
                  >
                    Present
                  </Text>
                </View>
              )}

            </View>

          </View>

        </View>

      </> : <View className="items-center justify-center py-12">
        <Text
          className="text-gray-400 text-base"
          style={{ includeFontPadding: false }}
        >
          Employee had not joined yet.
        </Text>
      </View>}
      {/* Mark In / Out Row */}






    </Animated.View>

  );

};

export default AttendanceCard;