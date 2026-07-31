import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

import { removeAlertById } from "../redux/slices/alertSlice";

const TOAST_DURATION = 4000;
const SCREEN_WIDTH = Dimensions.get("window").width;


/**
 * Get Toast Theme Based On Type
 */
const getToastConfig = (type) => {
  switch (type) {
    case "success":
      return {
        bg: "#F8F4EC",
        accent: "#A67C52",
        icon: "checkmark-circle",
        iconBg: "#EFE6D8",
        title: "Success",
      };

    case "error":
      return {
        bg: "#FFF5F5",
        accent: "#E5484D",
        icon: "close-circle",
        iconBg: "#FFE5E5",
        title: "Error",
      };

    case "warning":
      return {
        bg: "#FFF8E6",
        accent: "#F59E0B",
        icon: "warning",
        iconBg: "#FFF1C2",
        title: "Warning",
      };

    default:
      return {
        bg: "#F8F4EC",
        accent: "#A67C52",
        icon: "information-circle",
        iconBg: "#EFE6D8",
        title: "Info",
      };
  }
};



/**
 * Toast Item
 */
const ToastItem = ({ alert, index }) => {
  const dispatch = useDispatch();

  const translateY = useRef(new Animated.Value(-150)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const config = getToastConfig(alert.type);

  /**
   * Swipe To Dismiss
   */
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10,

      onPanResponderMove: Animated.event(
        [null, { dx: translateX }],
        { useNativeDriver: false }
      ),

      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > SCREEN_WIDTH * 0.3) {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start(() =>
            dispatch(removeAlertById(alert.id))
          );
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;



  /**
   * Show & Auto Hide Animation
   */
  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),

        Animated.timing(translateY, {
          toValue: -150,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() =>
        dispatch(removeAlertById(alert.id))
      );
    }, TOAST_DURATION);

    return () => clearTimeout(timer);
  }, []);



  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.toastItem,
        {
          backgroundColor: config.bg,
          transform: [
            { translateY },
            { translateX },
            {
              scale: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0.96, 1],
              }),
            },
          ],
          top: index * 88 + 20,
        },
      ]}
    >
      <View style={styles.toastContent}>
        
        {/* Icon */}
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: config.iconBg },
          ]}
        >
          <Ionicons
            name={config.icon}
            size={22}
            color={config.accent}
          />
        </View>

        {/* Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title} className="font-medium">
            {config.title}
          </Text>

          <Text style={styles.message} className="font-normal">
            {alert.message}
          </Text>
        </View>

      </View>

      {/* Accent Line */}
      <View
        style={[
          styles.accent,
          { backgroundColor: config.accent },
        ]}
      />

    </Animated.View>
  );
};



/**
 * Toast Stack
 */
const CustomToastStack = () => {
  const alerts = useSelector(
    (state) => state?.alert?.queue
  );
  // alerts = useSelector(
  //   (state) => state?.alert?.queue
  // );
 

  return (
    <View
      style={styles.container}
      pointerEvents="box-none"
    >
      {alerts?.map((item, index) => (
        <ToastItem
          key={item.id}
          alert={item}
          index={index}
        />
      ))}
    </View>
  );
};

export default CustomToastStack;



/**
 * Styles
 */
const styles = StyleSheet.create({

  container: {
    alignItems: "center",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 9999,
  },

  toastItem: {
    width: "92%",
    borderRadius: 20,
    padding: 16,
    position: "absolute",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },

  toastContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    includeFontPadding:false,
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 3,
  },

  message: {
    includeFontPadding:false ,
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },

  accent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },

});