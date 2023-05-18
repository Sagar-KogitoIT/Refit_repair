import React, { useState, useEffect, useRef } from "react";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import AndroidOpenSettings from "react-native-android-open-settings";
import NetInfo from "@react-native-community/netinfo";
import { BleManager } from "react-native-ble-plx";

import {
  NativeModules,
  ToastAndroid,
  Vibration,
  Dimensions,
  BackHandler,
  Alert,
  Linking,
  Platform,
  AppState,
  DeviceEventEmitter,
} from "react-native";
import RNFS from "react-native-fs";
import Torch from "react-native-torch";
import KeyEvent from "react-native-keyevent";
import ReactNativeBlobUtil from "react-native-blob-util";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
import AudioJackManager from "react-native-audio-jack";
const audioRecorderPlayer = new AudioRecorderPlayer();

var Sound = require("react-native-sound");

Sound.setCategory("Playback");

var ding = new Sound("voicenote.mp3", Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log("failed to load the sound", error);
    return;
  }
  // if loaded successfully
  console.log(
    "duration in seconds: " +
      ding.getDuration() +
      "number of channels: " +
      ding.getNumberOfChannels()
  );
});

ding.setVolume(1);

const useIndividualTest = (navigation, camera, type, state) => {
  console.log("typeData", type);
  const { EarpieceModule } = NativeModules;

  const [displyScreen, setDisplyScreen] = useState(false);
  const [count, setCount] = useState(0);
  const [bgColor, setBgColor] = useState("");
  const [earphone, setEarPhone] = useState(false);
  const [wifi, setWifi] = useState(false);
  console.log("wifi", wifi);
  const handleClose = () => {
    setCount(0);
    setDisplyScreen(false);
  };

  const widt = Dimensions.get("window").width;
  const hgt = Dimensions.get("window").height;
  let n = parseInt(hgt / 23);
  let l = parseInt(widt / 23);
  const [dispTouch, setDispTouch] = useState(false);
  const [boxObj, setBoxObj] = useState([]);

  const showJackToast = (x) => {
    ToastAndroid.show(
      `Headphone Jack ${x ? "Connected" : "Disconnected"}`,
      ToastAndroid.SHORT
    );
  };
  const bleManager = new BleManager();
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
    }
  }, [count]);

  useEffect(() => {
    if (type === "wifi") {
      const unsubscribe = NetInfo.addEventListener((state) => {
        console.log("Connection type", state.type);
        if (state.type == "wifi") {
          setWifi(true);
        } else {
          setWifi(false);
          Alert.alert("Wifi off", "Please Turn on your Wifi", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "Go to Settings", onPress: () => turnOnwifi() },
          ]);
        }
        console.log("Is connected?", state.isConnected);
      });

      // Unsubscribe
      unsubscribe();
    }
  }, []);
  const turnOnwifi = () => {
    AndroidOpenSettings.wifiSettings();
    setWifi(true);
  };
  const [network, setNetwork] = useState(false);
  useEffect(() => {
    if (type === "network") {
      const unsubscribe = NetInfo.addEventListener((state) => {
        // console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        if (state.isConnected) {
          setNetwork(true);
        } else {
          setNetwork(false);
          Alert.alert("Network off", "Please Turn on your Network", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "Go to Settings", onPress: () => turnOnNetwork() },
          ]);
        }
      });

      // Unsubscribe
      unsubscribe();
    }
  }, []);
  const turnOnNetwork = () => {
    AndroidOpenSettings.generalSettings();
    // Linking.openURL("com.android.phone.NetworkSetting");
    setNetwork(true);
  };
  const rnBiometrics = new ReactNativeBiometrics();

  const [cameraPermission, setCameraPermission] = useState();
  const [microphonePermission, setMicrophonePermission] = useState();
  const [vibration, setVibration] = useState(true);
  const [receiver, setReceiver] = useState(true);
  const [picture, setPicture] = useState("");
  const [displayModal, setDisplayModal] = useState(false);
  const [earPhoneState, setEarPhoneState] = useState({
    ok: false,
    leftEarBudWorking: false,
    EarBudWorking: false,
    notworking: true,
    notPresent: false,
  });
  const [bluetooth, setBlueTooth] = useState(false);

  console.log("bluetoothData", bluetooth);
  let devices = null;
  if (type === "camera") {
    devices = useCameraDevices("wide-angle-camera");

    useEffect(() => {
      setDevice(devices?.back);
    }, [devices]);
  }
  useEffect(() => {
    if (type === "bluetooth") {
      bleManager
        .state()
        .then((state) => {
          console.log("statestate", state);
          if (state === "PoweredOn") {
            setBlueTooth(true);
          } else {
            setBlueTooth(false);
            Alert.alert("Bluetooth off", "Please Turn on your Bluetooth", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "Go to Settings", onPress: () => checkBluetooth() },
            ]);
            // checkBluetooth()
          }
        })
        .catch((error) => {
          console.error("Error checking Bluetooth state:", error);
        });
    }
  }, []);
  const checkBluetooth = async () => {
    AndroidOpenSettings.bluetoothSettings();
    setBlueTooth(true);
  };
  const [device, setDevice] = useState(null);

  const [rotationState, setRotationState] = useState({
    ok: true,
  });

  const [cameraState, setCameraState] = useState({
    ok: true,
    dots: false,
    blur: false,
    error: false,
  });

  const [displayState, setDisplayState] = useState({
    ok: true,
    dots: false,
    displayLines: false,
    screenDamage: false,
    pixelDamage: false,
    // touchIssue: false,
    shadowImage: false,
  });
  const [touchState, setTouchState] = useState({
    touchok: true,
    touchIssue: false,
  });
  const [fingerprintState, setFingerprintState] = useState({
    ok: true,
    notPresent: false,
  });
  const [deviceBody, setDeviceBody] = useState({
    ok: true,
    hard: false,
    minor: false,
    body: false,
    bodybrake: false,

    hard_body: false,
    hard_screen: false,
    body_dent: false,
    part_missing: false,
  });
  const [flashState, setFlashState] = useState(true);
  const [micState, setMicState] = useState({
    ok: true,
    noise: false,
    volume: false,
  });
  const [speakerState, setSpeakerState] = useState({
    ok: true,
    noise: false,
    volume: false,
  });

  const [receiverState, setReceiverState] = useState({
    ok: true,
    noise: false,
    volume: false,
  });
  const [physicalState, setPhysicalState] = useState({
    ok: false,
    volume_up: false,
    volume_down: false,
    power: false,
    back_button: false,
    home_button: false,
    overview_button: false,
  });
  console.log("physicalState", physicalState);
  const appState = useRef(AppState.currentState);
  console.log("appState ", appState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  // useEffect(() => {
  //   if (type === "physical Buttons") {
  //     const subscription = AppState.addEventListener(
  //       "change",
  //       (nextAppState) => {
  //         if (
  //           appState.current.match(/inactive|background/) &&
  //           nextAppState === "active"
  //         ) {
  //           setPhysicalState((prev) => {
  //             return {
  //               ok: prev.ok,
  //               volume_up: prev.volume_up,
  //               volume_down: prev.volume_down,
  //               power: true,
  //               back_button: prev.back_button,
  //               home_button: prev.home_button,
  //               overview_button: prev.overview_button,
  //             };
  //           });
  //         }
  //         appState.current = nextAppState;
  //         setAppStateVisible(appState.current);
  //       }
  //     );
  //     return () => {
  //       subscription.remove();
  //     };
  //   }
  // }, []);
  useEffect(() => {
    if (type === "physical Buttons") {
      const subscription = AppState.addEventListener(
        "change",
        (nextAppState) => {
          if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
          ) {
            setPhysicalState((prev) => {
              return {
                ok: prev.ok,
                volume_up: prev.volume_up,
                volume_down: prev.volume_down,
                power: true,
                back_button: prev.back_button,
                home_button: prev.home_button,
                overview_button: prev.overview_button,
              };
            });
          }
          appState.current = nextAppState;
          setAppStateVisible(appState.current);
        }
      );
      return () => {
        subscription.remove();
      };
    }
  }, []);
  useEffect(() => {
    if (type === "physical Buttons") {
      DeviceEventEmitter.addListener("ON_HOME_BUTTON_PRESSED", () => {
        setPhysicalState((prev) => {
          return {
            ...prev,
            home_button: true,
          };
        });
      });
    }
  }, []);

  useEffect(() => {
    if (type === "physical Buttons") {
      DeviceEventEmitter.addListener("ON_RECENT_APP_BUTTON_PRESSED", () => {
        console.log("You tapped the home button!");
        setPhysicalState((prev) => {
          return {
            ...prev,
            overview_button: true,
          };
        });
      });
    }
  }, []);
  const [recordTime, setRecordTime] = useState(0.0);
  const [recordSecs, setRecordSecs] = useState(0.0);
  const [currentPosition, setCurrentPositionSec] = useState(0.0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0.0);
  const [playTime, setPlayTime] = useState(0.0);
  const [duration, setDuration] = useState(0.0);
  const [saveFileName, setSaveFileName] = useState("");
  const dirs = ReactNativeBlobUtil.fs.dirs;
  const date = new Date();
  const fileName = date.getTime().toString();
  const path = `${dirs.DownloadDir}/${fileName}.mp3`;
  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  }, []);

  useEffect(() => {
    if (type === "display") {
      getDDACoordinates();
    }
    if (type === "earphone") {
      var audioJackListener = AudioJackManager.addListener(
        ({ isPluggedIn }) => {
          isPluggedIn
            ? setEarPhoneState((prev) => {
                return {
                  ok: true,
                  notworking: false,
                  notPresent: false,
                };
              })
            : null;
          isPluggedIn ? showJackToast(true) : showJackToast(false);
        }
      );

      return () => audioJackListener.remove();
    }
  }, []);
  useEffect(() => {
    if (type === "physical Buttons") {
      _load();
    }
  }, []);
  const _load = async () => {
    KeyEvent.onKeyDownListener((keyEvent) => {
      // console.log(`onKeyDown keyCode1: ${keyEvent.keyCode}`);
      console.log("keyEventData", keyEvent);
      switch (keyEvent.keyCode) {
        case 24:
          // console.log("VOLUME UP Pressed");
          setPhysicalState((prev) => {
            return {
              volume_up: true,
              ok: false,
              volume_down: prev.volume_down,
              power: prev.power,
              back_button: prev.back_button,
              home_button: prev.home_button,
              overview_button: prev.overview_button,
            };
          });
          break;
        case 25:
          // console.log("VOLUME DOWN Pressed");
          setPhysicalState((prev) => {
            return {
              volume_up: prev.volume_up,
              ok: false,
              volume_down: true,
              power: prev.power,
              back_button: prev.back_button,
              home_button: prev.home_button,
              overview_button: prev.overview_button,
            };
          });
          break;
        case 26:
          // console.log("POWER Pressed");
          // alert("POWER Pressed");
          break;
        default:
          break;
      }
      // console.log(`Action: ${keyEvent.action}`);
      // console.log(`Key: ${keyEvent.pressedKey}`);
    });
  };
  const ONE_SECOND_IN_MS = 100;
  const PATTERN = [100, 200, 300];
  const takePhotoOptions = {
    photoCodec: "jpeg",
    qualityPrioritization: "balanced",
    // flash: flash,
    quality: 90,
    skipMetadata: true,
  };
  const flipCamera = () => {
    device === devices?.back
      ? setDevice(devices?.front)
      : setDevice(devices?.back);
  };
  const takePicture = async () => {
    const photo = await camera.current.takePhoto(takePhotoOptions);
    // console.log("photo", photo);
    try {
      const date = new Date();
      const fileName = date.getTime().toString();
      const filePath = RNFS.DownloadDirectoryPath + `/Image_${fileName}.jpg`;
      RNFS.copyFile(photo.path, filePath);
      // setDisabled(true);
      setPicture(filePath);
      ToastAndroid.show("Image has been saved!!", ToastAndroid.SHORT);
      setDisplayModal(true);
    } catch (e) {
      console.log(e);
      ToastAndroid.show(
        "Something went wrong. Please try again!!",
        ToastAndroid.SHORT
      );
    }
  };

  const getFingerPrintStatus = async () => {
    rnBiometrics
      .simplePrompt({ promptMessage: "Confirm fingerprint" })
      .then((resultObject) => {
        const { success, error } = resultObject;
        if (success) {
          console.log("successful biometrics provided");
        } else {
          console.log("user cancelled biometric prompt");
        }
      })
      .catch(() => {
        console.log("biometrics failed");
      });
  };

  const getDDACoordinates = () => {
    console.log("l", l);
    console.log("n", n);
    let y = l;
    let x = n;

    let m1 = y / x;

    let a = 0;
    let b = 0;

    let d = [];

    for (var i = 0; i < x; i++) {
      d[i] = new Array(y).fill(false);
    }

    while (a < x) {
      temp_a = a + 1;
      temp_b = b + m1;

      temp_x = temp_a;
      temp_y = Math.round(temp_b);
      a = temp_a;
      b = temp_b;
      d[temp_x - 1][temp_y - 1] = true;
    }

    a = 0;
    b = l;

    y = -l;
    x = n;

    let m2 = y / x;
    console.log(m2);

    while (a < x) {
      temp_a = a + 1;
      temp_b = b + m2;
      temp_x = temp_a;
      temp_y = Math.round(temp_b);
      a = temp_a;
      b = temp_b;
      d[temp_x - 1][temp_y - 1] = true;
    }
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < l; j++) {
        if (i === 0 || i === n - 1) {
          d[i][j] = true;
        } else {
          if (j === 0 || j === l - 1) {
            d[i][j] = true;
          }
        }
      }
    }

    setBoxObj(d);
  };

  const turnFlashOn = async () => {
    try {
      if (cameraPermission) {
        await Torch.switchState(true);
      }
    } catch (e) {
      console.log(e);
      setFlashState(false);
      ToastAndroid.show(
        "We seem to have an issue accessing your torch",
        ToastAndroid.SHORT
      );
    }
  };

  const turnFlashOff = async () => {
    const cameraAllowed = await Torch.requestCameraPermission(
      "Camera Permissions", // dialog title
      "We require camera permissions to use the torch on the back of your phone." // dialog body
    );

    try {
      if (cameraAllowed) {
        await Torch.switchState(false);
      }
    } catch (e) {
      console.log(e);
      setFlashState(false);
      ToastAndroid.show(
        "We seem to have an issue accessing your torch",
        ToastAndroid.SHORT
      );
    }
  };

  const vibrationStart = () => {
    Vibration.vibrate(PATTERN, true);
  };

  const vibrationStop = () => {
    Vibration.cancel();
  };

  useEffect(() => {
    const backAction = () => {
      if (type === "microphone") {
        onStopRecord();
        navigation.goBack();
      } else if (type === "flash") {
        turnFlashOff();
        navigation.goBack();
      } else if (type === "receiver") {
        startReceiverStop();
        navigation.goBack();
      } else if (type === "speaker") {
        stopSpeakerPlay();
        navigation.goBack();
      } else if (type === "camera") {
        navigation.goBack();
      } else if (type === "display") {
        navigation.goBack();
      } else if (type === "fingerprint") {
        navigation.goBack();
      } else if (type === "physical Buttons") {
        setPhysicalState((prev) => {
          return {
            ok: prev.ok,
            volume_up: prev.volume_up,
            volume_down: prev.volume_down,
            power: prev.power,
            back_button: true,
            home_button: prev.home_button,
            overview_button: prev.overview_button,
          };
        });
        // navigation.goBack();
      } else if (type === "vibration") {
        vibrationStop();
        navigation.goBack();
      } else if (type === "physical Condition") {
        navigation.goBack();
      } else if (type === "earphone") {
        navigation.goBack();
      } else if (type === "wifi") {
        navigation.goBack();
      } else if (type === "bluetooth") {
        navigation.goBack();
      } else if (type === "network") {
        navigation.goBack();
      } else if (type === "touch screen") {
        navigation.goBack();
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  const handleStart = () => {
    if (type === "vibration") {
      vibrationStart();
    }

    if (type === "flash") {
      turnFlashOn();
    }

    if (type === "receiver") {
      startReceiverPlay();
    }

    if (type === "speaker") {
      startSpeakerPlay();
    }

    if (type === "fingerprint") {
      getFingerPrintStatus();
    }
    // console.log('start');
  };

  const handleStop = () => {
    // console.log('stop');
    if (type === "vibration") {
      vibrationStop();
    }

    if (type === "flash") {
      turnFlashOff();
    }

    if (type === "receiver") {
      startReceiverStop();
    }

    if (type === "speaker") {
      stopSpeakerPlay();
    }
  };

  const handleVibrationCheck = (x) => {
    if (x === "issue") {
      setVibration(false);
    }
    if (x === "fine") {
      setVibration(true);
    }
  };

  const handleReceiverCheck = (x) => {
    if (x === "fine") {
      setReceiverState((prev) => {
        return {
          ok: !prev.ok,
          noise: false,
          volume: false,
        };
      });
    }
    if (x === "noise") {
      setReceiverState((prev) => {
        return {
          ...prev,
          ok: false,
          noise: !prev.noise,
        };
      });
    }
    if (x === "volume") {
      setReceiverState((prev) => {
        return {
          ...prev,
          ok: false,
          volume: !prev.volume,
        };
      });
    }
  };

  const handleDeviceBodyCheck = (x) => {
    if (x === "ok") {
      setDeviceBody({
        ...deviceBody,
        ok: true,
        hard_body: false,
        hard_screen: false,
        body_dent: false,
        part_missing: false,
      });
    } else if (x === "hard_body") {
      setDeviceBody({
        ...deviceBody,
        hard_body: !deviceBody.hard_body,
        ok: false,
      });
    } else if (x === "hard_screen") {
      setDeviceBody({
        ...deviceBody,
        hard_screen: !deviceBody.hard_screen,
        ok: false,
      });
    } else if (x === "body_dent") {
      setDeviceBody({
        ...deviceBody,
        body_dent: !deviceBody.body_dent,
        ok: false,
      });
    } else if (x === "part_missing") {
      setDeviceBody({
        ...deviceBody,
        part_missing: !deviceBody.part_missing,
        ok: false,
      });
    }
  };

  // const handleDeviceBodyCheck = (x) => {
  //   if (x === "ok") {
  //     setDeviceBody({
  //       ...deviceBody,
  //       ok: true,
  //       hard: false,
  //       minor: false,
  //       body: false,
  //       bodybrake: false,
  //     });
  //   } else if (x === "hard") {
  //     setDeviceBody({ ...deviceBody, hard: !deviceBody.hard, ok: false });
  //   } else if (x === "minor") {
  //     setDeviceBody({ ...deviceBody, minor: !deviceBody.minor, ok: false });
  //   } else if (x === "body") {
  //     setDeviceBody({ ...deviceBody, body: !deviceBody.body, ok: false });
  //   } else if (x === "bodybrake") {
  //     setDeviceBody({
  //       ...deviceBody,
  //       bodybrake: !deviceBody.bodybrake,
  //       ok: false,
  //     });
  //   }
  // };

  const handleMicCheck = (x) => {
    if (x === "fine") {
      setMicState((prev) => {
        return {
          ok: !prev.ok,
          noise: false,
          volume: false,
        };
      });
    }
    if (x === "noise") {
      setMicState((prev) => {
        return {
          ...prev,
          ok: false,
          noise: !prev.noise,
        };
      });
    }
    if (x === "volume") {
      setMicState((prev) => {
        return {
          ...prev,
          ok: false,
          volume: !prev.volume,
        };
      });
    }
  };

  const handleSpeakerCheck = (x) => {
    if (x === "fine") {
      setSpeakerState((prev) => {
        return {
          ok: !prev.ok,
          noise: false,
          volume: false,
        };
      });
    }
    if (x === "noise") {
      setSpeakerState((prev) => {
        return {
          ...prev,
          ok: false,
          noise: !prev.noise,
        };
      });
    }
    if (x === "volume") {
      setSpeakerState((prev) => {
        return {
          ...prev,
          ok: false,
          volume: !prev.volume,
        };
      });
    }
  };

  const handleFlashCheck = (x) => {
    if (x === "issue") {
      setFlashState(false);
    }
    if (x === "fine") {
      setFlashState(true);
    }
  };

  const handleFingerprintCheck = (x) => {
    if (x === "fine") {
      setFingerprintState({
        ok: true,
        notPresent: false,
      });
    }
    if (x === "issue") {
      setFingerprintState({
        ok: false,
        notPresent: true,
      });
    }

    if (x === "notPresent") {
      setFingerprintState({
        ok: false,
        notPresent: true,
      });
    }
  };

  const handleRotationCheck = (x) => {
    // if(x === 'fine'){
    setRotationState((prev) => {
      return {
        ok: !prev.ok,
      };
    });
    // }
  };

  const handleCameraCheck = (x) => {
    if (x === "fine") {
      setCameraState((prev) => {
        return {
          ok: !prev.ok,
          dots: false,
          blur: false,
          error: false,
        };
      });
    }
    if (x === "blur") {
      setCameraState((prev) => {
        return {
          ...prev,
          ok: false,
          blur: !prev.blur,
        };
      });
    }
    if (x === "dots") {
      setCameraState((prev) => {
        return {
          ...prev,
          ok: false,
          dots: !prev.dots,
        };
      });
    }
    if (x === "error") {
      setCameraState((prev) => {
        return {
          ...prev,
          ok: false,
          error: !prev.error,
        };
      });
    }
  };
  const handleTouchScreen = (x) => {
    if (x === "fine") {
      setTouchState((prev) => {
        return {
          touchok: !prev.touchok,
          touchIssue: false,
        };
      });
    }
    if (x === "touch") {
      setTouchState((prev) => {
        return {
          touchok: false,
          touchIssue: !prev.touchIssue,
        };
      });
    }
  };
  const handleDisplayCheck = (x) => {
    if (x === "fine") {
      setDisplayState((prev) => {
        return {
          ok: !prev.ok,
          dots: false,
          displayLines: false,
          screenDamage: false,
          pixelDamage: false,
          touchIssue: false,
          shadowImage: false,
        };
      });
    }

    if (x === "dots") {
      setDisplayState((prev) => {
        return {
          ...prev,
          ok: false,
          dots: !prev.dots,
        };
      });
    }

    if (x === "lines") {
      setDisplayState((prev) => {
        return {
          ...prev,
          ok: false,
          displayLines: !prev.displayLines,
        };
      });
    }

    if (x === "screen") {
      setDisplayState((prev) => {
        return {
          ...prev,
          ok: false,
          screenDamage: !prev.screenDamage,
        };
      });
    }

    if (x === "pixel") {
      setDisplayState((prev) => {
        return {
          ...prev,
          ok: false,
          pixelDamage: !prev.pixelDamage,
        };
      });
    }

    if (x === "shadow") {
      setDisplayState((prev) => {
        return {
          ...prev,
          ok: false,
          shadowImage: !prev.shadowImage,
        };
      });
    }

    // if (x === "touch") {
    //   setDisplayState((prev) => {
    //     return {
    //       ...prev,
    //       ok: false,
    //       touchIssue: !prev.touchIssue,
    //     };
    //   });
    // }
  };

  const handleModalCancel = () => {
    setDisplayModal(false);
  };

  const handleModalClose = () => {
    setDisplayModal(false);
  };

  const handleEarPhone = (x) => {
    if (x === "working") {
      setEarPhoneState({
        ok: true,
        notPresent: false,
      });
    }
    if (x === "notworking") {
      setEarPhoneState({
        ok: false,
        notworking: true,
        notPresent: false,
      });
    }
    if (x === "notpresent") {
      setEarPhoneState({
        ok: false,
        notworking: false,
        notPresent: !earPhoneState.notPresent,
      });
    }
  };
  const handleWifi = (x) => {
    if (x === "working") {
      setWifi(true);
    } else {
      setWifi(false);
    }
  };
  const handleBluetooth = (x) => {
    if (x === "working") {
      setBlueTooth(true);
    } else {
      setBlueTooth(false);
    }
  };
  const handleNatwork = (x) => {
    if (x === "working") {
      setNetwork(true);
    } else {
      setNetwork(false);
    }
  };
  const handlePhysicalCheck = (x) => {
    if (x === "fine") {
      setPhysicalState({
        ok: true,
        power: false,
        volume_up: false,
        volume_down: false,
        back_button: false,
        home_button: false,
        overview_button: false,
      });
    }
    if (x === "power") {
      setPhysicalState((prev) => {
        return {
          ...prev,
          ok: false,
          power: !physicalState.power,
        };
      });
    }
    if (x === "volume_up") {
      setPhysicalState((prev) => {
        return {
          ...prev,
          ok: false,
          volume_up: !physicalState.volume_up,
        };
      });
    }
    if (x === "volume_down") {
      setPhysicalState((prev) => {
        return {
          ...prev,
          ok: false,
          volume_down: !physicalState.volume_down,
        };
      });
    }
    if (x === "back") {
      // setPhysicalState({
      //   ...physicalState,
      //   ok: false,
      //   back_button: !physicalState.back_button,
      // });
      setPhysicalState((prev) => {
        return {
          ...prev,
          ok: false,
          back_button: !physicalState.back_button,
        };
      });
    }
    if (x === "home") {
      setPhysicalState((prev) => {
        return {
          ...prev,
          ok: false,
          home_button: !physicalState.home_button,
        };
      });
    }
    if (x === "overview") {
      setPhysicalState((prev) => {
        return {
          ...prev,
          ok: false,
          overview_button: !physicalState.overview_button,
        };
      });
    }
  };

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      return;
    });
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordTime(0);
    setSaveFileName(result);
  };

  const onStartPlay = async () => {
    console.log(saveFileName);
    const msg = await audioRecorderPlayer.startPlayer(saveFileName);
    audioRecorderPlayer.addPlayBackListener((e) => {
      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      return;
    });
  };

  const onStopPlay = async () => {
    await audioRecorderPlayer.stopPlayer();
    setPlayTime(0.0);
    audioRecorderPlayer.removePlayBackListener();
  };

  const startSpeakerPlay = async () => {
    ding.play((success) => {
      if (success) {
        console.log("successfully finished playing");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
    });
    // console.log(saveFileName);
    // const msg = await audioRecorderPlayer.startPlayer(
    //   // "https://cogitodemoportal.com/refit/uploads/sample_audio/Fireside.mp3"
    //   "voicenote.mp3"
    // );
    // audioRecorderPlayer.addPlayBackListener((e) => {
    //   setCurrentPositionSec(e.currentPosition);
    //   setCurrentDurationSec(e.duration);
    //   setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    //   setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
    //   return;
    // });
  };

  const stopSpeakerPlay = async () => {
    // await audioRecorderPlayer.stopPlayer();
    // setPlayTime(0.0);
    // audioRecorderPlayer.removePlayBackListener();
    // Stop the sound and rewind to the beginning
    // ding.stop(() => {
    // Note: If you want to play a sound after stopping and rewinding it,
    // it is important to call play() in a callback.
    // ding.play();
    // });
    ding.pause();
    // Release the audio player resource
    // ding.release();
  };

  const startReceiverPlay = () => {
    EarpieceModule.play();
  };

  const startReceiverStop = () => {
    EarpieceModule.stop();
  };

  const handleSubmit = () => {
    let newState = {};

    if (type === "rotation") {
      newState = {
        ...state,
        rotationState: rotationState,
      };
    }

    if (type === "camera") {
      newState = {
        ...state,
        cameraState: cameraState,
      };
    }

    if (type === "display") {
      newState = {
        ...state,
        displayState: displayState,
      };
    }
    // if (type === "devicebody") {
    //   newState = {
    //     ...state,
    //     deviceBody: deviceBody,
    //   };
    // }
    if (type === "fingerprint") {
      newState = {
        ...state,
        fingerprintState: fingerprintState,
      };
    }

    if (type === "flash") {
      newState = {
        ...state,
        flashState: flashState,
      };
    }

    if (type === "microphone") {
      newState = {
        ...state,
        micState: micState,
      };
    }

    if (type === "physical Buttons") {
      newState = {
        ...state,
        physicalState: physicalState,
      };
    }

    if (type === "receiver") {
      newState = {
        ...state,
        receiverState: receiverState,
      };
    }

    if (type === "speaker") {
      newState = {
        ...state,
        speakerState: speakerState,
      };
    }

    if (type === "vibration") {
      newState = {
        ...state,
        vibrationState: vibration,
      };
    }

    if (type === "physical Condition") {
      newState = {
        ...state,
        deviceBody: deviceBody,
      };
    }

    if (type === "earphone") {
      newState = {
        ...state,
        headphoneJack: earPhoneState,
      };
    }
    if (type === "wifi") {
      newState = {
        ...state,
        wifi: wifi,
      };
    }
    if (type === "bluetooth") {
      newState = {
        ...state,
        bluetooth: bluetooth,
      };
    }
    if (type === "network") {
      newState = {
        ...state,
        network: network,
      };
    }
    if (type === "touch screen") {
      newState = {
        ...state,
        touchScreen: touchState,
      };
    }
    navigation.navigate("ManualTest", { data: newState });
  };

  const handleTouchCalibration = () => {
    setDispTouch(true);
  };

  const handleTouchCalibrationClose = () => {
    setDispTouch(false);
  };

  return {
    device,
    cameraPermission,
    microphonePermission,
    handleStart,
    handleStop,
    takePicture,
    flipCamera,
    vibration,
    handleSubmit,
    turnFlashOn,
    turnFlashOff,
    handleVibrationCheck,
    picture,
    rotationState,
    handleRotationCheck,
    cameraState,
    handleCameraCheck,
    displayModal,
    handleModalClose,
    handleModalCancel,
    handleDisplayCheck,
    handleTouchScreen,
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
    deviceBody,
    handleFingerprintCheck,
    handleDeviceBodyCheck,
    handleEarPhone,
    earPhoneState,
    bgColor,
    setCount,
    displyScreen,
    setDisplyScreen,
    count,
    dispTouch,
    boxObj,
    earphone,
    handleTouchCalibration,
    handleTouchCalibrationClose,
    handleReceiverCheck,
    receiver,
    receiverState,
    wifi,
    handleWifi,
    bluetooth,
    handleBluetooth,
    network,
    handleNatwork,
    touchState,
  };
};
export default useIndividualTest;
