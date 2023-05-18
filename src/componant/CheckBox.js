import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

const CheckBox = (props) => {
  const { checked, onPress, stateName, family, status, infoName, iName } =
    props;

  return (
    <TouchableOpacity
      // onPress={() => changeCheck(prev => !prev)}
      onPress={onPress}
      style={styles.infoWrp}
    >
      <View style={styles.txtwrp}>
        <View
          style={{
            width: 27,

            alignItems: "center",
          }}
        >
          <Icon
            name={iName}
            type={!family ? IconType.FontAwesome : IconType.family}
            size={20}
            color="#01131A"
          />
        </View>
        <Text style={styles.info}>{infoName}</Text>
      </View>

      <View style={[styles.radio, { backgroundColor: "#23CDB2" }]}>
        {checked && (
          <Icon
            name="check"
            type={IconType.FontAwesome}
            size={15}
            color="#fff"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  radio: {
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#16AFC1",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  descptbox: {
    borderBottomColor: "#081A2B30",
    borderBottomWidth: 1,
    justifyContent: "center",
    paddingHorizontal: "5%",
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",

    alignItems: "center",
  },
  descptboxTxt: {
    color: "#081A2B",
    fontFamily: "Inter-Regular",
    fontSize: 15,
    marginLeft: 5,
  },
  infoWrp: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#01131A",
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    marginHorizontal: -16,
    paddingHorizontal: 20,
  },
  info: {
    color: "#01131A",
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    paddingLeft: 5,
    marginBottom: -2,
  },
  txtwrp: { flexDirection: "row", alignItems: "center" },
  tikBtn: {},
});
