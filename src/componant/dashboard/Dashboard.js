import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  View,
  NativeModules,
  DeviceEventEmitter,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Toproundbox, Toptxt } from "../../StyledComponent/wrapper/Styles";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CircularProgress from "react-native-circular-progress-indicator";
import useDashboard from "./useDashboard";
import Imei from "../../screen/Imei";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
const Dashboard = ({ navigation }) => {
  const { state, onChangeImei, onSubmitImei, imei, modalVisible } =
    useDashboard();
  console.log("ramdsdsd", state?.totalMemory);
  useEffect(() => {
    // const backAction = () => {
    //   Alert.alert("Exiting App!", "Are you sure you want to exit the app?", [
    //     {
    //       text: "Cancel",
    //       onPress: () => null,
    //       style: "cancel",
    //     },
    //     { text: "YES", onPress: () => BackHandler.exitApp() },
    //   ]);
    //   return true;
    // };
    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );
    // return () => backHandler.remove();
  });
  return (
    <View style={styles.wrp}>
      <Modal
        style={{ flex: 1 }}
        visible={modalVisible}
        // onRequestClose={() => {
        //   setModalVisible(!modalVisible);
        // }}
      >
        <Imei
          onChangeImei={onChangeImei}
          onSubmitImei={onSubmitImei}
          imei={imei}
        />
      </Modal>
      {/* <Modal
        style={{ flex: 1 }}
        visible={showModal()}
        onRequestClose={() => {
          //  setModalVisible(!modalVisible);
        }}
      >
        <Imei
          imei={imei}
          onChangeImei={onChangeImei}
          onSubmitImei={onSubmitImei}
        />
      </Modal> */}
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
      <Toproundbox style={{ height: "95%", marginBottom: 5 }}>
        <View style={{ height: "84%" }}>
          <ScrollView>
            <View style={[styles.cardbox, { backgroundColor: "#fff" }]}>
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  paddingBottom: 10,
                  marginBottom: 8,
                  borderBottomColor: "#00000050",
                  borderBottomWidth: 1,
                }}
              >
                <MaterialCommunityIcons
                  name="cellphone"
                  size={20}
                  color="#000"
                />
                <Text style={styles.title}>About Phone</Text>
              </View>
              <View style={styles.coreWrp}>
                <Text style={styles.coretxt}>
                  Brand:{" "}
                  <Text style={{ fontFamily: "Poppins-Bold" }}>
                    {state.deviceBrand}
                  </Text>
                </Text>
                <Text style={styles.coretxt}>
                  Model:{" "}
                  <Text style={{ fontFamily: "Poppins-Bold" }}>
                    {state.deviceModel}
                  </Text>
                </Text>
              </View>
              <View style={styles.coreWrp}>
                <Text style={styles.coretxt}>
                  Name:{" "}
                  <Text style={{ fontFamily: "Poppins-Bold" }}>
                    {state.deviceName}
                  </Text>
                </Text>
                <Text style={styles.coretxt}>
                  IMEI:{" "}
                  <Text style={{ fontFamily: "Poppins-Bold" }}>{imei}</Text>
                </Text>
              </View>
            </View>
            <View style={[styles.cardbox, { backgroundColor: "#fff" }]}>
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  paddingBottom: 10,
                  marginBottom: 8,
                  borderBottomColor: "#00000050",
                  borderBottomWidth: 1,
                }}
              >
                <Feather name="battery-charging" size={20} color="#000" />
                <Text style={styles.title}>Battery Status</Text>
              </View>
              <View style={styles.coreWrp}>
                <Text style={styles.coretxt}>
                  Battery Level:{" "}
                  <Text style={{ fontFamily: "Poppins-Bold" }}>
                    {state.batteryLevel}
                  </Text>
                </Text>
                <Text style={styles.coretxt}>
                  Battery Status:{" "}
                  <Text style={{ fontFamily: "Poppins-Bold" }}>
                    {state.isCharging ? "Charging" : "Not Charging"}
                  </Text>
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.cardbox,
                {
                  backgroundColor: "#23CDB2",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                },
              ]}
            >
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  paddingBottom: 10,
                  marginBottom: 8,
                  borderBottomColor: "#ffffff90",
                  borderBottomWidth: 1,
                  width: "100%",
                }}
              >
                <Feather name="cpu" size={20} style={{ color: "#fff" }} />
                <Text style={[styles.title, { color: "#fff" }]}>
                  Ram Status
                </Text>
              </View>

              <View
                style={[
                  styles.inerAlign,
                  {
                    height: 40,
                    flexDirection: "column",
                    alignItems: "flex-start",
                  },
                ]}
              >
                <Text style={styles.txt}>
                  Total Memory - {state.totalMemory}
                </Text>
                <Text style={styles.txt}>
                  Memory in Use - {state.usedMemory}
                </Text>
              </View>
              <View style={styles.inerAlign}>
                <CircularProgress
                  value={state?.ramUsage || 0}
                  radius={30}
                  duration={2000}
                  progressValueColor={"#ecf0f1"}
                  maxValue={100}
                  activeStrokeColor={"#fff"}
                  inActiveStrokeColor={"#ecf0f1"}
                  inActiveStrokeOpacity={0.4}
                  inActiveStrokeWidth={10}
                  activeStrokeWidth={10}
                  valueSuffix={"%"}
                />
              </View>
            </View>

            <View
              style={[
                styles.cardbox,
                {
                  backgroundColor: "#23CDB2",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                },
              ]}
            >
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  paddingBottom: 10,
                  marginBottom: 8,
                  borderBottomColor: "#ffffff90",
                  borderBottomWidth: 1,
                  width: "100%",
                }}
              >
                <MaterialIcons
                  name="sd-storage"
                  size={20}
                  style={{ color: "#fff" }}
                />
                <Text style={[styles.title, { color: "#fff" }]}>
                  Internal Storage Status
                </Text>
              </View>

              <View
                style={[
                  styles.inerAlign,
                  {
                    height: 40,
                    flexDirection: "column",
                    alignItems: "flex-start",
                  },
                ]}
              >
                <Text style={styles.txt}>
                  Available Space - {state.availableInternalStorage}
                </Text>
                <Text style={styles.txt}>
                  Total Space - {state.totalInternalStorage}
                </Text>
              </View>
              <View style={styles.inerAlign}>
                <CircularProgress
                  value={state.internalStorageUsage}
                  radius={30}
                  duration={2000}
                  progressValueColor={"#ecf0f1"}
                  maxValue={100}
                  activeStrokeColor={"#fff"}
                  inActiveStrokeColor={"#ecf0f1"}
                  inActiveStrokeOpacity={0.4}
                  inActiveStrokeWidth={10}
                  activeStrokeWidth={10}
                  valueSuffix={"%"}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        {/* <View
          style={[
            styles.cardbox,
            {
              backgroundColor: '#23CDB2',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            },
          ]}>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              paddingBottom: 10,
              marginBottom: 8,
              borderBottomColor: '#ffffff90',
              borderBottomWidth: 1,
              width: '100%',
            }}>
            <MaterialIcons
              name="sd-storage"
              size={20}
              style={{color: '#fff'}}
            />
            <Text style={[styles.title, {color: '#fff'}]}>
              External Storage Status
            </Text>
          </View>

          <View
            style={[
              styles.inerAlign,
              {height: 40, flexDirection: 'column', alignItems: 'flex-start'},
            ]}>
            <Text style={styles.txt}>
              Available Space - {state.availableExternalStorage}
            </Text>
            <Text style={styles.txt}>
              Total Space - {state.totalExternalStorage}
            </Text>
          </View>
          <View style={styles.inerAlign}>
            <CircularProgress
              value={state.externalStorageUsage}
              radius={30}
              duration={2000}
              progressValueColor={'#ecf0f1'}
              maxValue={100}
              activeStrokeColor={'#fff'}
              inActiveStrokeColor={'#ecf0f1'}
              inActiveStrokeOpacity={0.4}
              inActiveStrokeWidth={10}
              activeStrokeWidth={10}
              valueSuffix={'%'}
            />
          </View>
        </View> */}

        {/* <TouchableOpacity onPress={() => navigation.navigate('List')}> */}
        {/* <View style={styles.complateStatus}>
          <Image source={require('../../assets/images/whiteround.png')} />
          <Text style={styles.bigText}>0/14 Test Completed</Text>
          <Text style={styles.smallText}>Your device is not healthy.</Text>
        </View> */}
        {/* </TouchableOpacity> */}
      </Toproundbox>
      <View style={styles.tab}>
        <TouchableOpacity
          style={[styles.tabbtn, { borderLeftWidth: 1, borderColor: "#ccc" }]}
        >
          {/* <MaterialIcons name="dashboard" size="18" color="#ccc" /> */}
          <MaterialIcons name="dashboard" size={24} color="#24CCB3" />
          <Text style={[styles.tabtxt, { color: "#24CCB3", fontSize: 15 }]}>
            Dashboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabbtn}
          onPress={() =>
            navigation.navigate("Testmobile", {
              deviceBrand: state?.deviceBrand,
              deviceModel: state?.deviceModel,
              deviceName: state?.deviceName,
              imei,
            })
          }
        >
          <Icon name="test-tube" type="Fontisto" size={18} color="#ccc" />
          <Text style={styles.tabtxt}>TestMobile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  wrp: {
    backgroundColor: "#0071C1",
  },
  cardbox: {
    borderRadius: 9,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: "#000000",
    elevation: 10,
    //ios specific
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    marginBottom: 18,
    marginHorizontal: 6,
  },
  inerAlign: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txt: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  sml: {
    fontSize: 10,
    textAlign: "right",
  },
  txtBorder: {
    borderTopColor: "#fff",
    borderTopWidth: 1,
    textAlign: "right",
    marginTop: 7,
    paddingTop: 10,
  },
  coreWrp: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    color: "#01131A",
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    textTransform: "uppercase",
    textAlign: "center",
    paddingLeft: 5,
  },
  coretxt: {
    paddingVertical: 2,
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    paddingHorizontal: 5,
    color: "#01131A",
  },
  complateStatus: {
    width: "70%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "8%",
    marginBottom: "8%",
  },
  bigText: {
    fontFamily: "Poppins-Bold",
    fontSize: 21,
    color: "#01131A",
    marginTop: 10,
  },
  smallText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#01131A",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  circles: {
    flexDirection: "row",
    alignItems: "center",
  },
  progress: {
    margin: 10,
  },
  tab: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    elevation: 2,
    marginTop: 0,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    position: "absolute",
    bottom: 0,
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
