import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { MaterialIcons, AntDesign } from "@expo/vector-icons/build/Icons";

import HomeScreen from "../screens/HomeScreen";
import StackNavigation from "./StackNavigation";
import PlumberDetails from "../components/Home/PlumberDetails";
import { View } from "react-native";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  function AppDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        {/*all of the drawer items*/}
        <DrawerItemList {...props} style={{ borderWidth: 1 }} />
        <View style={{ flex: 1, marginVertical: 10 }}>
          {/* here's where you put your logout drawer item*/}
          <DrawerItem
            label="Log out"
            icon={({ focused }) => (
              <AntDesign
                name="logout"
                size={20}
                color={focused ? "#3973df" : "#514949"}
              />
            )}
            labelStyle={{ fontSize: 18, fontWeight: "bold" }}
            inactiveTintColor="#000000"
            onPress={() => {
              // AsyncStorage.clear();
              props.navigation.replace("Login");
            }}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        </View>
      </DrawerContentScrollView>
    );
  }
  return (
    <Drawer.Navigator
      drawerContent={(props) => <AppDrawerContent {...props} />}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          drawerIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={20}
              color={focused ? "#3973df" : "#514949"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="PlumberDetailsHome"
        component={PlumberDetails}
        options={{
          title: "Plumber Details",
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="Service"
        component={StackNavigation}
        options={{
          title: "Service",
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name="miscellaneous-services"
              size={24}
              color={focused ? "#3973df" : "#514949"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
