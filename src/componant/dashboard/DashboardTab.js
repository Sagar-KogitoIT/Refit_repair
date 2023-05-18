import { View, Text } from "react-native";
import React from "react";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Dashboard from "./Dashboard";
import List from "../list";

const Tab = createBottomTabNavigator();

const DashboardTab = () => {
  return (
    <Text>jjj</Text>
    // <Tab.Navigator
    //   screenOptions={({ route }) => ({
    //     tabBarIcon: ({ focused, color, size }) => {
    //       const sizeVar = focused ? 26 : 18;
    //       const colorVar = focused ? "#23CDB2" : "#ccc";
    //       if (route.name === "Dashboard") {
    //         return (
    //           <Icon
    //             name="dashboard"
    //             type={IconType.MaterialIcons}
    //             size={sizeVar}
    //             color={colorVar}
    //           />
    //         );
    //       } else if (route.name === "TestMobile") {
    //         return (
    //           <Icon
    //             name="test-tube"
    //             type={IconType.Fontisto}
    //             size={sizeVar}
    //             color={colorVar}
    //           />
    //         );
    //       }
    //     },
    //     unmountOnBlur: true,
    //     tabBarInactiveTintColor: "gray",
    //     tabBarActiveTintColor: "#23CDB2",
    //     headerShown: false,
    //     tabBarStyle: {
    //       backgroundColor: "#fff",
    //       borderTopLeftRadius: 20,
    //       borderTopRightRadius: 20,
    //       // elevation: 5,
    //       fontSize: 30,
    //       height: 60,
    //       marginTop: 3,
    //     },
    //     tabBarLabelStyle: {
    //       fontFamily: "Poppins-SemiBold",
    //       fontSize: 14,
    //     },
    //   })}
    // >
    //   <Tab.Screen
    //     name="Dashboard"
    //     component={Dashboard}
    //     tabBarActiveTintColor="green"
    //   />
    //   <Tab.Screen name="TestMobile" component={List} />
    // </Tab.Navigator>
  );
};

export default DashboardTab;
