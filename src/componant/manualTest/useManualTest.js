const useManualTest = (navigation, prevState) => {
  const state = prevState;

  // console.log("manualState", state);

  const handleRotaion = () => {
    navigation.navigate("IndividualTest", { data: state, type: "rotation" });
  };

  const handleVibration = () => {
    navigation.navigate("IndividualTest", { data: state, type: "vibration" });
  };
  const handleDevice = () => {
    navigation.navigate("IndividualTest", {
      data: state,
      type: "physical Condition",
    });
  };
  const handleCamera = () => {
    navigation.navigate("IndividualTest", { data: state, type: "camera" });
  };
  const hendleEarPhone = () => {
    navigation.navigate("IndividualTest", { data: state, type: "earphone" });
  };
  const handleFlash = () => {
    navigation.navigate("IndividualTest", { data: state, type: "flash" });
  };

  const handleMic = () => {
    navigation.navigate("IndividualTest", { data: state, type: "microphone" });
  };

  const handleSpeaker = () => {
    navigation.navigate("IndividualTest", { data: state, type: "speaker" });
  };

  const handleDisplay = () => {
    navigation.navigate("IndividualTest", { data: state, type: "display" });
  };
  const handleWifi = () => {
    navigation.navigate("IndividualTest", { data: state, type: "wifi" });
  };
  const handleBluetooth = () => {
    navigation.navigate("IndividualTest", { data: state, type: "bluetooth" });
  };
  const handleNetwork = () => {
    navigation.navigate("IndividualTest", { data: state, type: "network" });
  };
  const handleFingerPrint = () => {
    navigation.navigate("IndividualTest", { data: state, type: "fingerprint" });
  };
  const handleTouchScreen = () => {
    navigation.navigate("IndividualTest", {
      data: state,
      type: "touch screen",
    });
  };
  const handlePhysical = () => {
    navigation.navigate("IndividualTest", {
      data: state,
      type: "physical Buttons",
    });
  };

  const handleReciever = () => {
    navigation.navigate("IndividualTest", {
      data: state,
      type: "receiver",
    });
  };

  const handleSubmit = () => {
    console.log("dataData", state);

    navigation.navigate("Success", { data: state });
  };

  return {
    handleCamera,
    handleDisplay,
    handleBluetooth,
    handleFlash,
    handleVibration,
    handleMic,
    handleSpeaker,
    handleFingerPrint,
    handlePhysical,
    handleSubmit,
    handleReciever,
    handleDevice,
    hendleEarPhone,
    handleWifi,
    handleNetwork,
    handleTouchScreen,
    handleRotaion,
  };
};

export default useManualTest;
