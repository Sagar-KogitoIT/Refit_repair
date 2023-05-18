import React, { useContext, useState, useEffect } from "react";
import { NativeModules, Alert, BackHandler } from "react-native";
import DeviceInfo from "react-native-device-info";
import { CreateRefitContext } from "../../context/RefitContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const useDashboard = (EmpID) => {
  const navigation = useNavigation();
  const { DeviceInfoModule } = NativeModules;
  // console.log("DeviceInfoModule", DeviceInfoModule);
  const [modalVisible, setModalVisible] = useState(true);
  const {
    deviceState,
    IMEI,
    setIMEIContext,
    setDeviceState,
    setRam,
    setRamContext,
    setStorage,
    setStorageContext,
  } = useContext(CreateRefitContext);
  // const [modalVisible, setModalVisible] = useState(false);
  const [imei, setImei] = useState("");
  const onChangeImei = (value) => {
    setImei(value);
    // const reg = /^[0-9]*$/;
    // if (reg.test(value)) {

    // }
  };

  const onSubmitImei = () => {
    const reg = /^[0-9]*$/;
    if (reg.test(imei) === false || imei.length < 13) {
      Alert.alert("please enter a valid imei number");
    }
    // if (imei.length < 13) {

    // }
    else {
      //TODO set IMEI in context
      // console.log("test");
      setIMEIContext(imei);
      setModalVisible(false);
    }
  };
  const [state, setState] = useState({
    batteryLevel: "",
    totalMemory: "",
    totalMemoryInBytes: "",
    usedMemory: "",
    usedMemoryInBytes: "",
    deviceModel: "",
    deviceBrand: "",
    deviceName: "",
    progress: 0.5,
    ramUsage: 0,
    availableInternalStorage: "",
    availableInternalStorageInBytes: "",
    totalInternalStorage: "",
    totalInternalStorageInBytes: "",
    availableExternalStorage: "",
    availableExternalStorageInBytes: "",
    totalExternalStorage: "",
    totalExternalStorageInBytes: "",
    internalStorageUsage: 0,
    externalStorageUsage: 0,
    isCharging: false,
  });
  // console.log("ischargeData", state.isCharging);
  const getDeviceModel = async () => {
    const result = await DeviceInfoModule.getDeviceModel();
    // console.log('DeviceModel', result);
    setState((prev) => {
      return {
        ...prev,
        deviceModel: result,
      };
    });
  };
  // const totalInternalStorage = DeviceInfo.getTotalDiskCapacity();
  // console.log("totalInternalStorage", totalInternalStorage);
  // // get the free internal storage in bytes
  // const freeInternalStorage = DeviceInfo.getFreeDiskStorage();
  // console.log("freeInternalStorage", freeInternalStorage);
  const getDeviceBrand = async () => {
    const result = await DeviceInfoModule.getDeviceBrand();
    // console.log('DeviceBrand', result);
    setState((prev) => {
      return {
        ...prev,
        deviceBrand: result,
      };
    });
  };

  const getDeviceName = async () => {
    DeviceInfo.getDeviceName().then((deviceName) => {
      // console.log('DeviceId', deviceName);
      setState((prev) => {
        return {
          ...prev,
          deviceName: deviceName,
        };
      });
    });
  };

  const getAvailableInternalMemorySize = async () => {
    const result = await DeviceInfoModule.getInternalMemoryInfo();
    // console.log("result12New1", result);

    console.log("NativeModule", result);

    // const result = await DeviceInfoModule.internalStorage();
    const formattedResult = formatBytes(result);

    console.log("formatted Result:", formattedResult);
    setState((prev) => {
      return {
        ...prev,
        availableInternalStorage: formattedResult,
        availableInternalStorageInBytes: result,
      };
    });
  };

  const getTotalInternalMemorySize = async () => {
    const result = await DeviceInfoModule.getTotalInternalMemorySize();
    // const result = await DeviceInfoModule.getInternalMemoryInfo();
    // console.log("result13", result);
    // const result = await DeviceInfoModule.internalStorage();
    // const totalSpace = result.total;
    // const absoluteValue = Math.abs(totalSpace);
    // console.log("absoluteValue", absoluteValue);`

    const formattedResult = formatBytes(result);
    setStorageContext(formattedResult);
    console.log("Total Internal", formattedResult);
    setState((prev) => {
      return {
        ...prev,
        totalInternalStorage: formattedResult,
        totalInternalStorageInBytes: result,
      };
    });
  };

  const getAvailableExternalMemorySize = async () => {
    const result = await DeviceInfoModule.getAvailableExternalMemorySize();
    const formattedResult = formatBytes(result);
    setState((prev) => {
      return {
        ...prev,
        availableExternalStorage: formattedResult,
        availableExternalStorageInBytes: result,
      };
    });
  };

  const getTotalExternalMemorySize = async () => {
    const result = await DeviceInfoModule.getTotalExternalMemorySize();
    const formattedResult = formatBytes(result);
    // console.log("Total External", formattedResult);
    setState((prev) => {
      return {
        ...prev,
        totalExternalStorage: formattedResult,
        totalExternalStorageInBytes: result,
      };
    });
  };

  //   const getSim1IMEI = async () => {
  //     try {
  //       const result = await SimReaderModule.getSim1IMEI();
  //       console.log('IMEI 1', result);
  //       setState(prev => {
  //         return {
  //           ...prev,
  //           //   IMEI: true,
  //           sim1IMEI: result,
  //         };
  //       });
  //     } catch (e) {
  //       // console.log('Sim 2', e);
  //       setState(prev => {
  //         return {
  //           ...prev,
  //           //   IMEI: false,
  //           sim1IMEI: '',
  //         };
  //       });
  //     }
  //   };

  //   const getSim2IMEI = async () => {
  //     try {
  //       const result = await SimReaderModule.getSim2IMEI();
  //       // console.log('IMEI', result);
  //       setState(prev => {
  //         return {
  //           ...prev,
  //           //   IMEI: true,
  //           sim2IMEI: result,
  //         };
  //       });
  //     } catch (e) {
  //       // console.log('IMEI', e);
  //       setState(prev => {
  //         return {
  //           ...prev,
  //           //   IMEI: false,
  //           sim2IMEI: '',
  //         };
  //       });
  //     }
  //   };
  useEffect(() => {
    // const backAction = () => {
    //   navigation.goBack();
    //   return true;
    // };
    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );
    // return () => backHandler.remove();
  });
  useEffect(() => {
    // getDeviceID();
    // setModalVisible(true);
    getDeviceModel();
    getDeviceBrand();
    getDeviceName();
    getTotalInternalMemorySize();
    getAvailableInternalMemorySize();
    // getTotalExternalMemorySize();
    // getAvailableExternalMemorySize();

    // getSim1IMEI();
    // getSim2IMEI();

    // CalendarModule.test();

    // DeviceEventEmitter.addListener('count', data => {
    //   // console.log('Count', data);
    // });

    // const interval = setInterval(() => {
    DeviceInfo.getBatteryLevel().then((batteryLevel) => {
      // console.log('batterylevel', batteryLevel);
      const x = (batteryLevel * 100).toFixed(0);
      setState((prev) => {
        return {
          ...prev,
          batteryLevel: `${x}%`,
        };
      });
    });

    DeviceInfo.isBatteryCharging().then((isCharging) => {
      // console.log("isCharging", isCharging);
      setState((prev) => {
        return {
          ...prev,
          isCharging: isCharging,
        };
      });
      setDeviceState((prev) => {
        return {
          deviceModel: prev.deviceModel,
          deviceBrand: prev.deviceBrand,
          deviceName: prev.deviceName,
          isCharging: isCharging,
        };
      });
      // setDeviceState({ ...deviceState, isCharging: isCharging });
    });

    DeviceInfo.getTotalMemory().then((totalMemory) => {
      // console.log("totalMemoryDatata", totalMemory);
      const memory = formatBytes(totalMemory);
      setRamContext(memory);
      console.log("totalMemoryDataVal", memory);

      setState((prev) => {
        return {
          ...prev,
          totalMemory: memory,
          totalMemoryInBytes: totalMemory,
        };
      });
    });

    DeviceInfo.getUsedMemory().then((usedMemory) => {
      const memory = formatBytes(usedMemory);

      // console.log('usedMemory', memory);
      setState((prev) => {
        return {
          ...prev,
          usedMemory: memory,
          usedMemoryInBytes: usedMemory,
        };
      });
    });
    // }, 500);

    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      state.deviceBrand !== "" &&
      state.deviceModel !== "" &&
      state.deviceName !== ""
    ) {
      const newDashboardData = {
        deviceModel: state?.deviceModel,
        deviceBrand: state?.deviceBrand,
        deviceName: state?.deviceName,
      };
      setDeviceState(newDashboardData);
    }
  }, [state.deviceBrand, state.deviceModel, state.deviceName]);

  function formatBytes(a, b = 2) {
    if (!+a) return "0 Bytes";
    const c = 0 > b ? 0 : b,
      d = Math.floor(Math.log(a) / Math.log(1024));
    return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
      ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
    }`;
  }

  const getRamUsage = (a, b) => {
    const x = (Number(a) / Number(b)) * 100;
    return x;
  };

  useEffect(() => {
    const ramUsage = getRamUsage(
      state.usedMemoryInBytes,
      state.totalMemoryInBytes
    );
    setState((prev) => {
      return {
        ...prev,
        ramUsage: ramUsage,
      };
    });
  }, [state.usedMemoryInBytes, state.totalMemoryInBytes]);

  const getStorageUsage = (a, b) => {
    const x = (Number(a) / Number(b)) * 100;
    return 100 - x;
  };

  useEffect(() => {
    const storageUsage = getStorageUsage(
      state.availableInternalStorageInBytes,
      state.totalInternalStorageInBytes
    );
    setState((prev) => {
      return {
        ...prev,
        internalStorageUsage: storageUsage,
      };
    });
  }, [
    state.totalInternalStorageInBytes,
    state.availableInternalStorageInBytes,
  ]);

  useEffect(() => {
    const storageUsage = getStorageUsage(
      state.availableExternalStorageInBytes,
      state.totalExternalStorageInBytes
    );
    setState((prev) => {
      return {
        ...prev,
        externalStorageUsage: storageUsage,
      };
    });
  }, [
    state.totalExternalStorageInBytes,
    state.availableExternalStorageInBytes,
  ]);

  return {
    state,
    onChangeImei,
    onSubmitImei,

    imei,
    modalVisible,
  };
};

export default useDashboard;
