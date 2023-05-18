import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const DispCross = ({ name, row, posL, posT }) => {
  return (
    <TouchableOpacity style={[styles.btn]}>
      <Text style={{ fontSize: 11 }}>
        {name}
        {row}
      </Text>
    </TouchableOpacity>
  );
};

export default DispCross;

const styles = StyleSheet.create({
  btn: {
    width: 23,
    height: 23,
    borderColor: "#ccc",
    borderWidth: 1,
    position: "absolute",
  },
});
