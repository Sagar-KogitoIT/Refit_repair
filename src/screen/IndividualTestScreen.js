import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  BackHandler,
  ScrollView,
} from "react-native";
import { Camera } from "react-native-vision-camera";
import CameraIcon from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-dynamic-vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Toproundbox, Toptxt } from "../StyledComponent/wrapper/Styles";
import { Button, ButttonText } from "../StyledComponent/Button";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useIndividualTest from "./useIndividualTest";
import CheckBox from "../componant/CheckBox";
import DispTest from "../componant/DispTest";
import DispBlnktst from "../componant/DispBlnktst";
import DispCross from "../componant/DispCross";
// import Draw from "./Draw";
// import { ScrollView } from "react-native-gesture-handler";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Orientation from "react-native-orientation";

import Pattern from "./Pattern";
// import AudioPlayer from '../componant/AudioPlayer';
const IndividualTestScreen = ({ navigation, route }) => {
  const { type, data } = route.params;
  const camera = useRef(null);
  const {
    device,
    handleStart,
    handleStop,
    takePicture,
    flipCamera,
    vibration,
    handleSubmit,
    picture,
    turnFlashOn,
    turnFlashOff,
    handleVibrationCheck,
    rotationState,
    handleRotationCheck,
    cameraState,
    handleCameraCheck,
    displayModal,
    handleModalClose,
    handleModalCancel,
    handleDisplayCheck,
    displayState,
    flashState,
    handleFlashCheck,
    micState,
    handleMicCheck,
    speakerState,
    handleSpeakerCheck,
    handlePhysicalCheck,
    physicalState,
    onStartRecord,
    onStopRecord,
    onStartPlay,
    onStopPlay,
    recordTime,
    playTime,
    fingerprintState,
    handleFingerprintCheck,
    bluetooth,
    wifi,
    handleWifi,
    handleBluetooth,
    network,
    deviceBody,
    handleNatwork,
    handleDeviceBodyCheck,
    earPhoneState,
    handleEarPhone,
    touchState,
    handleTouchScreen,
  } = useIndividualTest(navigation, camera, type, data);
  const [displyScreen, setDisplyScreen] = useState(false);
  const [count, setCount] = useState(0);
  const [bgColor, setBgColor] = useState("");
  const [dispTouch, setDispTouch] = useState(false);
  const [dispRorate, setDispRotate] = useState(false);

  const handleClose = () => {
    setCount(0);
    setDisplyScreen(false);
  };
  useEffect(() => {
    if (type === "rotation") {
      setDispRotate(true);
    }
  }, []);
  useEffect(() => {
    if (count === 3) {
      handleClose();
    } else {
      if (count === 0) {
        setBgColor("red");
      } else if (count === 1) {
        setBgColor("green");
      } else if (count === 2) {
        setBgColor("blue");
      }
      // ?
      // :
      // ?
      // :
    }
  }, [count]);

  const screenClose = () => {
    setDispTouch(false);
  };

  const onRotate = () => {
    Orientation.lockToLandscapeLeft();
  };

  const closeRotate = () => {
    Orientation.lockToPortrait();
    setDispRotate(false);
  };

  const screenOpen = () => {
    setDispTouch(true);
  };
  return (
    <View style={styles.wrp}>
      <Modal visible={dispTouch}>
        <View
          style={{
            backgroundColor: "#fff",
            flex: 1,
          }}
        >
          {/* <Draw /> */}
          <Pattern />
        </View>
        <Button margin="0" style={styles.bttnOvrlap} onPress={screenClose}>
          <ButttonText style={styles.txt}>Close</ButttonText>
        </Button>
      </Modal>

      <Modal visible={dispRorate}>
        <View
          style={{
            backgroundColor: "#fff",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button margin="0" style={styles.bttnOvrlap} onPress={onRotate}>
            <ButttonText style={styles.txt}>Rotate</ButttonText>
          </Button>
          <Button
            margin="0"
            style={[styles.bttnOvrlap, { marginTop: 10 }]}
            onPress={closeRotate}
          >
            <ButttonText style={styles.txt}>Close</ButttonText>
          </Button>
        </View>
      </Modal>

      <Modal visible={displyScreen}>
        <TouchableOpacity
          onPress={() => setCount(count + 1)}
          style={{
            backgroundColor: `${bgColor}`,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Toptxt style={{ fontSize: 18 }}>Please Tap on Screen Again</Toptxt>
        </TouchableOpacity>
      </Modal>

      <Modal visible={displayModal}>
        <View style={styles.modal}>
          <View style={styles.imgbox}>
            {picture && (
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{ uri: `file://${picture}` }}
              />
            )}
          </View>
          <View style={styles.buttonwrp}>
            <Button margin="0" style={styles.bttn} onPress={handleModalCancel}>
              <ButttonText style={styles.txt}>cancel</ButttonText>
            </Button>
            <Button margin="0" style={styles.bttn} onPress={handleModalClose}>
              <ButttonText style={styles.txt}>confirm</ButttonText>
            </Button>
          </View>
        </View>
      </Modal>

      <StatusBar animated={true} backgroundColor="#2C509E" />

      <View style={{ borderTopColor: "#fff", borderTopWidth: 1, marginTop: 6 }}>
        {/* back button required */}
        <Toptxt>
          <Image source={require("../assets/images/logo.png")} />
        </Toptxt>
      </View>
      <Toproundbox>
        {/* HEADER TITLE SECTION */}
        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "5%",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 20,
              color: "#01131A",
              textTransform: "capitalize",
            }}
          >
            {type}
          </Text>
        </View>

        {/* TOP SECTION */}

        {type === "camera" && (
          <View style={{ height: "78%" }}>
            <ScrollView
              style={{ flex: 1 }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {type === "camera" ? (
                device == null ? (
                  // LOADING VIEW
                  <View style={styles.cambox}>
                    <View
                      style={{ borderRadius: 10, overflow: "hidden", flex: 1 }}
                    >
                      <View
                        style={{
                          borderRadius: 10,
                          overflow: "hidden",
                          flex: 1,
                          justifyContent: "center",
                        }}
                      >
                        <ActivityIndicator size="large" color="#23CDB2" />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={styles.cambox}>
                    <View
                      style={{ borderRadius: 10, overflow: "hidden", flex: 1 }}
                    >
                      <Camera
                        ref={camera}
                        style={{ flex: 1 }}
                        device={device}
                        isActive={true}
                        photo={true}
                      />
                    </View>
                    <View style={styles.camera}>
                      <TouchableOpacity
                        //  onPaste={onPaste}
                        onPress={takePicture}
                        style={styles.capture}
                      >
                        <CameraIcon name="camera" size={30} color="#fff" />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={flipCamera}
                      style={styles.fontcam}
                    >
                      <Image source={require("../assets/images/font.png")} />
                    </TouchableOpacity>
                  </View>
                )
              ) : null}

              {type === "camera" && (
                <>
                  <CheckBox
                    infoName="Camera Working Fine"
                    checked={cameraState.ok}
                    onPress={() => handleCameraCheck("fine")}
                    iName="mobile"
                    family=""
                  />
                  <CheckBox
                    infoName="Camera Blur"
                    checked={cameraState.blur}
                    onPress={() => handleCameraCheck("blur")}
                    iName="mobile"
                    family=""
                  />
                  <CheckBox
                    infoName="Camera Dots"
                    checked={cameraState.dots}
                    onPress={() => handleCameraCheck("dots")}
                    iName="mobile"
                    family=""
                  />
                  <CheckBox
                    infoName="Camera not working"
                    checked={!cameraState.ok}
                    onPress={() => handleCameraCheck("fine")}
                    iName="mobile"
                    family=""
                  />
                  {/* <Button
                  margin="0"
                  onPress={handleSubmit}
                  style={{
                    marginTop: 10,
                    height: 40,
                    // position: 'absolute',
                    // bottom: 10,
                  }}
                >
                  <ButttonText>Submit Information</ButttonText>
                </Button> */}
                </>
              )}
            </ScrollView>
          </View>
        )}

        {type !== "camera" && (
          <View style={{ height: "78%" }}>
            <View style={[styles.cambox, { height: "100%" }]}>
              <ScrollView
                contentContainerStyle={{ flex: 1 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <View>
                  {/* CHECKBOX SECTION */}

                  {type === "rotation" && (
                    <View>
                      <CheckBox
                        infoName="Rotation Working Fine"
                        checked={rotationState.ok}
                        onPress={() => handleRotationCheck()}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Rotation not working"
                        checked={!rotationState.ok}
                        onPress={() => handleRotationCheck()}
                        iName="mobile"
                        family=""
                      />
                    </View>
                  )}

                  {type === "touch screen" && (
                    <>
                      <View style={styles.rundbox}>
                        <View style={styles.roundicon}>
                          <Icon
                            name="settings-display"
                            type="MaterialIcons"
                            size={60}
                            color="#01131A"
                          />
                        </View>
                      </View>
                      {/* <Button
                      margin="0"
                      onPress={() => setDisplyScreen(true)}
                      style={{
                        marginTop: 10,
                        height: 40,
                        // position: 'absolute',
                        // bottom: 10,
                      }}
                    >
                      <ButttonText>check Screen</ButttonText>
                    </Button> */}
                      <Button
                        margin="0"
                        onPress={screenOpen}
                        style={{
                          marginTop: 10,
                          height: 40,
                          // position: 'absolute',
                          // bottom: 10,
                        }}
                      >
                        <ButttonText>check Touch Screen</ButttonText>
                      </Button>
                      {/* <TouchableOpacity onPress={() => setDisplyScreen(true)}> */}

                      <CheckBox
                        infoName="Touch Working Fine"
                        checked={touchState.touchok}
                        onPress={() => handleTouchScreen("fine")}
                        iName="mobile"
                        family=""
                      />

                      {/* <CheckBox
                      infoName="Dots"
                      checked={displayState.dots}
                      onPress={() => handleDisplayCheck("dots")}
                      iName="mobile"
                      family=""
                    /> */}

                      {/* <CheckBox
                      infoName="Display Lines"
                      checked={displayState.displayLines}
                      onPress={() => handleDisplayCheck("lines")}
                      iName="mobile"
                      family=""
                    /> */}

                      {/* <CheckBox
                      infoName="Screen Damage"
                      checked={displayState.screenDamage}
                      onPress={() => handleDisplayCheck("screen")}
                      iName="mobile"
                      family=""
                    /> */}

                      {/* <CheckBox
                      infoName="Pixel Damage"
                      checked={displayState.pixelDamage}
                      onPress={() => handleDisplayCheck("pixel")}
                      iName="mobile"
                      family=""
                    /> */}

                      {/* <CheckBox
                      infoName="Shadow Image"
                      checked={displayState.shadowImage}
                      onPress={() => handleDisplayCheck("shadow")}
                      iName="mobile"
                      family=""
                    /> */}

                      <CheckBox
                        infoName="Touch Issue"
                        checked={touchState.touchIssue}
                        onPress={() => handleTouchScreen("touch")}
                        iName="mobile"
                        family=""
                      />
                    </>
                  )}
                  {type === "display" && (
                    <>
                      <View style={styles.rundbox}>
                        <View style={styles.roundicon}>
                          <Icon
                            name="settings-display"
                            type="MaterialIcons"
                            size={60}
                            color="#01131A"
                          />
                        </View>
                      </View>

                      <Button
                        margin="0"
                        onPress={() => setDisplyScreen(true)}
                        style={{
                          marginTop: 10,
                          height: 40,
                          // position: 'absolute',
                          // bottom: 10,
                        }}
                      >
                        <ButttonText>check Screen</ButttonText>
                      </Button>
                      {/* <Button
                      margin="0"
                      onPress={screenOpen}
                      style={{
                        marginTop: 10,
                        height: 40,
                      
                      }}
                    >
                      <ButttonText>check Touch Screen</ButttonText>
                    </Button> */}
                      {/* <TouchableOpacity onPress={() => setDisplyScreen(true)}> */}

                      <CheckBox
                        infoName="Pixel Working Fine"
                        checked={displayState.ok}
                        onPress={() => handleDisplayCheck("fine")}
                        iName="mobile"
                        family=""
                      />

                      <CheckBox
                        infoName="Dots"
                        checked={displayState.dots}
                        onPress={() => handleDisplayCheck("dots")}
                        iName="mobile"
                        family=""
                      />

                      <CheckBox
                        infoName="Display Lines"
                        checked={displayState.displayLines}
                        onPress={() => handleDisplayCheck("lines")}
                        iName="mobile"
                        family=""
                      />

                      <CheckBox
                        infoName="Screen Damage"
                        checked={displayState.screenDamage}
                        onPress={() => handleDisplayCheck("screen")}
                        iName="mobile"
                        family=""
                      />

                      <CheckBox
                        infoName="Pixel Damage"
                        checked={displayState.pixelDamage}
                        onPress={() => handleDisplayCheck("pixel")}
                        iName="mobile"
                        family=""
                      />

                      <CheckBox
                        infoName="Shadow Image"
                        checked={displayState.shadowImage}
                        onPress={() => handleDisplayCheck("shadow")}
                        iName="mobile"
                        family=""
                      />

                      {/* <CheckBox
                      infoName="Touch Issue"
                      checked={displayState.touchIssue}
                      onPress={() => handleDisplayCheck("touch")}
                      iName="mobile"
                      family=""
                    /> */}
                    </>
                  )}

                  {type === "fingerprint" && (
                    <>
                      <View style={styles.rundbox}>
                        <View style={styles.roundicon}>
                          <FontAwesome5
                            name="fingerprint"
                            size={60}
                            color="#01131A"
                          />
                        </View>
                      </View>
                      <View style={styles.btnprt}>
                        <View style={styles.btnprtsnd}>
                          <TouchableOpacity
                            style={styles.tuchbtn}
                            onPress={handleStart}
                          >
                            <Image
                              source={require("../assets/images/play.png")}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <CheckBox
                        infoName="Fingerprint Working Fine"
                        checked={fingerprintState?.ok}
                        onPress={() => handleFingerprintCheck("fine")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Fingerprint Issue"
                        checked={fingerprintState?.notPresent}
                        onPress={() => handleFingerprintCheck("issue")}
                        iName="mobile"
                        family=""
                      />
                    </>
                  )}

                  {type === "flash" && (
                    <>
                      <View style={styles.rundbox}>
                        <View style={styles.roundicon}>
                          <Icon
                            name="flashlight"
                            type="Entypo"
                            size={60}
                            color="#01131A"
                          />
                        </View>
                      </View>
                      <View style={styles.btnprt}>
                        <View style={styles.btnprtsnd}>
                          <TouchableOpacity
                            style={styles.tuchbtn}
                            onPress={handleStart}
                          >
                            <Image
                              source={require("../assets/images/play.png")}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.tuchbtn}
                            onPress={handleStop}
                          >
                            <Image
                              source={require("../assets/images/stop.png")}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <CheckBox
                        infoName="Flash Working Fine"
                        checked={flashState}
                        onPress={() => handleFlashCheck("fine")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Flash Issue"
                        checked={!flashState}
                        onPress={() => handleFlashCheck("issue")}
                        iName="mobile"
                        family=""
                      />
                    </>
                  )}

                  {type === "microphone" && (
                    <>
                      <View style={styles.rundbox}>
                        <View style={styles.roundicon}>
                          <Icon
                            name="microphone"
                            type="FontAwesome"
                            size={60}
                            color="#01131A"
                          />
                        </View>
                      </View>
                      <View style={styles.btnprt}>
                        <Image
                          source={require("../assets/images/sound.png")}
                          style={{
                            width: "60%",
                            height: "25%",
                            marginBottom: "2%",
                          }}
                        />
                        <View style={styles.viewRecorder}>
                          <View style={styles.recordBtnWrapper}>
                            <TouchableOpacity
                              style={styles.btn}
                              onPress={onStartRecord}
                            >
                              <Icon
                                name="recording-sharp"
                                type="Ionicons"
                                size={20}
                                color="#fff"
                              />
                              <Text style={styles.txtsml}> Record</Text>
                            </TouchableOpacity>
                            <Text
                              style={{
                                color: "#000",
                                paddingHorizontal: 5,
                                width: 150,
                                textAlign: "center",
                              }}
                            >
                              {recordTime}
                            </Text>
                            <TouchableOpacity
                              style={[styles.btn, { marginLeft: 12 }]}
                              onPress={onStopRecord}
                            >
                              <Icon
                                name="stop-circle"
                                type="Feather"
                                size={20}
                                color="#fff"
                              />
                              <Text style={styles.txtsml}> Stop</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={styles.viewPlayer}>
                          <Text style={{ color: "#000" }}>{playTime}</Text>
                        </View>
                        <View style={styles.recordBtnWrapper}>
                          <TouchableOpacity
                            style={styles.btn}
                            onPress={onStartPlay}
                          >
                            <Icon
                              name="playcircleo"
                              type="AntDesign"
                              size={20}
                              color="#fff"
                            />
                            <Text style={styles.txtsml}> Play</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.btn, { marginLeft: 12 }]}
                            onPress={onStopPlay}
                          >
                            <Icon
                              name="stop-circle"
                              type="Feather"
                              size={20}
                              color="#fff"
                            />
                            <Text style={styles.txtsml}> Stop</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <CheckBox
                        infoName="Mic Working Fine"
                        checked={micState.ok}
                        onPress={() => handleMicCheck("fine")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Mic Noise Issue"
                        checked={micState.noise}
                        onPress={() => handleMicCheck("noise")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Mic Volume Issue"
                        checked={micState.volume}
                        onPress={() => handleMicCheck("volume")}
                        iName="mobile"
                        family=""
                      />
                    </>
                  )}

                  {type === "speaker" && (
                    <>
                      <View style={styles.rundbox}>
                        <View style={styles.roundicon}>
                          <Icon
                            name="speaker"
                            type="MaterialIcons"
                            size={60}
                            color="#fff"
                          />
                        </View>
                      </View>
                      <View style={styles.btnprt}>
                        <View style={styles.btnprtsnd}>
                          <View style={styles.recordBtnWrapper}>
                            <TouchableOpacity
                              style={styles.btn}
                              onPress={handleStart}
                            >
                              <Icon
                                name="playcircleo"
                                type="AntDesign"
                                size={20}
                                color="#fff"
                              />
                              <Text style={styles.txtsml}> Play</Text>
                            </TouchableOpacity>
                            <View
                              style={[
                                styles.viewPlayer,
                                { marginTop: -1, marginLeft: 8 },
                              ]}
                            >
                              <Text style={{ color: "#000" }}>{playTime}</Text>
                            </View>
                            <TouchableOpacity
                              style={[styles.btn, { marginLeft: 12 }]}
                              onPress={handleStop}
                            >
                              <Icon
                                name="stop-circle"
                                type="Feather"
                                size={20}
                                color="#fff"
                              />
                              <Text style={styles.txtsml}> Stop</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>

                      <CheckBox
                        infoName="Speaker Working Fine"
                        checked={speakerState.ok}
                        onPress={() => handleSpeakerCheck("fine")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Noise Issue"
                        checked={speakerState.noise}
                        onPress={() => handleSpeakerCheck("noise")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Volume Issue"
                        checked={speakerState.volume}
                        onPress={() => handleSpeakerCheck("volume")}
                        iName="mobile"
                        family=""
                      />
                    </>
                  )}

                  {type === "vibration" && (
                    <>
                      <View style={styles.rundbox}>
                        <View style={styles.roundicon}>
                          <Icon
                            name="vibration"
                            type="MaterialIcons"
                            size={60}
                            color="#fff"
                          />
                        </View>
                      </View>
                      <View style={styles.btnprt}>
                        <View style={styles.btnprtsnd}>
                          <TouchableOpacity
                            style={styles.tuchbtn}
                            onPress={handleStart}
                          >
                            <Image
                              source={require("../assets/images/play.png")}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.tuchbtn}
                            onPress={handleStop}
                          >
                            <Image
                              source={require("../assets/images/stop.png")}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <CheckBox
                        infoName="Vibration Working Fine"
                        checked={vibration}
                        onPress={() => handleVibrationCheck("fine")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Vibration Issue"
                        checked={!vibration}
                        onPress={() => handleVibrationCheck("issue")}
                        iName="mobile"
                        family=""
                      />
                    </>
                  )}
                  {type === "earphone" && (
                    <>
                      <View style={styles.rundbox}>
                        <View style={styles.roundicon}>
                          <MaterialCommunityIcons
                            name="headphones"
                            type="MaterialIcons"
                            size={60}
                            color="#fff"
                          />
                        </View>

                        <Text style={{ color: "black", marginTop: 20 }}>
                          Please plug into the 3.5mm jack.
                        </Text>
                      </View>

                      <CheckBox
                        infoName="Ear Phone Working"
                        checked={earPhoneState.ok}
                        onPress={() => handleEarPhone("working")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Ear Phone Not Working"
                        checked={earPhoneState.notworking}
                        onPress={() => handleEarPhone("notworking")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Ear Phone Not Present"
                        checked={earPhoneState.notPresent}
                        onPress={() => handleEarPhone("notpresent")}
                        iName="mobile"
                        family=""
                      />
                    </>
                  )}
                  {type === "wifi" && (
                    <>
                      <View style={styles.rundbox}>
                        <View style={styles.roundicon}>
                          <MaterialCommunityIcons
                            name="wifi"
                            type="MaterialIcons"
                            size={60}
                            color="#fff"
                          />
                        </View>
                      </View>
                      <CheckBox
                        infoName="Wifi Working"
                        checked={wifi}
                        onPress={() => handleWifi("working")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Wifi Not Working"
                        checked={!wifi}
                        onPress={() => handleWifi("notworking")}
                        iName="mobile"
                        family=""
                      />
                    </>
                  )}
                  {type === "bluetooth" && (
                    <>
                      <View style={styles.rundbox}>
                        <View style={styles.roundicon}>
                          <MaterialCommunityIcons
                            name="bluetooth"
                            type="MaterialIcons"
                            size={60}
                            color="#fff"
                          />
                        </View>
                      </View>
                      <CheckBox
                        infoName="Bluetooth Working"
                        checked={bluetooth}
                        onPress={() => handleBluetooth("working")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Bluetooth Not Working"
                        checked={!bluetooth}
                        onPress={() => handleBluetooth("notworking")}
                        iName="mobile"
                        family=""
                      />
                    </>
                  )}

                  {type === "network" && (
                    <>
                      <View style={styles.rundbox}>
                        <View style={styles.roundicon}>
                          <Icon
                            name="signal-cellular-4-bar"
                            type="MaterialIcons"
                            size={60}
                            color="#000"
                          />
                        </View>
                      </View>
                      <CheckBox
                        infoName="Network Working"
                        checked={network}
                        onPress={() => handleNatwork("working")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Network Not Working"
                        checked={!network}
                        onPress={() => handleNatwork("notworking")}
                        iName="mobile"
                        family=""
                      />
                    </>
                  )}

                  {type === "physical Buttons" && (
                    <>
                      <View style={styles.rundbox}>
                        <View style={styles.roundicon}>
                          <Icon
                            name="gesture-tap-button"
                            type="MaterialCommunityIcons"
                            size={60}
                            color="#fff"
                          />
                        </View>
                        <Text
                          style={{
                            color: "black",
                            marginTop: 20,
                            fontWeight: "bold",
                          }}
                        >
                          Please Check Power Button Before Overview Button
                        </Text>
                        {/* <Text style={{ color: "black", marginTop: 20 }}>
                        Please press the Volume Up And Volume Down Key
                      </Text> */}
                      </View>
                      <CheckBox
                        infoName="All Button Ok"
                        checked={physicalState.ok}
                        onPress={() => handlePhysicalCheck("fine")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Power Button"
                        checked={physicalState.power}
                        onPress={() => handlePhysicalCheck("power")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Volume Up Button"
                        checked={physicalState.volume_up}
                        onPress={() => handlePhysicalCheck("volume_up")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Volume Down Button"
                        checked={physicalState.volume_down}
                        onPress={() => handlePhysicalCheck("volume_down")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Physical Back Button"
                        checked={physicalState.back_button}
                        onPress={() => handlePhysicalCheck("back")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Physical Home Button"
                        checked={physicalState.home_button}
                        onPress={() => handlePhysicalCheck("home")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Physical Overview Button"
                        checked={physicalState.overview_button}
                        onPress={() => handlePhysicalCheck("overview")}
                        iName="mobile"
                        family=""
                      />
                    </>
                  )}
                  {type === "physical Condition" && (
                    <>
                      <View style={styles.rundbox}>
                        <View style={styles.roundicon}>
                          <MaterialIcons
                            name="perm-device-information"
                            type="MaterialIcons"
                            size={60}
                            color="#fff"
                          />
                        </View>
                      </View>
                      <CheckBox
                        infoName="Physical Condition Ok"
                        checked={deviceBody.ok}
                        onPress={() => handleDeviceBodyCheck("ok")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Hard Scratch On Screen"
                        checked={deviceBody.hard_screen}
                        onPress={() => handleDeviceBodyCheck("hard_screen")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Hard Scratch On Body"
                        checked={deviceBody.hard_body}
                        onPress={() => handleDeviceBodyCheck("hard_body")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Body Dent"
                        checked={deviceBody.body_dent}
                        onPress={() => handleDeviceBodyCheck("body_dent")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Body Part Missing"
                        checked={deviceBody.part_missing}
                        onPress={() => handleDeviceBodyCheck("part_missing")}
                        iName="mobile"
                        family=""
                      />
                    </>
                  )}
                  {type === "receiver" && (
                    <>
                      <View style={styles.rundbox}>
                        <View style={styles.roundicon}>
                          <Icon
                            name="hearing"
                            type="MaterialIcons"
                            size={60}
                            color="#fff"
                          />
                        </View>
                      </View>
                      <View style={styles.btnprt}>
                        <View style={styles.btnprtsnd}>
                          <TouchableOpacity
                            style={styles.tuchbtn}
                            onPress={handleStart}
                          >
                            <Image
                              source={require("../assets/images/play.png")}
                            />
                          </TouchableOpacity>
                          {/* <TouchableOpacity style={styles.tuchbtn}>
                        <Image source={require('../assets/images/puse.png')} />
                      </TouchableOpacity> */}
                          <TouchableOpacity
                            style={styles.tuchbtn}
                            onPress={handleStop}
                          >
                            <Image
                              source={require("../assets/images/stop.png")}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      {/* <CheckBox
                    infoName="Vibration Working Fine"
                    checked={vibration}
                    onPress={() => handleVibrationCheck('fine')}
                    iName="mobile"
                    family=""
                  />
                  <CheckBox
                    infoName="Vibration Issue"
                    checked={!vibration}
                    onPress={() => handleVibrationCheck('issue')}
                    iName="mobile"
                    family=""
                  /> */}
                      <CheckBox
                        infoName="Receiver Working Fine"
                        checked={vibration}
                        onPress={() => handleVibrationCheck("fine")}
                        iName="mobile"
                        family=""
                      />
                      <CheckBox
                        infoName="Receiver Issue"
                        checked={!vibration}
                        onPress={() => handleVibrationCheck("issue")}
                        iName="mobile"
                        family=""
                      />
                    </>
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        )}

        <Button
          margin="0"
          onPress={handleSubmit}
          style={{
            marginTop: 10,
            height: 40,
            // position: 'absolute',
            // bottom: 10,
          }}
        >
          <ButttonText>Submit Information</ButttonText>
        </Button>
        {/* Button Section */}
        <View
          style={{
            flexDirection: "row",
            columnGap: 2,
            justifyContent: "space-between",
            display: "none",
          }}
        >
          <Button
            margin="0"
            onPress={handleStart}
            style={{ width: "25%", borderRadius: 5 }}
          >
            <ButttonText>Start</ButttonText>
          </Button>

          <Button
            margin="0"
            onPress={handleStop}
            style={{ width: "25%", borderRadius: 5 }}
          >
            <ButttonText>stop</ButttonText>
          </Button>
        </View>
      </Toproundbox>
    </View>
  );
};

const styles = StyleSheet.create({
  wrp: {
    backgroundColor: "#2C509E",
    flex: 1,
  },
  camera: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: -19,
    left: "45%",
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 5,
  },
  cambox: {
    height: 350,
    marginHorizontal: 15,
    marginBottom: 40,
  },
  capture: {
    backgroundColor: "#000",
    borderRadius: 30,
    margin: 5,
  },
  modal: {
    backgroundColor: "#000000",
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    zIndex: 99,
  },
  imgbox: {
    height: "60%",
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 12,
    marginTop: 40,
  },
  buttonwrp: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 20,
  },
  bttn: {
    width: "40%",
    height: 40,
  },
  bttnOvrlap: {
    width: "40%",
    height: 40,
  },
  txt: { fontSize: 12, letterSpacing: 0 },
  roundicon: {
    width: 115,
    height: 115,
    backgroundColor: "#D9D9D9",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  rundbox: { justifyContent: "center", alignItems: "center", height: 200 },
  btnprt: { alignItems: "center", height: 150 },
  btnprtsnd: { justifyContent: "center", flexDirection: "row" },
  viewRecorder: {
    width: "100%",
    alignItems: "center",
    marginmarTop: 10,
  },
  recordBtnWrapper: {
    flexDirection: "row",
  },
  viewPlayer: {
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: "#F1EDED",
    marginVertical: 7,
    paddingVertical: 4,
  },
  viewBarWrapper: {
    marginTop: 28,
    marginHorizontal: 28,
    alignSelf: "stretch",
  },
  viewBar: {
    backgroundColor: "#ccc",
    height: 4,
    alignSelf: "stretch",
  },
  viewBarPlay: {
    backgroundColor: "white",
    height: 4,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8,
    color: "#ccc",
  },
  playBtnWrapper: {
    flexDirection: "row",
    marginTop: 40,
  },
  btn: {
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "#23CDB2",
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  txtRecordCounter: {
    marginTop: 32,
    color: "white",
    fontSize: 20,
    textAlignVertical: "center",
    fontWeight: "200",
    fontFamily: "Helvetica Neue",
    letterSpacing: 3,
  },
  txtCounter: {
    marginTop: 12,
    color: "white",
    fontSize: 20,
    textAlignVertical: "center",
    fontWeight: "200",
    fontFamily: "Helvetica Neue",
    letterSpacing: 3,
  },
  txtsml: {
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  fontcam: { position: "absolute", right: 10, bottom: 10 },
});

export default IndividualTestScreen;
