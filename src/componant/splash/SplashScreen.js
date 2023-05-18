import { View, Text, ImageBackground, StatusBar } from "react-native";
import React from "react";

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#0071C1" }}>
      <StatusBar
        animated={true}
        backgroundColor="#0071C1"
        barStyle="light-content"
      />
      <ImageBackground
        source={require("../../assets/images/splash.png")}
        style={{ width: "100%", height: "103%" }}
      />
    </View>
  );
};

export default SplashScreen;
