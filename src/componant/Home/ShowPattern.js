import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Pattern from "./Pattern";
const ShowPattern = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Pattern n={10} />
    </View>
  );
};
export default ShowPattern;
