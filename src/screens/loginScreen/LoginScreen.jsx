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
import { useLoginMutation } from "../../redux/features/auth/authApi";
import useHandleMutation from "../../hooks/useHandleMutation";
import { useNavigation } from "@react-navigation/native";
import { saveAuth } from "../../utils/authStorage";
import LinearGradient from "react-native-linear-gradient";
import { pushAlert } from "../../redux/slices/alertSlice";
import { useDispatch } from "react-redux";
const { width, height } = Dimensions.get("window");
const isTablet = width >= 768
import { buttonShadow } from '../../utils/cardStyle'

const LoginScreen = () => {

    const [showPassword, setShowPassword] = useState(false);



    const navigation = useNavigation();

    const [empId, setEmpId] = useState("EMP703  ");
    const [password, setPassword] = useState("123");

    const [login] = useLoginMutation();
    const { handleMutation, loading } = useHandleMutation();

    const dispatch = useDispatch()
    const handleLogin = async () => {

        if (!empId || !password) {

            dispatch(pushAlert({
                id: Date.now().toString(),
                type: "error",
                message: "Employee ID and password required",

            }))
            // return handleMutation({
            //     showError: true,
            //     customErrorMsg: "Employee ID and password required",
            // });

        }

        const res = await handleMutation({
            apiFunc: login,
            params: {
                empId: empId?.toUpperCase()?.trim(),
                password: password?.trim(),
            },
            showSuccess: true,
            // navigateTo: () => navigation.replace("Home"),
        });


        if (res?.empId) {
            saveAuth({
                user: {
                    empId: res?.empId,
                    role: res?.role,
                    name: res?.name
                }
            })
        }

        console.log("Login Response", res);
    };
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['left', 'right', 'bottom']}>



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
                <View
                    className="flex-1 w-full overflow-hidden"
                    style={{
                        height: isTablet ? height * 0.55 : height * 0.5,
                    }}
                >

                    {/* IMAGE */}
                    <Image
                        source={LoginImage}
                        resizeMode="cover"
                        style={{
                            width: isTablet ? "120%" : "140%",
                            height: isTablet ? "150%" : "120%",
                            transform: [{ translateX: 0 }, { translateY: isTablet ? -250 : -100 }]
                        }}
                    />

                    {/* Bottom Black Gradient */}
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(0,0,0,0.2)",
                            "rgba(0,0,0,0.5)"
                        ]}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 120,
                        }}
                    />

                </View>

                <View className="flex-1 w-full px-5  rounded-tl-[20px] rounded-tr-[20px]  bg-primary -mt-[40px]"  >



                    {/* ================= TITLE ================= */}
                    <View className="mt-6 mb-2">

                        <Text
                            className="text-2xl font-medium text-secondary"
                            style={{ includeFontPadding: false }}
                        >
                            Login your account
                        </Text>

                        <Text
                            className="text-sm text-gray-500 mt-[10px]"
                            style={{ includeFontPadding: false }}
                        >
                            Login  to enjoy the best Try On experience
                        </Text>

                    </View>

                    {/* ================= LOGIN / REGISTER TOGGLE ================= */}


                    {/* ================= EMAIL INPUT ================= */}

                    <View
                        className="mt-5 rounded-2xl border border-gray-100"
                        style={{
                            shadowColor: "#E2E8F0",
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.06,
                            shadowRadius: 12,
                            elevation: 3,
                        }}
                    >
                        <View className="bg-white rounded-2xl px-4 h-[55px] flex-row items-center">

                            <Ionicons
                                name="person-outline"
                                size={20}
                                color="#64748B"
                            />

                            <TextInput
                                placeholder="Employee ID"
                                placeholderTextColor="#94A3B8"
                                className="flex-1 ml-3 text-[15px] text-secondary"
                                value={empId}
                                onChangeText={setEmpId}
                            />

                        </View>
                    </View>


                    {/* ================= PASSWORD INPUT ================= */}

                    <View
                        className="mt-5 rounded-2xl border border-gray-100"
                        style={{
                            shadowColor: "#E2E8F0",

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
                                value={password}
                                onChangeText={setPassword}
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
                    <TouchableOpacity
                        onPress={handleLogin}
                        disabled={loading}
                        style={buttonShadow}
                        className="bg-accent h-[55px] rounded-2xl mt-4 items-center flex-row justify-center mt-[40px] mb-[20px]"
                    >

                        <Text className="text-white text-base font-normal">
                            {loading ? "Signing In..." : "Sign In"}
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