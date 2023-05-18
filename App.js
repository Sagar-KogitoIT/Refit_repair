import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import SplashScreen from "./src/componant/splash";
import RootNavigation from "./src/Navigation/RootNavigation";
//test demo
const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? <SplashScreen /> : <RootNavigation />}
    </SafeAreaView>
  );
};

export default App;
