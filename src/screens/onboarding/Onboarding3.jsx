import React from "react";
import { View, Text, Dimensions, ScrollView, Image } from "react-native";

import Onboarding1Img from "../onboarding/images/onboarding3.webp";



const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const Onboarding3 = () => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
            }}
        >
            <View className="flex-1 items-center px-5 max-w-[520px]  flex-col justify-end ">

                {/* IMAGE */}
                {/* IMAGE */}
                <View className="mt-10   "
                    style={{
                        width: isTablet ? 420 : width * 0.85,
                        height: isTablet ? 420 : width * 0.85,
                    }}
                >
                    <Image
                        className="rounded-[32px]"
                        source={Onboarding1Img}
                        resizeMode="cover"
                        style={{
                            width: isTablet ? 420 : width * 0.85,
                            height: isTablet ? 420 : width * 0.85,
                        }}
                    />
                </View>

                {/* TEXT */}
                <View className="mt-[44px] items-center ">

                    <Text className="text-[30px] text-secondary font-bold text-center">
                        Request leave simply
                    </Text>

                    <Text className="text-[16px] text-[#475569] font-normal text-center mt-[16px] leading-[26px] mb-[44px]">
                     Visualize your attendance history and
work hours with our intuitive calendar
view.
                    </Text>

                </View>

            </View>
        </ScrollView>
    );
};

export default Onboarding3;