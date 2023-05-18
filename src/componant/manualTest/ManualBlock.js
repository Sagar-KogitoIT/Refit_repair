import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ManualBlock = ({ icon, title, onPress, isOk, showIcon = false }) => {
  console.log("isOkDataVal", isOk);
  console.log("showIconData", showIcon);
  // const isOk = data?.cameraState?.ok || false;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.infoWrp}>
        <View style={styles.txtwrp}>
          <View style={{ width: 27 }}>{icon}</View>
          <Text style={[styles.title, { marginRight: 12 }]}>{title}</Text>
          {showIcon ? (
            isOk ? (
              <Image source={require("../../assets/images/tik.png")} />
            ) : (
              <Image source={require("../../assets/images/cros.png")} />
            )
          ) : null}
        </View>
        <View style={styles.rgtArrow}>
          <MaterialIcons name="arrow-forward-ios" size={35} color="#00000060" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  infoWrp: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderBottomColor: '#01131A',
    // borderBottomWidth: 0.5,
    // paddingVertical: 10,
    marginHorizontal: 8,
    paddingHorizontal: 20,
    elevation: 6,
    borderRadius: 10,
    marginVertical: 8,
    backgroundColor: "#fff",
    height: 60,
  },
  info: {
    color: "#01131A",
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    paddingLeft: 5,
    marginBottom: -2,
  },
  title: {
    color: "#00000060",
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    textAlign: "center",
    marginBottom: -2,
  },
  txtwrp: { flexDirection: "row", alignItems: "center" },
  rgtArrow: {
    borderColor: "#00000030",
    borderLeftWidth: 1,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: -8,
    paddingLeft: 8,
  },
});

// ManualBlock.defaultProps = {
//   icon: '',
//   title: '',
//   func: () => {},
// };

export default ManualBlock;
