import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Toproundbox, Toptxt } from "../StyledComponent/wrapper/Styles";
import { Button, ButttonText } from "../StyledComponent/Button";
const Imei = ({ onChangeImei, onSubmitImei, imei }) => {
  return (
    <View style={styles.wrp}>
      <StatusBar
        animated={true}
        backgroundColor="#0071C1"
        barStyle="light-content"
      />
      <View style={{ borderTopColor: "#fff", borderTopWidth: 1, marginTop: 6 }}>
        <Toptxt>
          <Image source={require("../assets/images/logo.png")} />
        </Toptxt>
      </View>
      <Toproundbox>
        <KeyboardAvoidingView>
          <View>
            <Image
              source={require("../assets/images/topimg.png")}
              style={{ height: 200, width: 150, alignSelf: "center" }}
            />
          </View>
          <View style={styles.box}>
            <Toptxt
              style={{
                color: "#000",
                fontSize: 14,
                width: "120%",
                marginHorizontal: "-10%",
              }}
            >
              Please Enter IMEI to proceed
            </Toptxt>
            <View style={styles.inputwrp}>
              <TextInput
                keyboardType="number-pad"
                placeholder="IMEI"
                style={styles.input}
                onChangeText={(value) => onChangeImei(value)}
                value={imei}
              />
            </View>
            <Button
              margin="20"
              onPress={
                onSubmitImei
                // navigation.navigate("DasboardTab");
              }
            >
              <ButttonText>Submit</ButttonText>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Toproundbox>
    </View>
  );
};

export default Imei;

const styles = StyleSheet.create({
  wrp: {
    backgroundColor: "#0071C1",
    flex: 1,
  },
  box: { marginHorizontal: "8%", marginTop: "10%" },
  inputwrp: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  input: {
    flex: 1,
    color: "#000",
    fontFamily: "Poppins-Medium",
    fontSize: 17,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    textAlign: "center",
  },
});
