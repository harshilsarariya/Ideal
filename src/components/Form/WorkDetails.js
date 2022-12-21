import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useEffect } from "react";
import { Button, Checkbox } from "react-native-paper";
import { useState } from "react";

const WorkDetails = ({
  setCurrentPosition,
  setPincode,
  setExperience,
  setWorkAddress,
  handleSubmit,
  workAddress,
  pincode,
  experience,
  setDistricts,
  districts,
  setIsAgency,
  setDistrict,
  setArea,
  setState,
}) => {
  const [checked, setChecked] = useState(false);
  const [agencyDistrict, setAgencyDistricts] = useState("");

  const fetchPincodeData = async (pin) => {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const data = await response.json();
    if (data[0].Status === "Success") {
      setState(data[0].PostOffice[0].State);
      setDistrict(data[0].PostOffice[0].District);
      setArea(data[0].PostOffice[0].Name);
    }
  };

  useEffect(() => {
    fetchPincodeData(pincode);
  }, [pincode.length === 6]);

  useEffect(() => {
    const dis = agencyDistrict.split(",").map((value) => {
      return (
        value.trim().charAt(0).toUpperCase() + value.slice(1).toLowerCase()
      );
    });
    setDistricts(dis);
  }, [agencyDistrict]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        className="p-5 bg-white h-[100vh] rounded-t-3xl w-screen"
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.select({ ios: 80, android: 500 })}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
      >
        <View onPress={Keyboard.dismiss}>
          <Text className="text-xl font-semibold">Entry Work Details</Text>
          {/* <View className="mt-5">
            <Text className="text-gray-400 text-base">Company Name</Text>
            <TextInput
              placeholder="Enter the company name"
              className="mt-1 bg-gray-100 rounded-lg p-2 text-lg"
              onChangeText={setCompanyName}
              value={companyName}
            />
          </View> */}
          <View className="mt-5">
            <Text className="text-gray-400 text-base">Experience</Text>
            <TextInput
              keyboardType="default"
              placeholder="Write your experience"
              className="mt-1 bg-gray-100 rounded-lg p-2 text-lg"
              onChangeText={setExperience}
              value={experience}
            />
          </View>
          <View className="mt-5">
            <Text className="text-gray-400 text-base">Work Address</Text>
            <TextInput
              keyboardType="default"
              placeholder="Enter the work adress"
              className="mt-1 bg-gray-100 rounded-lg p-2 text-lg"
              onChangeText={setWorkAddress}
              value={workAddress}
            />
          </View>
          <View className="mt-5">
            <Text className="text-gray-400 text-base">Pincode</Text>
            <TextInput
              keyboardType="number-pad"
              placeholder="Enter the pincode"
              className="mt-1 bg-gray-100 rounded-lg p-2 text-lg"
              onChangeText={setPincode}
              value={pincode}
            />
          </View>
          <View className="flex flex-row mt-3 items-center">
            <Text className="text-base">Have Agency?</Text>
            <Checkbox
              color="black"
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
                setIsAgency(!checked);
                if (!setIsAgency) {
                  setDistricts([]);
                }
              }}
            />
          </View>
          <View>
            {checked && (
              <>
                <Text className="text-gray-500">
                  Enter Districts where your agency provide sevices
                </Text>
                <TextInput
                  style={{ height: 50 }}
                  keyboardType="default"
                  placeholder="Eg. Morbi,SurendraNagar,Rajkot..."
                  className="mt-1 bg-gray-100 rounded-lg p-2 text-lg w-full"
                  onChangeText={setAgencyDistricts}
                  value={districts}
                />
              </>
            )}
          </View>
          <View className="flex flex-row justify-between">
            <Button
              onPress={() => setCurrentPosition(1)}
              buttonColor="#000000f0"
              mode="contained-tonal"
              className="mt-5"
            >
              <Text className="text-white text-base w-32">Previous</Text>
            </Button>
            <Button
              buttonColor="#000000f0"
              mode="contained-tonal"
              className="mt-5"
              onPress={handleSubmit}
            >
              <Text className="text-white text-base w-32">Submit</Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default WorkDetails;
