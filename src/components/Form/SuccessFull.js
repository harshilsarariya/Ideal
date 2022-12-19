import { View, Text, Image, BackHandler } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const SuccessFull = () => {
  return (
    <View className="bg-white h-full">
      <View className="flex items-center">
        <Image
          source={require("../../assets/Images/success.gif")}
          style={{
            width: 200,
            height: 200,
            resizeMode: "cover",
            marginTop: 200,
          }}
        />
      </View>
      <View className="items-center mx-5">
        <Text className="text-2xl mb-36">Form submitted succesfully!</Text>
        <Button
          labelStyle={{ fontSize: 20 }}
          buttonColor="#000000"
          mode="contained"
          onPress={() => {
            BackHandler.exitApp();
          }}
        >
          Done
        </Button>
      </View>
    </View>
  );
};

export default SuccessFull;
