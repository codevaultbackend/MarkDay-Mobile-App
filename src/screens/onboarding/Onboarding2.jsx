import React from "react";
import { View, Text, Dimensions, ScrollView, Image } from "react-native";

import Onboarding1Img from "../onboarding/images/onboarding2.webp";



const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;

const Onboarding2 = () => {
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
                <View className="mt-[10px]"
                    style={{
                        width: isTablet ? 420 : width * 0.9,
                        height: isTablet ? 420 : height * 0.45,
                    }}
                >
                    <Image
                        className="rounded-[32px] w-full h-full"
                        source={Onboarding1Img}
                        resizeMode="cover"

                    />
                </View>

                {/* TEXT */}
                <View className="mt-[44px] items-center">

                    <Text className="text-[28px] text-secondary font-bold text-center">
                        Track your Progress
                    </Text>

                    <Text className="text-[16px] text-[#475569] font-normal text-center mt-[8px] leading-[24px] mb-[40px] min-h-[80px]">             
                        Visualize your attendance history and work hours with our intuitive calendar view.
                    </Text>

                </View>

            </View>
        </ScrollView>
    );
};

export default Onboarding2;