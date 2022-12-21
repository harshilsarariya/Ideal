import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  TextInput,
  Button,
  Snackbar,
  MD2Colors,
  ActivityIndicator,
} from "react-native-paper";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../../config";
import firebase from "firebase/compat/app";
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
  const [phoneOtp, setPhoneOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [countryCode, setCountryCode] = useState("91");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userInfo, setUserInfo] = useState(defaultInfo);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const recaptchaVerifier = useRef(null);
  const [buttonDisable, setButtonDisable] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  const sendVerification = () => {
    setOtpLoading(true);
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneOtp, recaptchaVerifier.current)
      .then(setVerificationId);
    setOtpLoading(false);
    setButtonDisable(true);
    setTimeout(() => {
      setButtonDisable(false);
    }, 30000);
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setOtp("");
        setOtpVerified(true);
      })
      .catch((error) => {
        alert(error);
      });

    Alert.alert("Phone number verified.");
  };

  useEffect(() => {
    setUserInfo({
      phone: phone,
      password: password,
      isAdmin: false,
    });
  }, [phone, password, confirmPassword]);

  useEffect(() => {
    if (otp.length === 6) {
      confirmCode();
    }
  }, [otp]);

  const handleSubmit = async () => {
    if (password === confirmPassword && otpVerified) {
      await AsyncStorage.setItem("phoneNumber", phone);
      setUserInfo({
        phone: phone,
        password: password,
        isAdmin: false,
      });

      setLoading(true);
      let { data, errors } = await addUser(userInfo);
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
    } else if (!otpVerified) {
      setMessage("Invalid OTP! Please enter correct OTP.");
      setVisible(true);
    } else {
      setMessage("Password and confirm password does not match");
      setVisible(true);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-around" }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
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
                  onChangeText={(text) => {
                    setPhone(countryCode + text);
                    setPhoneOtp("+" + countryCode + text);
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
                <View className="flex flex-row items-center mt-3">
                  <TextInput
                    mode="outlined"
                    label="OTP"
                    placeholder="Enter the otp"
                    className="w-[60vw] mr-3"
                    onChangeText={setOtp}
                  />
                  <TouchableOpacity
                    mode="elevated"
                    className="bg-blue-500 rounded-lg w-[30vw] h-[50px] flex items-center flex-row justify-center"
                    onPress={sendVerification}
                    disabled={buttonDisable}
                  >
                    {otpLoading ? (
                      <ActivityIndicator
                        size={"small"}
                        animating={true}
                        color={MD2Colors.blue800}
                      />
                    ) : (
                      <Text className="text-base text-white">Send OTP</Text>
                    )}
                  </TouchableOpacity>
                </View>
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
