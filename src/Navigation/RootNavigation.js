import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import List from "../componant/list";
import Success from "../componant/success";
import DashboardTab from "../componant/dashboard/DashboardTab";
import ManualTest from "../componant/manualTest";
import IndividualTestScreen from "../screen/IndividualTestScreen";
import Home from "../componant/Home";
import { RefitProvider } from "../context/RefitContext";
import Dashboard from "../componant/dashboard";
import ShowPattern from "../componant/Home/ShowPattern";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <RefitProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="DasboardTab" component={DashboardTab} />
          <Stack.Screen name="Testmobile" component={List} />

          <Stack.Screen name="Success" component={Success} />
          <Stack.Screen name="ManualTest" component={ManualTest} />
          <Stack.Screen name="ShowPattern" component={ShowPattern} />
          <Stack.Screen
            name="IndividualTest"
            component={IndividualTestScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RefitProvider>
  );
};

export default RootNavigation;
