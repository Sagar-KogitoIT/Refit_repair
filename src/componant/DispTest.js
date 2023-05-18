import { StyleSheet, Text, Pressable, View, Alert } from "react-native";
import React, { useState } from "react";

const DispTest = ({ name }) => {
  const [bgclor, setBgclor] = useState("#dcdcdc");

  const clikbtn = () => {
    setBgclor("#3dbfac");
  };
  return (
    <Pressable
      // key={key}
      onPressIn={clikbtn}
      onPressOut={clikbtn}
      style={[styles.btn, { backgroundColor: `${bgclor}` }]}
    >
      {/* <Text style={{ fontSize: 11 }}>{name}</Text> */}
    </Pressable>
  );
};

export default DispTest;

const styles = StyleSheet.create({
  btn: {
    width: 23,
    height: 23,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
