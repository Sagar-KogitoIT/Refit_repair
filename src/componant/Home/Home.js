import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ImageBackground,
} from "react-native";
import { CreateRefitContext } from "../../context/RefitContext";
import { Button, ButttonText } from "../../StyledComponent/Button";
import Otp from "../Otp/Otp";
import Pattern from "./Pattern";
// import { Login } from "../../services/api";
const Home = ({ navigation }) => {
  const { setEmployeeContext } = useContext(CreateRefitContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [otp, setOtp] = useState([]);
  const reg = /^[0]?[789]\d{9}$/;
  const onChangePhone = (value) => {
    setMobileNumber(value);
  };
  const loginRequest = () => {
    navigation.replace("Dashboard");
    // navigation.navigate("ShowPattern");
    // //TODO mobile validation
    // if (mobileNumber.length < 10 || mobileNumber.length > 10) {
    //   Alert.alert("please enter a 10 digit phone number");
    // } else if (reg.test(mobileNumber) === false) {
    //   Alert.alert("please enter a valid phone number");
    // } else {
    //   const myHeaders = new Headers();
    //   myHeaders.append("Client-Service", "app-client");
    //   myHeaders.append("Auth-Key", "refitrepairapi");
    //   const formdata = new FormData();
    //   formdata.append("user_mobile", mobileNumber);
    //   const requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: formdata,
    //   };
    // Login(mobileNumber)
    //   .then((response) => {
    //     setEmployee_id(response?.employee_id);
    //     setEmployeeContext(response?.employee_id);
    //     setModalVisible(true);
    //   })
    //   .catch((error) => console.log("error", error));
    //   fetch("https://cogitodemoportal.com/refit/site_api/login", requestOptions)
    //     .then((response) => response.json())
    //     .then((result) => {
    //       console.log("otp", result?.otp);
    //       setEmployee_id(result?.employee_id);
    //       setEmployeeContext(result?.employee_id);
    //       setModalVisible(true);
    //     })
    //     .catch((error) => console.log("error", error));
    // }
  };
  const loginWithOtp = () => {
    const myHeaders = new Headers();
    myHeaders.append("Client-Service", "app-client");
    myHeaders.append("Auth-Key", "refitrepairapi");

    const otpJoin = otp.join("");
    const formdata = new FormData();
    formdata.append("employee_id", employee_id);
    formdata.append("user_otp", otpJoin);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    fetch(
      "https://cogitodemoportal.com/refit/site_api/check_otp",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // setEmployee_id(result?.employee_id);
        navigation.navigate("DasboardTab");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <View style={styles.wrp}>
      <Modal
        style={{ flex: 1 }}
        visible={modalVisible}
        onRequestClose={() => {
          //  setModalVisible(!modalVisible);
        }}
      >
        <Otp
          phoneNumber={mobileNumber}
          loginWithOtp={loginWithOtp}
          employee_id={employee_id}
          setOtp={setOtp}
          otp={otp}
        />
      </Modal>

      <StatusBar
        animated={true}
        backgroundColor="#0071C1"
        barStyle="light-content"
      />
      {/* <Image
        source={require('../../assets/images/hometop.png')}
        style={styles.topimg}
      /> */}
      <ImageBackground
        source={require("../../assets/images/Login.png")}
        // resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <View style={styles.box}>
        <View style={{ backgroundColor: "#0071C1" }}>
          <View style={styles.inputwrp}>
            <Image source={require("../../assets/images/country.png")} />
            <TextInput
              placeholder="+91 0000000000"
              style={styles.input}
              onChangeText={(value) => onChangePhone(value)}
            />
          </View>
          <Button
            margin="20"
            onPress={
              // Alert('press');
              // navigation.navigate('DasboardTab');
              loginRequest
            }
          >
            <ButttonText>Login</ButttonText>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrp: {
    backgroundColor: "#00A6ED",
    flex: 1,
  },
  topimg: {
    width: "100%",
  },
  box: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: "5%",
    marginBottom: "10%",
  },
  //marginHorizontal: "8%", marginTop: "90%"
  inputwrp: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingBottom: 3,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    color: "#000",
    fontFamily: "Poppins-Medium",
    fontSize: 17,
    marginLeft: 10,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    fontSize: 24,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
});
