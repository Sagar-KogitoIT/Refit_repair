import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { Toproundbox, Toptxt } from "../../StyledComponent/wrapper/Styles";
import { Button, ButttonText } from "../../StyledComponent/Button";
import Inforow from "../inforow/Inforow";
import useList from "./useList";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
const List = ({ navigation, route }) => {
  const { deviceBrand, deviceModel, deviceName, imei } = route.params;

  const { state, loading } = useList();
  console.log("statatejjdj", state);
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });
  return (
    <View style={styles.wrp}>
      <StatusBar
        animated={true}
        backgroundColor="#0071C1"
        barStyle="light-content"
      />
      <View style={{ borderTopColor: "#fff", borderTopWidth: 1, marginTop: 6 }}>
        <Toptxt>
          <Image source={require("../../assets/images/logo.png")} />
        </Toptxt>
      </View>
      <Toproundbox style={{ height: "88%" }}>
        <View style={{ height: "82%", marginBottom: "1.5%" }}>
          {loading && <ActivityIndicator size="large" color="#00ff00" />}
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.infoWrp, { justifyContent: "center" }]}>
              <View style={styles.txtwrp}>
                <Text style={styles.title}>Automated Tests</Text>
              </View>
            </View>
            {state.accelerometer && (
              <Inforow
                iName="speed"
                infoName="Accelerometer"
                status={state.accelerometerStatus}
                family="MaterialIcons"
              />
            )}
            {/* {state.bluetooth && (
              <Inforow
                iName="bluetooth-b"
                infoName="Bluetooth"
                status={state.bluetoothStatus}
              />
            )} */}
            {state.frontCamera && (
              <Inforow
                iName="camera"
                infoName="Front Camera"
                status={state.frontCameraStatus}
              />
            )}
            {state.backCamera && (
              <Inforow
                iName="camera"
                infoName="Back Camera"
                status={state.backCameraStatus}
              />
            )}
            {/* {state.fingerPrint && (
              <Inforow
                family="FontAwesome5"
                iName="fingerprint"
                infoName="Fingerprint"
                status={state.fingerPrintStatus}
              />
            )} */}

            {/* {state.flash && (
              <Inforow
                family="Entypo"
                iName="flashlight"
                infoName="Flash"
                status={state.flashStatus}
              />
            )} */}

            {state.gps && (
              <Inforow
                family="MaterialIcons"
                iName="gps-fixed"
                infoName="GPS"
                status={state.gpsStatus}
              />
            )}

            {state.gyroscope && (
              <Inforow
                iName="sync"
                infoName="Gyroscope"
                status={state.gyroscopeStatus}
                family="Ionicons"
              />
            )}

            {state.lockScreen && (
              <Inforow
                iName="lock"
                infoName="Screen Lock"
                status={state.lockScreenStatus}
              />
            )}

            {/* {state.network && (
              <Inforow
                family="MaterialIcons"
                iName="signal-cellular-4-bar"
                infoName="Network Connectivity"
                status={state.networkStatus}
              />
            )} */}

            {state.proximity && (
              <Inforow
                family="MaterialIcons"
                iName="signal-cellular-4-bar"
                infoName="Proximity"
                status={state.proximityStatus}
              />
            )}

            {state.sim1 && (
              <Inforow
                family="FontAwesome5"
                iName="sim-card"
                infoName="Sim Reader 1"
                status={state.sim1Status}
              />
            )}

            {state.sim2 && (
              <Inforow
                family="FontAwesome5"
                iName="sim-card"
                infoName="Sim Reader 2"
                status={state.sim2Status}
              />
            )}

            {/* {state.wifi && (
              <Inforow
                family="FontAwesome5"
                iName="wifi"
                infoName="Wifi"
                status={state.wifiStatus}
              />
            )} */}

            {/* {loading && (
              <View style={[styles.infoWrp, {justifyContent: 'center'}]}>
                <View style={styles.txtwrp}>
                  <Text style={styles.title}>Testing ...</Text>
                </View>
              </View>
            )} */}
          </ScrollView>
        </View>
        <Button
          margin="0"
          disabled={loading}
          onPress={() => navigation.navigate("ManualTest", { data: state })}
        >
          <ButttonText>Manual Tests</ButttonText>
        </Button>
      </Toproundbox>
      {/* {modalshow && (
        <View style={styles.modal}>
          <TouchableOpacity onPress={closeHandler} style={styles.close}>
            <Image source={require('../../assets/images/cros.png')} />
          </TouchableOpacity>
          <CheckBox name="Display Issue" checked={manualState.displayIssue} />
          <CheckBox name="Glass Cracked" checked={manualState.glassCracked} />
          <CheckBox name="Scratched Body" checked={manualState.scratches} />
          <CheckBox name="Mic issue" checked={manualState.micIssue} />
          <CheckBox name="LoudSpeaker Issue" checked={manualState.soundIssue} />
        </View>
      )} */}

      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.tabbtn}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Icon name="dashboard" type="MaterialIcons" size={18} color="#ccc" />
          <Text style={[styles.tabtxt]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabbtn}>
          <Icon name="test-tube" type="Fontisto" size={24} color="#24CCB3" />
          <Text style={[styles.tabtxt, { color: "#24CCB3", fontSize: 16 }]}>
            TestMobile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  wrp: {
    backgroundColor: "#0071C1",
    flex: 1,
  },
  modal: {
    backgroundColor: "#fff",
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: 20,
  },
  close: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  audioModal: {
    backgroundColor: "#fff",
    position: "absolute",
    width: 200,
    height: 100,
    padding: 10,
    borderRadius: 20,
    elevation: 15,
    left: "23%",
    top: "42%",
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
  title: {
    color: "#01131A",
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    textAlign: "center",
    marginBottom: -2,
  },
  txtwrp: { flexDirection: "row", alignItems: "center" },
  tab: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    elevation: 2,
    marginTop: 0,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    position: "absolute",
    bottom: -4,
    left: 0,
    zIndex: 99999,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 2,
  },
  tabbtn: { width: "50%", justifyContent: "center", alignItems: "center" },
  tabtxt: { fontFamily: "Poppins-SemiBold", fontSize: 14 },
});
