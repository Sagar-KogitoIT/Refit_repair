import React, { useEffect, useState } from "react";
import { NativeModules, PermissionsAndroid, Alert } from "react-native";
import AndroidOpenSettings from "react-native-android-open-settings";
import NetInfo from "@react-native-community/netinfo";
const useList = () => {
  const {
    AccelerometerModule,
    BluetoothModule,
    CameraModule,
    FlashModule,
    GPSModule,
    GyroscopeModule,
    LockScreenModule,
    NetworkModule,
    ProximityModule,
    SimReaderModule,
    WifiModule,
  } = NativeModules;
  const [state, setState] = useState({
    rotation: false,
    audio: false,
    audioStatus: false,
    audioPermission: false,
    accelerometer: false,
    accelerometerStatus: false,
    // bluetooth: false,
    // bluetoothStatus: false,
    cameraPermission: false,
    frontCamera: false,
    frontCameraStatus: false,
    backCamera: false,
    backCameraStatus: false,
    fingerPrint: false,
    fingerPrintStatus: false,
    flash: false,
    flashStatus: false,
    gps: false,
    gpsStatus: false,
    gyroscope: false,
    gyroscopeStatus: false,
    lockScreen: false,
    lockScreenStatus: false,
    // network: false,
    // networkStatus: false,
    path: "",
    proximity: false,
    proximityStatus: false,
    sim1: false,
    sim1Status: false,
    sim2: false,
    sim2Status: false,
    // wifi: false,
    // wifiStatus: false,
  });

  const [loading, setLoading] = useState(true);

  const requestPermission = async () => {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      // console.log('permission grant', grants);
      if (
        grants["android.permission.WRITE_EXTERNAL_STORAGE"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants["android.permission.READ_EXTERNAL_STORAGE"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants["android.permission.RECORD_AUDIO"] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        // console.log('Permissions granted');
        setState((prev) => {
          return {
            ...prev,
            audio: true,
            audioStatus: false,
            audioPermission: true,
          };
        });
      } else {
        // console.log('All required permissions not granted');
        // return;
        setState((prev) => {
          return {
            ...prev,
            audio: true,
            audioStatus: false,
            audioPermission: false,
          };
        });
      }

      if (
        grants["android.permission.CAMERA"] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        setState((prev) => {
          return {
            ...prev,
            cameraPermission: true,
          };
        });
        getFrontCameraStatus();
        getBackCameraStatus();
      } else {
        setState((prev) => {
          return {
            ...prev,
            frontCamera: true,
            frontCameraStatus: false,
            backCamera: true,
            backCameraStatus: false,
            cameraPermission: false,
          };
        });
      }
    } catch (err) {
      setState((prev) => {
        return {
          ...prev,
          frontCamera: true,
          frontCameraStatus: false,
          backCamera: true,
          backCameraStatus: false,
          cameraPermission: false,
        };
      });
    }
  };

  const getAccelerometerStatus = async () => {
    try {
      const result = await AccelerometerModule.hasAccelerometer();
      // console.log('accelerometer', result);
      setState((prev) => {
        return {
          ...prev,
          accelerometer: true,
          accelerometerStatus: true,
        };
      });
    } catch (e) {
      // console.log('accelerometer', e);
      setState((prev) => {
        return {
          ...prev,
          accelerometer: true,
          accelerometerStatus: false,
        };
      });
    }
  };

  // const getBluetoothStatus = async () => {
  //   try {
  //     const result = await BluetoothModule.isBluetoothAvailable();
  //     unsubscribe();
  //     // console.log("resultDataBlueTooth", result);
  //     // if (result) {
  //     //   Alert.alert("Turn on Bluetooth", "Please Turn on Bluetooth", [
  //     //     {
  //     //       text: "Cancel",
  //     //       onPress: () => console.log("Cancel Pressed"),
  //     //       style: "cancel",
  //     //     },
  //     //     { text: "OK", onPress: () => turnonBlueTooth() },
  //     //   ]);
  //     // }

  //     // console.log('blueTooth', result);
  //     setState((prev) => {
  //       return {
  //         ...prev,
  //         bluetooth: true,
  //         bluetoothStatus: true,
  //       };
  //     });
  //   } catch (e) {
  //     // console.log('blueTooth', e);
  //     setState((prev) => {
  //       return {
  //         ...prev,
  //         bluetooth: true,
  //         bluetoothStatus: false,
  //       };
  //     });
  //   }
  // };
  const unsubscribe = NetInfo.addEventListener((state) => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });
  const getFrontCameraStatus = async () => {
    try {
      const result = await CameraModule.checkForFrontCamera();
      // console.log('front Camera', result);
      setState((prev) => {
        return {
          ...prev,
          frontCamera: true,
          frontCameraStatus: true,
          //   cameraPermission: true,
        };
      });
    } catch (e) {
      // console.log('front Camera', e);
      setState((prev) => {
        return {
          ...prev,
          frontCamera: true,
          frontCameraStatus: false,
          //   cameraPermission: true,
        };
      });
    }
  };

  const getBackCameraStatus = async () => {
    try {
      const result = await CameraModule.checkForBackCamera();
      // console.log('back Camera', result);
      setState((prev) => {
        return {
          ...prev,
          backCamera: true,
          backCameraStatus: true,
          cameraPermission: true,
        };
      });
    } catch (e) {
      // console.log('back Camera', e);
      setState((prev) => {
        return {
          ...prev,
          backCamera: true,
          backCameraStatus: false,
          cameraPermission: true,
        };
      });
    }
  };

  const getFlashStatus = async () => {
    try {
      const result = await FlashModule.getFlashStatus();
      // console.log('Flash', result);
      setState((prev) => {
        return {
          ...prev,
          flash: true,
          flashStatus: true,
        };
      });
    } catch (e) {
      // console.log('flash', e);
      setState((prev) => {
        return {
          ...prev,
          flash: true,
          flashStatus: false,
        };
      });
    }
  };

  const getGPSStatus = async () => {
    try {
      const result = await GPSModule.checkGPSStatus();
      // console.log('GPS', result);
      setState((prev) => {
        return {
          ...prev,
          gps: true,
          gpsStatus: true,
        };
      });
    } catch (e) {
      // console.log('GPS', e);
      setState((prev) => {
        return {
          ...prev,
          gps: true,
          gpsStatus: false,
        };
      });
    }
  };

  const getGyroscopeStatus = async () => {
    try {
      const result = await GyroscopeModule.isGyroScopeWorking();
      // console.log('gyroscope', result);
      setState((prev) => {
        return {
          ...prev,
          gyroscope: true,
          gyroscopeStatus: true,
        };
      });
    } catch (e) {
      // console.log('gyroscope', e);
      setState((prev) => {
        return {
          ...prev,
          gyroscope: true,
          gyroscopeStatus: false,
        };
      });
    }
  };

  const getLockScreenStatus = async () => {
    try {
      const result = await LockScreenModule.getLockScreenStatus();
      // console.log('lockscreen', result);
      setState((prev) => {
        return {
          ...prev,
          lockScreen: true,
          lockScreenStatus: true,
        };
      });
    } catch (e) {
      // console.log('lockscreen', e);
      setState((prev) => {
        return {
          ...prev,
          lockScreen: true,
          lockScreenStatus: false,
        };
      });
    }
  };

  // const getNetworkStatus = async () => {
  //   try {
  //     const result = await NetworkModule.getNetworkStatus();
  //     // console.log('network', result);
  //     setState((prev) => {
  //       return {
  //         ...prev,
  //         network: true,
  //         networkStatus: true,
  //       };
  //     });
  //   } catch (e) {
  //     // console.log('network', e);
  //     setState((prev) => {
  //       return {
  //         ...prev,
  //         network: true,
  //         networkStatus: false,
  //       };
  //     });
  //   }
  // };

  const getProximityStatus = async () => {
    try {
      const result = await ProximityModule.checkProximitySensor();
      // console.log('Proximity', result);
      setState((prev) => {
        return {
          ...prev,
          proximity: true,
          proximityStatus: true,
        };
      });
    } catch (e) {
      // console.log('Proximity', e);
      setState((prev) => {
        return {
          ...prev,
          proximity: true,
          proximityStatus: false,
        };
      });
    }
  };

  const getSim1Status = async () => {
    try {
      const result = await SimReaderModule.getSim1Status();
      // console.log('Sim 1 Status', result);
      setState((prev) => {
        return {
          ...prev,
          sim1: true,
          sim1Status: true,
        };
      });
    } catch (e) {
      // console.log('Sim 1 Status', e);
      setState((prev) => {
        return {
          ...prev,
          sim1: true,
          sim1Status: false,
        };
      });
    }
  };

  const getSim2Status = async () => {
    try {
      const result = await SimReaderModule.getSim2Status();
      // console.log('Sim 2 Status', result);
      setState((prev) => {
        return {
          ...prev,
          sim2: true,
          sim2Status: true,
        };
      });
    } catch (e) {
      // console.log('Sim 2', e);
      setState((prev) => {
        return {
          ...prev,
          sim2: true,
          sim2Status: false,
        };
      });
    }
  };

  // const getWifiStatus = async () => {
  //   try {
  //     const result = await WifiModule.getWifiStatus();

  //     Alert.alert("Turn on Wifi", "Please Turn on Wifi", [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel",
  //       },
  //       { text: "OK", onPress: () => turnonWifi() },
  //     ]);
  //     // console.log('Wifi', result);
  //     setState((prev) => {
  //       return {
  //         ...prev,
  //         wifi: true,
  //         wifiStatus: true,
  //       };
  //     });
  //   } catch (e) {
  //     // console.log('Wifi', e);
  //     setState((prev) => {
  //       return {
  //         ...prev,
  //         wifi: true,
  //         wifiStatus: false,
  //       };
  //     });
  //   }
  // };
  // const turnonWifi = () => {
  //   AndroidOpenSettings.wifiSettings();
  // };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const callAllFunctions = async () => {
    setLoading(true);
    await delay(2000);
    getAccelerometerStatus();
    // await delay(2000);
    // getBluetoothStatus();
    await delay(2000);
    requestPermission();
    await delay(2000);
    getFlashStatus();
    await delay(2000);
    getGPSStatus();
    await delay(2000);
    getGyroscopeStatus();
    await delay(2000);
    getLockScreenStatus();
    // await delay(2000);
    // getNetworkStatus();
    await delay(2000);
    getProximityStatus();
    await delay(2000);
    getSim1Status();
    await delay(2000);
    getSim2Status();
    // await delay(2000);
    // getWifiStatus();
    setLoading(false);
  };

  useEffect(() => {
    callAllFunctions();
  }, []);

  return {
    state,
    loading,
  };
};

export default useList;
