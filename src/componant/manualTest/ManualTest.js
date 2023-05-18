import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  ScrollView,
  Text,
  BackHandler,
} from "react-native";
import { Toproundbox, Toptxt } from "../../StyledComponent/wrapper/Styles";
import { Button, ButttonText } from "../../StyledComponent/Button";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useManualTest from "./useManualTest";
import ManualBlock from "./ManualBlock";
const ManualTest = ({ navigation, route }) => {
  const { data } = route.params;

  // console.log("touchScreen", data.touchScreen);
  const {
    handleCamera,
    handleDisplay,
    handleBluetooth,
    handleFlash,
    handleVibration,
    handleMic,
    handleSpeaker,
    handleFingerPrint,
    handlePhysical,
    handleReciever,
    handleSubmit,
    handleDevice,
    hendleEarPhone,
    handleWifi,
    handleNetwork,
    handleTouchScreen,
    handleRotaion,
  } = useManualTest(navigation, data);
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
        {/* back button required */}
        <Toptxt>
          <Image source={require("../../assets/images/logo.png")} />
        </Toptxt>
      </View>
      <Toproundbox>
        <View style={{ height: "82%" }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={[
                styles.infoWrpTitle,
                { justifyContent: "center", marginTop: -10 },
              ]}
            >
              <View style={styles.txtwrp}>
                <Text style={styles.title}>Manual Tests</Text>
              </View>
            </View>
            <ManualBlock
              icon={<AntDesign name="reload1" size={20} color="#01131A" />}
              title={"Rotation"}
              onPress={handleRotaion}
              isOk={data?.rotationState?.ok}
              showIcon={data?.rotationState === undefined ? false : true}
            />
            <ManualBlock
              icon={<Entypo name="flashlight" size={20} color="#01131A" />}
              title="Flash"
              onPress={handleFlash}
              isOk={data?.flashState}
              showIcon={data?.flashState === undefined ? false : true}
            />
            <ManualBlock
              title="Pixel Test"
              icon={
                <MaterialIcons name="phone-android" size={20} color="#01131A" />
              }
              onPress={handleDisplay}
              isOk={data?.displayState?.ok}
              showIcon={data?.displayState}
            />
            <ManualBlock
              title="Touch Screen"
              icon={
                <MaterialIcons name="phone-android" size={20} color="#01131A" />
              }
              onPress={handleTouchScreen}
              isOk={data?.touchScreen?.touchok}
              showIcon={data?.touchScreen}
            />
            <ManualBlock
              title="Bluetooth"
              icon={
                <MaterialIcons name="bluetooth" size={20} color="#01131A" />
              }
              onPress={handleBluetooth}
              isOk={data?.bluetooth}
              showIcon={data?.bluetooth === undefined ? false : true}
            />
            <ManualBlock
              title="Wifi"
              icon={<MaterialIcons name="wifi" size={20} color="#01131A" />}
              onPress={handleWifi}
              isOk={data?.wifi}
              showIcon={data?.wifi === undefined ? false : true}
            />
            <ManualBlock
              title="Network Connectivity"
              icon={
                <MaterialIcons
                  name="signal-cellular-4-bar"
                  size={20}
                  color="#01131A"
                />
              }
              onPress={handleNetwork}
              isOk={data?.network}
              showIcon={data?.network === undefined ? false : true}
            />
            <ManualBlock
              title="FingerPrint"
              icon={
                <FontAwesome5 name="fingerprint" size={20} color="#01131A" />
              }
              onPress={handleFingerPrint}
              isOk={data?.fingerprintState?.ok}
              showIcon={data?.fingerprintState}
            />
            <ManualBlock
              icon={<FontAwesome name="microphone" size={20} color="#01131A" />}
              title="Microphone"
              onPress={handleMic}
              isOk={data?.micState?.ok}
              showIcon={data?.micState}
            />
            <ManualBlock
              icon={
                <MaterialIcons name="phone-android" size={20} color="#01131A" />
              }
              title="Physical Buttons"
              onPress={handlePhysical}
              isOk={data?.physicalState?.ok}
              showIcon={data?.physicalState}
            />
            <ManualBlock
              icon={<MaterialIcons name="hearing" size={20} color="#01131A" />}
              title="Reciever"
              onPress={handleReciever}
              isOk={data?.receiverState?.ok}
              showIcon={data?.receiverState}
            />
            <ManualBlock
              icon={
                <MaterialCommunityIcons
                  name="speaker-wireless"
                  size={20}
                  color="#01131A"
                />
              }
              title="Speaker"
              onPress={handleSpeaker}
              isOk={data?.speakerState?.ok}
              showIcon={data?.speakerState}
            />
            <ManualBlock
              icon={<MaterialIcons name="camera" size={20} color="#01131A" />}
              title="Camera"
              onPress={handleCamera}
              isOk={data?.cameraState?.ok}
              showIcon={data?.cameraState}
            />
            <ManualBlock
              title="Vibration"
              icon={
                <MaterialIcons name="vibration" size={20} color="#01131A" />
              }
              onPress={handleVibration}
              isOk={data?.vibrationState}
              showIcon={data?.vibrationState === undefined ? false : true}
            />
            <ManualBlock
              title="Physical Condition"
              icon={
                <MaterialIcons
                  name="perm-device-information"
                  size={20}
                  color="#01131A"
                />
              }
              onPress={handleDevice}
              isOk={data?.deviceBody?.ok}
              showIcon={data?.deviceBody}
            />
            <ManualBlock
              title="Ear Phone Jack"
              icon={
                <MaterialCommunityIcons
                  name="headphones"
                  size={20}
                  color="#01131A"
                />
              }
              onPress={hendleEarPhone}
              isOk={data?.headphoneJack?.ok}
              showIcon={data?.headphoneJack}
            />
          </ScrollView>
        </View>
        <Button margin="0" onPress={handleSubmit}>
          <ButttonText>Save Information</ButttonText>
        </Button>
      </Toproundbox>
    </View>
  );
};

const styles = StyleSheet.create({
  wrp: {
    backgroundColor: "#0071C1",
    flex: 1,
  },
  modal: {
    backgroundColor: "#fff",

    width: "100%",
    marginBottom: 20,
  },
  close: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  audioModal: {
    backgroundColor: "#fff",

    width: "100%",
    height: 100,
    padding: 10,
    borderRadius: 5,
    elevation: 15,
  },
  infoWrpTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderBottomColor: '#01131A',
    // borderBottomWidth: 0.5,
    paddingVertical: 10,
    marginHorizontal: -16,
    paddingHorizontal: 20,
  },
  infoWrp: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderBottomColor: '#01131A',
    // borderBottomWidth: 0.5,
    paddingVertical: 10,
    marginHorizontal: 4,
    paddingHorizontal: 20,
    elevation: 10,
    borderRadius: 20,
    marginVertical: 7,
    backgroundColor: "#fff",
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
});

export default ManualTest;
