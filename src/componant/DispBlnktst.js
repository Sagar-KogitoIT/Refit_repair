import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DispBlnktst = () => {
  return (
    <View style={styles.blnk}>
      <Text></Text>
    </View>
  );
};

export default DispBlnktst;

const styles = StyleSheet.create({
  blnk: { width: 23, height: 23, borderColor: "#fff", borderWidth: 1 },
});
