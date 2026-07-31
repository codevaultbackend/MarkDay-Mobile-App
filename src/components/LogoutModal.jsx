import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";

const LogoutModal = ({
  visible,
  onClose,
  onLogout,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-black/40 justify-center items-center px-6"
        onPress={onClose}
      >
        <Pressable
          onPress={() => {}}
          className="w-full bg-white rounded-3xl p-6"
        >
          {/* Icon */}
          <View className="w-16 h-16 rounded-full bg-red-100 self-center items-center justify-center">
            <Text className="text-3xl">🚪</Text>
          </View>

          {/* Title */}
          <Text
            className="text-xl font-semibold text-center mt-5"
            style={{ includeFontPadding: false }}
          >
            Logout
          </Text>

          {/* Message */}
          <Text
            className="text-gray-500 text-center mt-2 leading-6"
            style={{ includeFontPadding: false }}
          >
            Are you sure you want to logout from your account?
          </Text>

          {/* Buttons */}
          <View className="flex-row mt-6">

            <TouchableOpacity
              onPress={onClose}
              className="flex-1 h-12 rounded-2xl bg-gray-100 items-center justify-center mr-2"
            >
              <Text className="font-medium text-gray-700">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onLogout}
              className="flex-1 h-12 rounded-2xl bg-red-500 items-center justify-center ml-2"
            >
              <Text className="font-semibold text-white">
                Logout
              </Text>
            </TouchableOpacity>

          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default LogoutModal;