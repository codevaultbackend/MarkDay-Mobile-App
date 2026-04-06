import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import LoginImage from "./images/loginimage.webp";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const LoginScreen = () => {
    const [activeTab, setActiveTab] = useState("login");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-primary" edges={['left', 'right', 'bottom']}>



            <KeyboardAwareScrollView
                enableOnAndroid
                extraScrollHeight={20}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "flex-end",
                }}
            >


                {/* ================= IMAGE ================= */}
                <View className="flex-1 w-full"

                    style={{

                        height: isTablet ? 240 : width * 0.7,
                    }}
                >
                    <Image
                        source={LoginImage}
                        className="w-full h-full  "
                        resizeMode="cover"
                    />
                </View>

                <View className="flex-1 w-full px-5">



                    {/* ================= TITLE ================= */}
                    <View className="mt-6 mb-2">

                        <Text
                            className="text-2xl font-medium text-secondary"
                            style={{ includeFontPadding: false }}
                        >
                            Create your account
                        </Text>

                        <Text
                            className="text-sm text-gray-500 mt-[10px]"
                            style={{ includeFontPadding: false }}
                        >
                            Sign up to enjoy the best Try On experience
                        </Text>

                    </View>

                    {/* ================= LOGIN / REGISTER TOGGLE ================= */}


                    {/* ================= EMAIL INPUT ================= */}

                    <View
                        className="mt-5 rounded-2xl"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.06,
                            shadowRadius: 12,
                            elevation: 3,
                        }}
                    >
                        <View className="bg-white rounded-2xl px-4 h-[55px] flex-row items-center">

                            <Ionicons
                                name="mail-outline"
                                size={20}
                                color="#64748B"
                            />

                            <TextInput
                                placeholder="Email Address"
                                placeholderTextColor="#94A3B8"
                                className="flex-1 ml-3 text-[15px] text-secondary"
                            />

                        </View>
                    </View>


                    {/* ================= PASSWORD INPUT ================= */}

                    <View
                        className="mt-5 rounded-2xl"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.06,
                            shadowRadius: 12,
                            elevation: 3,
                        }}
                    >
                        <View className="bg-white rounded-2xl px-4 h-[55px] flex-row items-center">

                            {/* Lock Icon */}
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color="#64748B"
                            />

                            {/* Password Input */}
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#94A3B8"
                                secureTextEntry={!showPassword}
                                className="flex-1 ml-3 text-[15px] text-secondary"
                            />

                            {/* Eye Toggle */}
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color="#64748B"
                                />
                            </TouchableOpacity>

                        </View>
                    </View>




                    {/* ================= SIGN IN BUTTON ================= */}
                    <TouchableOpacity className="bg-accent h-[55px] rounded-2xl mt-4 items-center shadow-md flex-row justify-center mt-[40px] mb-[20px]">
                        <Text className="text-white text-base font-normal">
                            Sign In
                        </Text>
                    </TouchableOpacity>

                </View>

            </KeyboardAwareScrollView>
            {/* </ScrollView> */}

            {/* </KeyboardAvoidingView> */}

        </SafeAreaView>
    );
};

export default LoginScreen;