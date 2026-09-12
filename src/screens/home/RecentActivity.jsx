import React, { useMemo } from "react";
import { View, Text } from "react-native";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { cardStyle } from "../../utils/cardStyle";

dayjs.extend(customParseFormat);


/* ===============================
   Date Parser
================================ */

const parseDate = (date) => {
  if (!date) return null;

  // API format: 9/12/2026
  let parsed = dayjs(date, "M/D/YYYY", true);

  if (parsed.isValid()) {
    return parsed.startOf("day");
  }

  // Backup for normal ISO date
  parsed = dayjs(date);

  if (parsed.isValid()) {
    return parsed.startOf("day");
  }

  return null;
};


/* ===============================
   Time Parser
================================ */

const parseTime = (time) => {
  if (!time) return null;

  const formats = [
    "h:mm:ss A",
    "hh:mm:ss A",
    "h:mm A",
    "hh:mm A",
  ];

  for (const format of formats) {
    const parsed = dayjs(time, format, true);

    if (parsed.isValid()) {
      return parsed;
    }
  }

  return null;
};


/* ===============================
   Today Card
================================ */

const TodayCard = ({ item }) => {

  const date = parseDate(item.date);

  return (
    <View
      style={cardStyle}
      className="bg-white p-4 rounded-3xl mt-3 flex-row items-center border border-gray-200"
    >

      {/* Date Box */}

      <View className="bg-[#9A7354] w-14 h-14 rounded-2xl items-center justify-center mr-3">

        <Text
          className="text-white text-lg font-bold"
          style={{ includeFontPadding: false }}
        >
          {date ? date.format("DD") : "--"}
        </Text>

        <Text
          className="text-white text-xs font-normal"
          style={{ includeFontPadding: false }}
        >
          {date ? date.format("ddd") : "---"}
        </Text>

      </View>


      {/* Center Content */}

      <View className="flex-1">

        <Text
          className="font-semibold text-base"
          style={{ includeFontPadding: false }}
        >
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

        <Text
          className="font-semibold text-base text-secondary"
          style={{ includeFontPadding: false }}
        >
          {item.time}
        </Text>

        <Text
          style={{ includeFontPadding: false }}
          className={`text-xs mt-1 font-normal ${item.status === "Late"
              ? "text-red-400"
              : "text-gray-400"
            }`}
        >
          {item.status}
        </Text>

      </View>

    </View>
  );
};


/* ===============================
   Yesterday Card
================================ */

const YesterdayCard = ({ item }) => {

  const date = parseDate(item.date);

  return (
    <View className="mt-3">

      <View
        style={cardStyle}
        className="bg-white p-4 rounded-3xl flex-row items-center border border-gray-200"
      >

        {/* Date Box */}

        <View className="bg-[#9A7354] w-14 h-14 rounded-2xl items-center justify-center mr-3">

          <Text
            className="text-white text-lg font-bold"
            style={{ includeFontPadding: false }}
          >
            {date ? date.format("DD") : "--"}
          </Text>

          <Text
            className="text-white text-xs font-normal"
            style={{ includeFontPadding: false }}
          >
            {date ? date.format("ddd") : "---"}
          </Text>

        </View>


        {/* Content */}

        <View className="flex-1">

          <Text
            className="font-semibold text-base text-secondary"
            style={{ includeFontPadding: false }}
          >
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

          <Text
            className="font-semibold text-base text-secondary"
            style={{ includeFontPadding: false }}
          >
            {item.time}
          </Text>

          <Text
            className="text-xs text-gray-400 mt-1 font-normal"
            style={{ includeFontPadding: false }}
          >
            {item.status}
          </Text>

        </View>

      </View>

    </View>
  );
};


/* ===============================
   Leave Card
================================ */

