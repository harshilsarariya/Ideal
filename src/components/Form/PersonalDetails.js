import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const PersonalDetails = ({
  setCurrentPosition,
  setName,
  setemailAddress,
  setPhone,
  phone,
  name,
  email,
}) => {
  return (
    <ScrollView>
      <KeyboardAvoidingView
        className="p-5 bg-white h-[81vh] rounded-t-3xl w-screen"
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.select({ ios: 80, android: 500 })}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
      >
        <View onPress={Keyboard.dismiss}>
          <Text className="text-xl font-semibold">Entry Your Details</Text>
          <View className="mt-5">
            <Text className="text-gray-400 text-base">Name</Text>
            <TextInput
              placeholder="Enter the name"
              className="mt-1 bg-gray-100 rounded-lg p-2 text-lg"
              onChangeText={setName}
              value={name}
            />
          </View>
          <View className="mt-5">
            <Text className="text-gray-400 text-base">Mobile</Text>
            <TextInput
              keyboardType="phone-pad"
              placeholder="Enter the mobile number"
              className="mt-1 bg-gray-100 rounded-lg p-2 text-lg"
              onChangeText={setPhone}
              value={phone}
            />
          </View>
          <View className="mt-5">
            <Text className="text-gray-400 text-base">Email</Text>
            <TextInput
              keyboardType="email-address"
              placeholder="Enter the email"
              className="mt-1 bg-gray-100 rounded-lg p-2 text-lg"
              onChangeText={setemailAddress}
              value={email}
            />
          </View>
          <Button
            onPress={() => {
              setCurrentPosition(1);
            }}
            buttonColor="#000000f0"
            mode="contained-tonal"
            className="mt-5"
          >
            <Text className="text-white text-base">Next</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default PersonalDetails;
