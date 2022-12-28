import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import StepIndicator from "react-native-step-indicator";
import PersonalDetails from "./PersonalDetails";
import IDProof from "./IDProof";
import WorkDetails from "./WorkDetails";
import { searchPhoneNumber, updateUser } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Snackbar } from "react-native-paper";

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#fe7013",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#fe7013",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#fe7013",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#fe7013",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fe7013",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#fe7013",
  borderRadiusSize: 10,
};

const defaultUserInfo = {
  name: "",
  emailAddress: "",
  phone: "",
  isAdmin: false,
  pincode: "",
  state: "",
  district: "",
  area: "",
  aadharFront: { public_id: "", url: "" },
  aadharBack: { public_id: "", url: "" },
  pancard: { public_id: "", url: "" },
  // companyName: "",
  experience: "",
  workAdress: "",
  isAgency: false,
  districts: [],
};

const labels = ["Personal Details", "ID Proof", "Work Detais"];

const Form = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [currentPosition, setCurrentPosition] = useState(0);
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [name, setName] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [aadharFront, setAadharFront] = useState({ public_id: "", url: "" });
  const [aadharBack, setAadharBack] = useState({ public_id: "", url: "" });
  const [pancard, setPancard] = useState({ public_id: "", url: "" });
  // const [companyName, setCompanyName] = useState("");
  const [experience, setExperience] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [isAgency, setIsAgency] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const handleSubmit = async () => {
    setUserInfo({
      name: name,
      emailAddress: emailAddress,
      phone: phone,
      isAdmin: isAdmin,
      pincode: pincode,
      state: state,
      district: district,
      area: area,
      aadharFront: aadharFront,
      aadharBack: aadharBack,
      pancard: pancard,
      // companyName: companyName,
      experience: experience,
      workAddress: workAddress,
      isAgency: isAgency,
      districts: districts,
    });
    checkFields();
    if (check) {
      try {
        const { data } = await updateUser(userId, userInfo);
        if (data !== undefined) {
          if (data.success) {
            navigation.navigate("success");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handelPhone = async () => {
    let phoneNumber = await AsyncStorage.getItem("phoneNumber");

    setPhone(phoneNumber);
  };

  const findUserId = async () => {
    const { data } = await searchPhoneNumber(phone);
    try {
      if (data !== undefined) {
        if (data.length > 0) {
          setUserId(data[0].id);
        }
      }
    } catch (error) {
      setMessage(data.error);
      setVisible(true);
      console.log(error);
    }
  };

  useEffect(() => {
    handelPhone();
  }, []);

  useEffect(() => {
    findUserId();
  }, [phone]);

  const checkFields = () => {
    if (name.trim() === "") {
      setMessage("Name required.");
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    } else if (phone.trim() === "") {
      setMessage("Phone required.");
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    } else if (emailAddress.trim() === "") {
      setMessage("Email required.");
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    } else if (aadharFront.url.trim() === "") {
      setMessage("Aadharcard is required.");
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    } else if (aadharBack.url.trim() === "") {
      setMessage("Aadharcard is required.");
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    } else if (pancard.url.trim() === "") {
      setMessage("Pancard is required.");
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    } else if (experience.trim() === "") {
      setMessage("Experience required.");
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    } else if (workAddress.trim() === "") {
      setMessage("Address is required.");
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    } else if (pincode.trim() === "") {
      setMessage("Pincode is required.");
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    } else {
      setCheck(true);
    }
  };

  return (
    <View className="pt-10 ">
      <View className="p-2 pb-5">
        <Text className="text-2xl ml-4">Upload Details</Text>
        <View className="mt-5">
          <StepIndicator
            stepCount={3}
            customStyles={customStyles}
            labels={labels}
            currentPosition={currentPosition}
          />
        </View>
      </View>

      {currentPosition === 0 ? (
        <PersonalDetails
          setName={setName}
          setPhone={setPhone}
          phone={phone}
          name={name}
          message={message}
          onDismissSnackBar={onDismissSnackBar}
          visible={visible}
          email={emailAddress}
          setemailAddress={setemailAddress}
          setCurrentPosition={setCurrentPosition}
        />
      ) : currentPosition === 1 ? (
        <IDProof
          setAadharFront={setAadharFront}
          setAadharBack={setAadharBack}
          setPancard={setPancard}
          setCurrentPosition={setCurrentPosition}
        />
      ) : (
        <WorkDetails
          setExperience={setExperience}
          experience={experience}
          setWorkAddress={setWorkAddress}
          workAddress={workAddress}
          setPincode={setPincode}
          setState={setState}
          setDistrict={setDistrict}
          setArea={setArea}
          pincode={pincode}
          setCurrentPosition={setCurrentPosition}
          handleSubmit={handleSubmit}
          navigation={navigation}
          setIsAgency={setIsAgency}
          setDistricts={setDistricts}
        />
      )}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Okay",
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

export default Form;
