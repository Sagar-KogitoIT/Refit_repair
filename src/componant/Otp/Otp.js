import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  // PermissionsAndroid,
  Image,
  Alert,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
} from "react-native";
import { Toproundbox, Toptxt } from "../../StyledComponent/wrapper/Styles";
// import {VerifyOtp} from '../services';
// import Commonprof from './Commonprof';
// import Style from '../css/style';
// import {CreateTrueyouContext} from '../context/TrueContext';

const Otp = ({ phoneNumber, loginWithOtp, otp, setOtp }) => {
  // const [otp, setOtp] = useState([]);
  // const {signIn} = useContext(CreateTrueyouContext);
  const otpInputRef = [];
  const [loading, setLoading] = useState(false);
  const inputs = Array(6).fill(0);

  return (
    <View style={styles.wrp}>
      <StatusBar
        animated={true}
        backgroundColor="#0071C1"
        barStyle="light-content"
      />

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
        <View style={styles.modalwrp}>
          {loading ? (
            <ActivityIndicator
              style={{
                position: "absolute",
                left: "48%",
                top: "46%",
                width: 50,
                height: 50,
                zIndex: 999,
              }}
              size="large"
              color="#00ff00"
            />
          ) : null}
          <View>
            <View style={[styles.logbox, { height: 150, marginBottom: 10 }]}>
              <View style={styles.inpulin}>
                {inputs.map((i, j) => (
                  <TextInput
                    key={j}
                    style={[styles.loginpu, styles.inpulin.loginpu]}
                    placeholder="0"
                    ref={(ref) => (otpInputRef[j] = ref)}
                    maxLength={1}
                    value={otp[j]}
                    keyboardType="number-pad"
                    onChangeText={(value) => {
                      if (value === "") {
                        const previousOtp = [...otp];
                        previousOtp.splice(j, 1);
                        setOtp(previousOtp);
                        j > 0
                          ? otpInputRef[j - 1].focus()
                          : otpInputRef[j].blur();
                      } else {
                        const previousOtp = [...otp];
                        previousOtp[j] = value;
                        setOtp(previousOtp);
                        j < 5
                          ? otpInputRef[j + 1].focus()
                          : otpInputRef[j].blur();
                      }
                    }}
                  />
                ))}
              </View>
              <TouchableOpacity
                style={[styles.btn_ylw, styles.btn3]}
                onPress={loginWithOtp}
              >
                <Text
                  style={
                    (styles.txt_whit,
                    { fontSize: 18, color: "#fff", textAlign: "center" })
                  }
                >
                  VERIFY
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* <View style={{borderTopColor: '#fff', borderTopWidth: 1, marginTop: 6}}>
        <Toptxt>
          <Image source={require('../../assets/images/logo.png')} />
        </Toptxt>
      </View>
      <Toproundbox>
        <View>
          <Image
            source={require('../../assets/images/topimg.png')}
            style={{height: 280, width: 210, alignSelf: 'center'}}
          />
        </View>
        <View style={styles.modalwrp}>
          {loading ? (
            <ActivityIndicator
              style={{
                position: 'absolute',
                left: '48%',
                top: '46%',
                width: 50,
                height: 50,
                zIndex: 999,
              }}
              size="large"
              color="#00ff00"
            />
          ) : null}
          <View style={{backgroundColor: '#fff', flex: 1}}>
        
            <View
              style={[
                styles.logbox,
                {height: 150, marginBottom: 10, marginTop: '30%'},
              ]}>
              <View style={styles.inpulin}>
                {inputs.map((i, j) => (
                  <TextInput
                    key={j}
                    style={[styles.loginpu, styles.inpulin.loginpu]}
                    placeholder="0"
                    ref={ref => (otpInputRef[j] = ref)}
                    maxLength={1}
                    value={otp[j]}
                    keyboardType="number-pad"
                    onChangeText={value => {
                      if (value === '') {
                        const previousOtp = [...otp];
                        previousOtp.splice(j, 1);
                        setOtp(previousOtp);
                        j > 0
                          ? otpInputRef[j - 1].focus()
                          : otpInputRef[j].blur();
                      } else {
                        const previousOtp = [...otp];
                        previousOtp[j] = value;
                        setOtp(previousOtp);
                        j < 5
                          ? otpInputRef[j + 1].focus()
                          : otpInputRef[j].blur();
                      }
                    }}
                  />
                ))}
              </View>
              <TouchableOpacity
                style={[styles.btn_ylw, styles.btn3]}
                onPress={loginWithOtp}>
                <Text
                  style={
                    (styles.txt_whit,
                    {fontSize: 18, color: '#fff', textAlign: 'center'})
                  }>
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Toproundbox> */}
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  wrp: {
    backgroundColor: "#2C509E",
    flex: 1,
  },
  box: { marginHorizontal: "8%", marginTop: "25%" },
  modalwrp: {
    backgroundColor: "#0071C1",
    height: 130,
  },
  logbox: {
    height: "35%",
    // marginTop: "8%",
    alignItems: "center",
  },
  inpulin: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    height: "41%",

    loginpu: {
      width: "15%",
      height: "90%",
      fontSize: 35,
      borderRadius: 6,
      paddingTop: 0,
      paddingBottom: 0,
      //  borderColor: "#24CCB3",
      // borderWidth: 2,
      textAlign: "center",
      backgroundColor: "#fff",
    },
  },
  btn_ylw: {
    // position: 'absolute',
    // right: 20,
    // top: 20,
    // zIndex: 10,
    // elevation: 10,/
    textAlign: "center",
    backgroundColor: "#24CCB3",
    borderRadius: 25,
    overflow: "hidden",
    width: "90%",
    alignSelf: "center",
    marginTop: "3%",
    justifyContent: "center",
    alignContent: "center",
    fontFamily: "Poppins-SemiBold",
  },
  btn3: { height: "36%" },
  txt_whit: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    letterSpacing: 2,
    marginTop: 5,
  },
  box: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: "5%",
    marginBottom: "8%",
  },
});
