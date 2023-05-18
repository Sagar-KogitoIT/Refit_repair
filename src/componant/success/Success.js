import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  Image,
  ToastAndroid,
  PermissionsAndroid,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { PERMISSIONS } from "react-native-permissions";
import { Toproundbox, Toptxt } from "../../StyledComponent/wrapper/Styles";
import { Button, ButttonText } from "../../StyledComponent/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNFS from "react-native-fs";
import ReactNativeBlobUtil from "react-native-blob-util";
import { CreateRefitContext } from "../../context/RefitContext";

const Success = ({ route }) => {
  const { data } = route.params;
  console.log("ramValData", ram);
  console.log("storageValData", storage);
  console.log("dataVal", JSON.stringify(data));
  const { IMEI, deviceState, ram, storage } = useContext(CreateRefitContext);
  console.log("ramvavavavav", ram);
  console.log("ramvavavavavrttytyy", storage);
  console.log("deviceStateDataContex", deviceState);

  // const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [PDFUri, setPDFURI] = useState("");

  useEffect(() => {
    const grants = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (
      grants["android.permission.WRITE_EXTERNAL_STORAGE"] ===
      PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("working");
    }
  }, []);

  // const createPDF = async () => {
  //   try {
  //     const date = new Date();
  //     const fileName = date.getTime().toString();
  //     const options = {
  //       // html: '<h1>PDF TEST</h1>',
  //       // html: htmlContent,
  //       fileName: `RefitReport_${fileName}`,
  //       directory: "Documents",
  //       base64: true,
  //     };

  //     const file = await RNHTMLtoPDF.convert(options);

  //     const filePath =
  //       RNFS.DownloadDirectoryPath + `/RefitReport_${fileName}.pdf`;
  //     await RNFS.writeFile(filePath, file.base64, "base64");

  //     setDisabled(true);

  //     ToastAndroid.show("PDF report has been generated!!", ToastAndroid.SHORT);
  //   } catch (e) {
  //     console.log(e);
  //     ToastAndroid.show(
  //       "Something went wrong. Please try again!!",
  //       ToastAndroid.SHORT
  //     );
  //   }
  // };
  const uploadData = () => {
    setIsLoading(true);
    const Data = {
      Employee_Id: "RG10061",
      Brand: deviceState?.deviceBrand,
      Model: deviceState?.deviceModel,
      Device_Name: deviceState?.deviceName,
      Ram: ram,
      Storage: storage,
      IMEI: IMEI,
      Charging: deviceState?.isCharging,
      Accelerometer: data?.accelerometerStatus,
      Bluetooth: data?.bluetooth,
      Front_Camera: data?.frontCameraStatus,
      Rear_Camera: data?.backCameraStatus,
      GPS: data?.gpsStatus,
      Gyroscope: data?.gyroscopeStatus,
      Screen_Lock: data?.lockScreenStatus,
      Network_Connectivity: data?.network ? data?.network : false,
      Proximity: data?.proximity,
      Finger_Print: data?.fingerprintState
        ? {
            OK: data?.fingerprintState?.ok,
            notpresent: data?.fingerprintState?.notPresent,
          }
        : {},

      // "NFC": true,
      Sim_Reader_1: data?.sim1Status,
      Sim_Reader_2: data?.sim2Status,
      WiFi: data?.wifi,
      Camera_State: {
        Ok: data?.cameraState?.ok,
        Dots: data?.cameraState?.dots,
        Blur: data?.cameraState?.blur,
        Error: data?.cameraState?.error,
      },

      Display_State: {
        Ok: data?.displayState?.ok,
        Dots: data?.displayState?.dots,
        Screen_Damage: data?.displayState?.screenDamage,
        Pixel_Damage: data?.displayState?.pixelDamage,
        Display_Lines: data?.displayState?.displayLines,
        Shadow_Image: data?.displayState?.shadowImage,
        Touch_Issue: data?.touchScreen?.touchIssue,
        Touch_Ok: data?.touchScreen?.touchok,
      },

      Flash_State: {
        Ok: data?.flashStatus,
      },

      Microphone_State: {
        Ok: data?.micState?.ok,
        Noise: data?.micState?.noise,
        Volume: data?.micState?.volume,
      },

      Physical_Button: {
        Ok: data?.physicalState?.ok,
        Power_Button: data?.physicalState?.power,
        Volume_Down_Button: data?.physicalState?.volume_down,
        Volume_Up_Button: data?.physicalState?.volume_up,
        Physical_Back_Button: data?.physicalState?.back_button,
        Physical_Home_Button: data?.physicalState?.home_button,
        Physical_Overview_Button: data?.physicalState?.overview_button,
      },

      Device_Body_State: {
        Ok: data?.deviceBody?.ok,
        hard: data?.deviceBody?.hard,
        minor: data?.deviceBody?.minor,
        bodydamage: data?.deviceBody?.body,
        bodybreak: data?.deviceBody?.bodybrake,
      },

      Receiver: {
        Ok: data?.receiverState?.ok,
        Noise: data?.receiverState?.noise,
        Volume: data?.receiverState?.volume,
      },

      Speaker_State: {
        Ok: data?.speakerState?.ok,
        Noise: data?.speakerState?.noise,
        Volume: data?.speakerState?.volume,
      },

      Headphone_Jack: {
        Ok: data?.headphoneJack?.ok,
        Not_Detected: data?.headphoneJack?.notworking,
        Not_Present: data?.headphoneJack?.notPresent,
      },

      Vibration: data?.vibrationState,
    };
    console.log("dadadaad1", JSON.stringify(Data));
    const reportData = JSON.stringify(Data);
    console.log("reportData12468", reportData);
    const myHeaders = new Headers();
    myHeaders.append("Client-Service", "app-client");
    myHeaders.append("Auth-Key", "refitrepairapi");

    const formdata = new FormData();
    formdata.append("employee_id", "RG10061");
    formdata.append("report_data", reportData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    fetch(
      "https://cogitodemoportal.com/refit/site_api/insert_report_data",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const pdf_url = result?.pdf_url;
        // downloadPDF(pdf_url);
        console.log(pdf_url);
        setPDFURI(pdf_url);
        setIsLoading(true);
      })
      .catch((error) => {
        console.log("error", error);
        ToastAndroid.show("Upload error. Please try again", ToastAndroid.SHORT);
        setIsLoading(false);
      });
  };

  // const downloadPDF = (pdf_url) => {
  //   //Copy saving the

  //   console.log(pdf_url);

  //   const fileName = pdf_url.split(
  //     "https://cogitodemoportal.com/refit/report/emp-report/"
  //   )[1];
  //   console.log(fileName);

  //   const filePath = RNFS.DownloadDirectoryPath + `/${fileName}.pdf`;
  //   ReactNativeBlobUtil.config({
  //     // add this option that makes response data to be stored as a file,
  //     // this is much more performant.
  //     fileCache: true,
  //   })
  //     .fetch("GET", `${pdf_url}.pdf`, {
  //       //some headers ..
  //     })
  //     .then((res) => {
  //       // the temp file path
  //       const tempPath = res.path();
  //       console.log("The file saved to ", tempPath);
  //       RNFS.moveFile(tempPath, filePath);
  //     })
  //     .then(() => {
  //       ToastAndroid.show(
  //         "PDF report has been generated!!",
  //         ToastAndroid.SHORT
  //       );
  //     })
  //     .catch(() => {
  //       ToastAndroid.show(
  //         "Something went wrong. Please try again!!",
  //         ToastAndroid.SHORT
  //       );
  //     });
  // };

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
      <Toproundbox>
        <ImageBackground
          resizeMode="cover"
          source={require("../../assets/images/back.png")}
          style={styles.back}
        />
        <View style={styles.midprt}>
          <Image source={require("../../assets/images/pdf.png")} />
          <Text style={styles.txt}>your information saved successfully</Text>
        </View>
        <Button
          margin="8"
          // onPress={createPDF}
          onPress={uploadData}
          disabled={isLoading}
        >
          <ButttonText>
            <Icon name="file-pdf-o" size={20} color="#fff" /> Export PDF
          </ButttonText>
        </Button>

        {PDFUri !== "" && (
          <>
            <Text style={[styles.txt, { fontSize: 14, marginBottom: "0%" }]}>
              Your PDF file is available at
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL(PDFUri)}>
              <Text
                style={[
                  styles.txt,
                  { color: "#23CDB2", fontSize: 14, marginTop: "0%" },
                ]}
              >
                {PDFUri}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Toproundbox>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  wrp: {
    backgroundColor: "#0071C1",

    flex: 1,
    maxHeight: "100%",
  },
  back: {
    position: "absolute",
    height: "98%",
    width: "105%",
    top: 0,
    left: 0,
  },
  txt: {
    fontFamily: "Poppins-Regular",
    fontSize: 27,
    color: "#01131A",
    textAlign: "center",
    marginTop: "9%",
    marginBottom: "11%",
  },
  midprt: {
    alignItems: "center",
    marginTop: "55%",
  },
});
