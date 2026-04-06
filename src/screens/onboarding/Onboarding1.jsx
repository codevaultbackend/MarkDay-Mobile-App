import React from "react";
import { View, Text, Dimensions, ScrollView, Image } from "react-native";

import Onboarding1Img from "../onboarding/images/onboarding1.webp";



const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const Onboarding1 = () => {
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
                        height: isTablet ? 420 : width * 0.85,
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

                    <Text className="text-[28px] text-secondary font-bold text-center ">
                        Effortless Check-ins
                    </Text>         

                    <Text className="text-[16px] text-[#475569] font-normal text-center mt-[8px] leading-[24px] mb-[40px]">
                        Mark your attendance in seconds with
                        integrated camera and precise GPS
                        verification.
                    </Text>

                </View>

            </View>
        </ScrollView>
    );
};

export default Onboarding1;