const LeaveCard = ({ item }) => {

  const date = parseDate(item.date);

  return (
    <View
      style={cardStyle}
      className="bg-white p-4 rounded-3xl mt-3 flex-row flex-start border border-gray-200"
    >

      {/* Date Box */}

      <View className="bg-[#9A7354] w-14 h-14 rounded-2xl items-center justify-center mr-3">

        <Text
          className="text-white text-lg font-bold"
          style={{ includeFontPadding: false }}
        >
          {date ? date.format("DD") : "--"}
        </Text>

        <Text
          className="text-white text-xs font-normal"
          style={{ includeFontPadding: false }}
        >
          {date ? date.format("ddd") : "---"}
        </Text>

      </View>


      {/* Center Content */}

      <View className="flex-1">

        <Text
          className="font-semibold text-base text-secondary"
          style={{ includeFontPadding: false }}
        >
          Leave Applied
        </Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-xs text-[#2D2D2D] mt-1 font-medium"
          style={{ includeFontPadding: false }}
        >
        </Text>

      </View>


      {/* Right Side */}

      <View className="items-end">

        <Text
          style={{ includeFontPadding: false }}
          className={`text-xs font-semibold mt-1 ${item.status?.toLowerCase() === "pending"
              ? "text-yellow-500"
              : item.status?.toLowerCase() === "approved"
                ? "text-green-500"
                : "text-red-500"
            }`}
        >
          {item.status}
        </Text>

      </View>

    </View>
  );
};


/* ===============================
   Main Component
================================ */

const RecentActivity = ({
  attendance,
  leaves,
  loading,
}) => {


  /* ===============================
     Activities
  ================================ */

  const activities = useMemo(() => {

    const arr = [];

    const today = dayjs().startOf("day");

    const yesterday = dayjs()
      .subtract(1, "day")
      .startOf("day");


    /* ===============================
       Attendance
    ================================ */

    attendance?.forEach((item) => {

      const itemDate = parseDate(item?.date);

      if (!itemDate) return;


      /* ===============================
         Start Shift
      ================================ */

      if (item?.inTime) {

        const inTime = parseTime(item.inTime);

        if (inTime) {

          const lateTime = dayjs(
            "10:15 AM",
            "h:mm A",
            true
          );

          arr.push({
            type: "attendance",

            date: itemDate.format("M/D/YYYY"),

            title: "Start Shift",

            time: inTime.format("hh:mm A"),

            status: inTime.isAfter(lateTime)
              ? "Late"
              : "On Time",

            location: item?.inLocation || "",
          });

        }

      }


      /* ===============================
         End Shift
      ================================ */

      if (item?.outTime) {

        const outTime = parseTime(item.outTime);

        if (outTime) {

          arr.push({
            type: "attendance",

            date: itemDate.format("M/D/YYYY"),

            title: "End Shift",

            time: outTime.format("hh:mm A"),

            status: "Completed",

            location: item?.outLocation || "",
          });

        }

      }

    });


    /* ===============================
       Latest Leave
    ================================ */

    const latestLeave = [
      ...(leaves?.leaves || []),
    ]
      .filter((leave) => leave?.appliedAt)
      .sort(
        (a, b) =>
          new Date(b.appliedAt) -
          new Date(a.appliedAt)
      )[0];


    if (latestLeave) {

      const leaveDate = dayjs(
        latestLeave.appliedAt
      );

      if (leaveDate.isValid()) {

        arr.push({

          type: "leave",

          date: leaveDate.format("M/D/YYYY"),

          status: latestLeave.status,

          subtitle:
            `${dayjs(latestLeave.startDate).format(
              "DD MMM"
            )} - ${dayjs(latestLeave.endDate).format(
              "DD MMM"
            )}`,

        });

      }

    }


    /* ===============================
       ONLY TODAY + YESTERDAY
    ================================ */

    const filtered = arr.filter((item) => {

      const itemDate = parseDate(item?.date);

      if (!itemDate) return false;

      return (
        itemDate.isSame(today, "day") ||
        itemDate.isSame(yesterday, "day")
      );

    });


    /* ===============================
       Sort
       Yesterday First
       Today Second
    ================================ */

    return filtered.sort((a, b) => {

      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);

      if (!dateA || !dateB) return 0;

      return dateA.valueOf() - dateB.valueOf();

    });

  }, [attendance, leaves]);


  /* ===============================
     Render
  ================================ */

  return (

    <View className="px-5 mt-5 mb-24">

      <Text
        className="text-lg font-semibold"
        style={{ includeFontPadding: false }}
      >
        Recent Activity
      </Text>


      {activities.length === 0 ? (

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

          const itemDate = parseDate(item.date);

          if (!itemDate) return null;


          const today = dayjs().startOf("day");

          const yesterday = dayjs()
            .subtract(1, "day")
            .startOf("day");


          const isToday = itemDate.isSame(
            today,
            "day"
          );

          const isYesterday = itemDate.isSame(
            yesterday,
            "day"
          );


          /* ===============================
             Previous Activity
          ================================ */

          const previousItem =
            activities[index - 1];

          const previousDate =
            previousItem
              ? parseDate(previousItem.date)
              : null;


          /* ===============================
             Show Yesterday Heading
          ================================ */

          const showYesterdayHeading =
            isYesterday &&
            (
              index === 0 ||
              !previousDate?.isSame(
                yesterday,
                "day"
              )
            );


          /* ===============================
             Show Today Heading
          ================================ */

          const showTodayHeading =
            isToday &&
            (
              index === 0 ||
              !previousDate?.isSame(
                today,
                "day"
              )
            );


          return (

            <React.Fragment
              key={`${item.type}-${item.date}-${index}`}
            >

              {/* ===============================
                  Yesterday Heading
              ================================ */}

              {showYesterdayHeading && (

                <Text
                  className="text-xs text-gray-400   ml-2 mt-4 font-normal"
                  style={{
                    includeFontPadding: false,
                  }}
                >
                  Yesterday
                </Text>

              )}


              {/* ===============================
                  Today Heading
              ================================ */}

              {showTodayHeading && (

                <Text
                  className="text-xs text-gray-400   ml-2 mt-4 font-normal"
                  style={{
                    includeFontPadding: false,
                  }}
                >
                  Today
                </Text>

              )}


              {/* ===============================
                  Leave
              ================================ */}

              {item.type === "leave" ? (

                <LeaveCard
                  item={item}
                />

              ) : isYesterday ? (

                <YesterdayCard
                  item={item}
                />

              ) : (

                <TodayCard
                  item={item}
                />

              )}

            </React.Fragment>

          );

        })

      )}

    </View>

  );
};


export default RecentActivity;