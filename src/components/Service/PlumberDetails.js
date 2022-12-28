import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getUser, deleteUser } from "../../api/user";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";

const PlumberDetails = ({ route, navigation }) => {
  const prmId = route.params.id;
  const [userInfo, setUserInfo] = useState({});
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const fetchData = async () => {
    let { data } = await getUser(prmId);
    setUserInfo(data);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(prmId);
      hideDialog();
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [prmId]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Provider>
      <ScrollView className="p-2  bg-white">
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Warning!</Dialog.Title>
            <Dialog.Content>
              <Paragraph className="text-lg">Are you sure?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleDelete}>Yes</Button>
              <Button onPress={hideDialog}>No</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View className="items-end mr-2">
          <MaterialIcons
            name="delete-outline"
            onPress={showDialog}
            size={24}
            color="black"
          />
        </View>

        {userInfo.name !== undefined ? (
          <View className="flex m-2">
            <Text className="text-lg font-bold">Name </Text>
            <Text className="text-lg border-2 rounded-lg px-2 py-1 border-gray-100">
              {userInfo.name}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {userInfo.emailAddress !== undefined ? (
          <View className="flex m-2">
            <Text className="text-lg font-bold">Email </Text>
            <Text className="text-lg border-2 rounded-lg px-2 py-1 border-gray-100">
              {userInfo.emailAddress}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {userInfo.phone !== undefined ? (
          <View className="flex m-2">
            <Text className="text-lg font-bold">Phone </Text>
            <Text
              className="text-lg border-2 rounded-lg px-2 py-1 border-gray-100"
              onPress={() => {}}
              selectable={true}
            >
              {userInfo.phone}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {userInfo.pincode !== undefined ? (
          <View className="flex m-2">
            <Text className="text-lg font-bold">Pincode </Text>
            <Text className="text-lg border-2 rounded-lg px-2 py-1 border-gray-100">
              {userInfo.pincode}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {userInfo.state !== undefined ? (
          <View className="flex m-2">
            <Text className="text-lg font-bold">State </Text>
            <Text className="text-lg border-2 rounded-lg px-2 py-1 border-gray-100">
              {userInfo.state}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {userInfo.district !== undefined ? (
          <View className="flex m-2">
            <Text className="text-lg font-bold">District </Text>
            <Text className="text-lg border-2 rounded-lg px-2 py-1 border-gray-100">
              {userInfo.district}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {userInfo.area !== undefined ? (
          <View className="flex m-2">
            <Text className="text-lg font-bold">Area </Text>
            <Text className="text-lg border-2 rounded-lg px-2 py-1 border-gray-100">
              {userInfo.area}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {userInfo.companyName !== undefined ? (
          <View className="flex m-2">
            <Text className="text-lg font-bold">Company Name </Text>
            <Text className="text-lg border-2 rounded-lg px-2 py-1 border-gray-100">
              {userInfo.companyName}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {userInfo.experience !== undefined ? (
          <View className="flex m-2">
            <Text className="text-lg font-bold">Experience </Text>
            <Text className="text-lg border-2 rounded-lg px-2 py-1 border-gray-100">
              {userInfo.experience}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {userInfo.workAddress !== undefined ? (
          <View className="flex m-2">
            <Text className="text-lg font-bold">Work Address </Text>
            <Text className="text-lg border-2 rounded-lg px-2 py-1 border-gray-100">
              {userInfo.workAddress}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {userInfo.isAgency !== undefined ? (
          <View className="flex m-2">
            <Text className="text-lg font-bold">Agency </Text>
            <Text className="text-lg border-2 rounded-lg px-2 py-1 border-gray-100">
              {userInfo.isAgency ? "Yes" : "No"}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {userInfo.districts !== undefined ? (
          <View className="flex m-2">
            <Text className="text-lg font-bold">Districts </Text>
            <Text className="text-lg border-2 h-auto rounded-lg px-2 py-1 border-gray-100">
              {userInfo.districts.map((item) => item + " ,")}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {userInfo.aadharFront !== undefined ? (
          <View className="flex m-2">
            <Text className="text-lg font-bold">Aadhar Card Front </Text>
            <Image
              source={{
                uri: userInfo.aadharFront.url,
              }}
              className="w-full h-52 rounded-lg"
            />
          </View>
        ) : (
          <></>
        )}
        {userInfo.aadharBack !== undefined ? (
          <View className="flex m-2">
            <Text className="text-lg font-bold">Aadhar Card Back </Text>
            <Image
              source={{
                uri: userInfo.aadharBack.url,
              }}
              className="w-full h-52 rounded-lg"
            />
          </View>
        ) : (
          <></>
        )}
        {userInfo.pancard !== undefined ? (
          <View className="flex m-2 pb-7">
            <Text className="text-lg font-bold">PanCard </Text>
            <Image
              source={{
                uri: userInfo.pancard.url,
              }}
              className="w-full h-52 rounded-lg"
            />
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    </Provider>
  );
};

export default PlumberDetails;
