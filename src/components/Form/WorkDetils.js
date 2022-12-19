import { View, Text, TextInput, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Button, Checkbox } from "react-native-paper";
import { useState } from "react";

const WorkDetils = ({
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
}) => {
  const [checked, setChecked] = useState(false);
  const [agencyDistrict, setAgencyDistricts] = useState("");

  const fetchData = async () => {
    const response = await fetch("")
  };

  useEffect(() => {
    // const response = await
  }, [agencyDistrict]);

  return (
    <View>
      <ScrollView
        className="p-5 bg-white h-[81vh] rounded-t-3xl w-screen"
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
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
                onChangeText={setDistricts}
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
      </ScrollView>
    </View>
  );
};

export default WorkDetils;
