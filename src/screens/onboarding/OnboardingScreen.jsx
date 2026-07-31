import React, { useState, useRef } from "react";
import {
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

import Onboarding1 from "./Onboarding1";
import Onboarding2 from "./Onboarding2";
import Onboarding3 from "./Onboarding3";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const OnboardingScreen = ({ navigation }) => {
  const [page, setPage] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentPage = Math.round(offsetX / width);
    setPage(currentPage);
  };

  const onNext = () => {
    if (page < 2) {
      scrollRef.current?.scrollTo({
        x: (page + 1) * width,
        animated: true,
      });
    } else {

      navigation.navigate("Login");
    }
  };

  return (

    <>


      <SafeAreaView className="flex-1 bg-primary ">

        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FCF7ED"
          translucent={false}
        />


        <View className="flex-1">

          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
          >

            <View style={{ width }}>
              <Onboarding1 />
            </View>

            <View style={{ width }}>
              <Onboarding2 />
            </View>

            <View style={{ width }}>
              <Onboarding3 />
            </View>

          </ScrollView>

          {/* Pagination */}
          <View className="flex-row justify-center">

            {[0, 1, 2].map((i) => (
              <View
                key={i}
                className={`${page === i
                    ? "w-6 h-2 bg-accent"
                    : "w-2 h-2 bg-gray-300"
                  } rounded-full mx-1`}
              />
            ))}

          </View>

          {/* Button */}

         <View className="px-5 mb-[20px] mt-[40px] ">
  <TouchableOpacity
    onPress={onNext}
    style={{ width: isTablet ? 420 : "100%" }}
    className="bg-accent h-[56px] rounded-2xl items-center self-center flex-row justify-center"
  >
    <Text className="text-white font-medium text-[18px] mr-2 " style={{includeFontPadding:false}}>
      Next
    </Text>

    <Icon name="arrow-forward" size={22} color="#fff" top={1} />
  </TouchableOpacity>
</View>

        </View>

      </SafeAreaView>

    </>
  );
};

export default OnboardingScreen;