import React, { createContext, useEffect, useState } from "react";

const CreateRefitContext = createContext();

const RefitProvider = ({ children }) => {
  const [deviceState, setDeviceState] = useState({
    deviceModel: "",
    deviceBrand: "",
    deviceName: "",
    isCharging: false,
  });
  const [employeeId, setEmployeeId] = useState(true);
  const [IMEI, setIMEI] = useState(true);
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const setDashboardData = async (state) => {
    try {
      setDeviceState(state);
    } catch (err) {
      console.log(err);
    }
  };

  const setEmployeeContext = async (EmployeeId) => {
    setEmployeeId(EmployeeId);
  };

  const setIMEIContext = async (IMEI) => {
    setIMEI(IMEI);
  };
  const setRamContext = async (ram) => {
    setRam(ram);
  };
  const setStorageContext = async (storage) => {
    setStorage(storage);
  };
  useEffect(() => {
    console.log(deviceState);
  }, [deviceState]);

  useEffect(() => {
    console.log(employeeId);
  }, [employeeId]);

  useEffect(() => {
    console.log(IMEI);
  }, [IMEI]);
  useEffect(() => {
    console.log("contextRam", ram);
  }, [ram]);
  useEffect(() => {
    console.log("contextStore", storage);
  }, [storage]);
  return (
    <CreateRefitContext.Provider
      value={{
        deviceState,
        setDeviceState,
        setEmployeeContext,
        setIMEIContext,
        setRamContext,
        setStorageContext,
        storage,
        ram,
        IMEI,
        employeeId,
      }}
    >
      {children}
    </CreateRefitContext.Provider>
  );
};
export { CreateRefitContext, RefitProvider };
