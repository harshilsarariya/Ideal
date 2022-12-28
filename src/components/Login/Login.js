import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React, { useState } from "react";
import {
  TextInput,
  Button,
  ActivityIndicator,
  MD2Colors,
  Snackbar,
} from "react-native-paper";
import { searchItem, verifyUser } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneInput from "react-native-phone-number-input";

const defaultInfo = {
  phone: "",
  password: "",
};

const Login = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(defaultInfo);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const onDismissSnackBar = () => setVisible(false);

  const handleSubmit = async () => {
    setUserInfo({
      phone: phone,
      password: password,
    });
    console.log(userInfo);
    setLoading(true);
    let { data } = await verifyUser(userInfo);
    console.log(data);
    setLoading(false);

    if (data !== undefined) {
      try {
        if (data.success) {
          setMessage("Login successfully!");
          setVisible(true);
          await AsyncStorage.setItem("phoneNumber", phone);

          const { data } = await searchItem(phone);
          console.log(data);
          if (data[0].isAdmin !== undefined && data[0].isAdmin) {
            navigation.navigate("Drawer");
          } else {
            if (data[0].name !== undefined && data[0].name.length > 0) {
              navigation.navigate("success");
            } else {
              navigation.navigate("Form");
            }
          }
        } else if (data.success === false) {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (data === undefined) {
      setMessage("Please Enter correct details");
      setVisible(true);
    }
  };

  return (
    <View
      className="mt-10 "
      style={{ flex: 1, justifyContent: "space-around" }}
    >
      {loading === false ? (
        <>
          <View className="items-center">
            <Image
              source={require("../../assets/Images/login.png")}
              style={{ resizeMode: "cover" }}
              className="w-screen h-96"
            />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className=" bg-white "
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="h-full p-3">
                <Text className="text-3xl font-semibold mb-3">Login</Text>

                <PhoneInput
                  defaultValue={phone}
                  defaultCode="IN"
                  layout="second"
                  onChangeText={(text) => {
                    setPhone(countryCode + text);
                  }}
                  onChangeCountry={setCountryCode}
                  countryPickerProps={{ withAlphaFilter: true }}
                  containerStyle={{
                    width: 335,
                    height: 55,
                    borderColor: "#0000007c",
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                />

                <TextInput
                  secureTextEntry
                  mode="outlined"
                  label="Password"
                  placeholder="Enter the password"
                  className="mt-3"
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  value={password}
                />
                <View className="mt-5">
                  <Button
                    onPress={handleSubmit}
                    buttonColor="#0065FF"
                    mode="contained"
                  >
                    <Text className="text-lg">Login</Text>
                  </Button>
                </View>

                <View className="flex flex-row justify-center mt-2">
                  <Text className="text-base">New to QuickFix?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Signup")}
                  >
                    <Text className="text-blue-600 text-base">Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: "Okay",
              onPress: () => {
                setVisible(false);
              },
            }}
          >
            {message}
          </Snackbar>
        </>
      ) : (
        <ActivityIndicator
          size={"large"}
          animating={true}
          color={MD2Colors.blue800}
        />
      )}
    </View>
  );
};

export default Login;
