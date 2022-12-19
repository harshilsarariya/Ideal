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
  Snackbar,
  MD2Colors,
  ActivityIndicator,
} from "react-native-paper";
import { addUser } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneInput from "react-native-phone-number-input";
import { useEffect } from "react";
const defaultInfo = {
  phone: "",
  password: "",
  isAdmin: false,
};

const Signup = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userInfo, setUserInfo] = useState(defaultInfo);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    setUserInfo({
      phone: phone,
      password: password,
      isAdmin: false,
    });
  }, [phone, password, confirmPassword]);

  const handleSubmit = async () => {
    if (password === confirmPassword) {
      await AsyncStorage.setItem("phoneNumber", countryCode + phone);

      setUserInfo({
        phone: countryCode + phone,
        password: password,
        isAdmin: false,
      });

      setLoading(true);
      console.log(userInfo);
      let { data, errors } = await addUser(userInfo);
      console.log(data);

      setLoading(false);
      try {
        if (data !== undefined) {
          if (data.success) {
            navigation.navigate("Form");
          } else {
            setMessage(data.errors[0]);
            setVisible(true);
          }
        } else if (errors !== undefined) {
          setMessage(errors);
          setVisible(true);
        }
      } catch (error) {
        setMessage(data.error);
        setVisible(true);
        console.log(error);
      }
    } else {
      setMessage("Password and confirm password does not match");
      setVisible(true);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-around" }}>
      {loading === false ? (
        <>
          <View className="p-5 items-center">
            <Image
              source={require("../../assets/Images/signup.png")}
              style={{ resizeMode: "cover" }}
              className="w-screen h-72"
            />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className=" bg-white "
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="bg-white h-full p-3 ">
                <Text className="text-3xl font-semibold mb-5">Sign up</Text>
                <PhoneInput
                  defaultValue={phone}
                  defaultCode="IN"
                  layout="second"
                  onChangeText={setPhone}
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
                />
                <TextInput
                  secureTextEntry
                  mode="outlined"
                  label="Confirm password"
                  placeholder="Confirm password"
                  className="mt-3"
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                  }}
                />
                <View className="mt-5">
                  <Button
                    onPress={handleSubmit}
                    buttonColor="#0065FF"
                    mode="contained"
                  >
                    <Text className="text-lg">Sign up</Text>
                  </Button>
                </View>

                <View className="flex flex-row justify-center mt-2">
                  <Text className="text-base">Already in QuickFix?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text className="text-blue-600 text-base">Login</Text>
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

export default Signup;
