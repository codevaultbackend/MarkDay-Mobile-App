import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import RootNavigator from './src/navigation/RootNavigator'
import CustomToastStack from './src/Toats/CustomToastStack'
import { useDispatch, useSelector } from 'react-redux'
// import "./src/config/TextDefaults";
import dayjs from "dayjs";
import { resetTodayAttendance } from './src/redux/slices/attendanceSlice'
const App = () => {

  const apiCache = useSelector((state) => state.api);

  const state = useSelector((state) => {
    console.log(state, "state")

  })

  const dispatch = useDispatch();
  const { today } = useSelector(
    state => state.todayAttendance
  );
  useEffect(() => {

    if (!today?.date) return;

    const todayDate = dayjs().format("M/D/YYYY");

    // अगर stored date future ya old ho
    if (today.date !== todayDate) {

      dispatch(resetTodayAttendance());

    }

  }, [])
  useEffect(() => {

    console.log("🧠 RTK QUERY CACHE:", apiCache);
  }, [apiCache]);

  return (
    <>
      <CustomToastStack />


      <RootNavigator />
    </>
  )
}

export default App