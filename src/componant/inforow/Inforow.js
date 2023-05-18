import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styles } from "./style";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
const Inforow = (props) => {
  const { family, status } = props;
  return (
    <View style={styles.infoWrp}>
      <View style={styles.txtwrp}>
        <View style={{ width: 27 }}>
          <Icon
            name={props.iName}
            type={!family ? IconType.FontAwesome : IconType.family}
            size={20}
            color="#01131A"
          />
        </View>
        <Text style={styles.info}>{props.infoName}</Text>
      </View>
      <View style={styles.tikBtn}>
        {status ? (
          <Image source={require("../../assets/images/tik.png")} />
        ) : (
          <Image source={require("../../assets/images/cros.png")} />
        )}
      </View>
    </View>
  );
};

export default Inforow;
