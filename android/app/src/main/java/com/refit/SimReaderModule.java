package com.refit;;


import android.content.Context;
import android.telephony.TelephonyManager;

import androidx.annotation.NonNull;

// import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
public class SimReaderModule extends ReactContextBaseJavaModule {

    SimReaderModule(ReactApplicationContext context){
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "SimReaderModule";
    }

    @ReactMethod
    public void getSim1Status(Promise promise) {
        TelephonyManager telMgr = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            telMgr = (TelephonyManager) getReactApplicationContext().getSystemService(Context.TELEPHONY_SERVICE);
            int simState = 0;
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                simState = telMgr.getSimState(0);
                // callback.invoke("This is sim slot 1 details");
                switch (simState) {
                    case TelephonyManager.SIM_STATE_ABSENT:
                        promise.reject(new Exception("Sim state is absent"));
                        break;
                    case TelephonyManager.SIM_STATE_NETWORK_LOCKED:
                        promise.reject(new Exception("Sim network is looked"));
                        break;
                    case TelephonyManager.SIM_STATE_PIN_REQUIRED:
                        promise.reject(new Exception("Sim state pin required"));
                        break;
                    case TelephonyManager.SIM_STATE_PUK_REQUIRED:
                        promise.reject(new Exception("Sim state PUK required"));
                        break;
                    case TelephonyManager.SIM_STATE_READY:
                        promise.resolve("Sim state is ready");
                        break;
                    case TelephonyManager.SIM_STATE_UNKNOWN:
                        promise.reject(new Exception("Sim state is unknown"));
                        break;
                    case TelephonyManager.SIM_STATE_CARD_IO_ERROR:
                        promise.reject(new Exception("Sim state IO error"));
                        break;
                    case TelephonyManager.SIM_STATE_CARD_RESTRICTED:
                        promise.reject(new Exception("Sim state card  restricted"));
                        break;
                    case TelephonyManager.SIM_STATE_NOT_READY:
                        promise.reject(new Exception("Sim state is not ready"));
                        break;
                    case TelephonyManager.SIM_STATE_PERM_DISABLED:
                        promise.reject(new Exception("Sim state perm is disable"));
                        break;
                }
            }else {
                // callback.invoke("This is general sim details");
                simState = telMgr.getSimState();
                switch (simState) {
                    case TelephonyManager.SIM_STATE_ABSENT:
                        promise.reject(new Exception("Sim state is absent"));
                        break;
                    case TelephonyManager.SIM_STATE_NETWORK_LOCKED:
                        promise.reject(new Exception("Sim network is looked"));
                        break;
                    case TelephonyManager.SIM_STATE_PIN_REQUIRED:
                        promise.reject(new Exception("Sim state pin required"));
                        break;
                    case TelephonyManager.SIM_STATE_PUK_REQUIRED:
                        promise.reject(new Exception("Sim state PUK required"));
                        break;
                    case TelephonyManager.SIM_STATE_READY:
                        promise.resolve("Sim state is ready");
                        break;
                    case TelephonyManager.SIM_STATE_UNKNOWN:
                        promise.reject(new Exception("Sim state is unknown"));
                        break;
                    case TelephonyManager.SIM_STATE_CARD_IO_ERROR:
                        promise.reject(new Exception("Sim state IO error"));
                        break;
                    case TelephonyManager.SIM_STATE_CARD_RESTRICTED:
                        promise.reject(new Exception("Sim state card  restricted"));
                        break;
                    case TelephonyManager.SIM_STATE_NOT_READY:
                        promise.reject(new Exception("Sim state is not ready"));
                        break;
                    case TelephonyManager.SIM_STATE_PERM_DISABLED:
                        promise.reject(new Exception("Sim state perm is disable"));
                        break;
                }
            }
        }else {
            promise.reject(new Exception("Can not get status of sim"));
        }
    }

    @ReactMethod
    public void getSim2Status(Promise promise){
        TelephonyManager telMgr = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            telMgr = (TelephonyManager) getReactApplicationContext().getSystemService(Context.TELEPHONY_SERVICE);
            int simState = 0;
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                simState = telMgr.getSimState(1);
                // callback.invoke("This is sim slot 2 details");
                switch (simState) {
                    case TelephonyManager.SIM_STATE_ABSENT:
                        promise.reject(new Exception("Sim state is absent"));
                        break;
                    case TelephonyManager.SIM_STATE_NETWORK_LOCKED:
                        promise.reject(new Exception("Sim network is looked"));
                        break;
                    case TelephonyManager.SIM_STATE_PIN_REQUIRED:
                        promise.reject(new Exception("Sim state pin required"));
                        break;
                    case TelephonyManager.SIM_STATE_PUK_REQUIRED:
                        promise.reject(new Exception("Sim state PUK required"));
                        break;
                    case TelephonyManager.SIM_STATE_READY:
                        promise.resolve("Sim state is ready");
                        break;
                    case TelephonyManager.SIM_STATE_UNKNOWN:
                        promise.reject(new Exception("Sim state is unknown"));
                        break;
                    case TelephonyManager.SIM_STATE_CARD_IO_ERROR:
                        promise.reject(new Exception("Sim state IO error"));
                        break;
                    case TelephonyManager.SIM_STATE_CARD_RESTRICTED:
                        promise.reject(new Exception("Sim state card  restricted"));
                        break;
                    case TelephonyManager.SIM_STATE_NOT_READY:
                        promise.reject(new Exception("Sim state is not ready"));
                        break;
                    case TelephonyManager.SIM_STATE_PERM_DISABLED:
                        promise.reject(new Exception("Sim state perm is disable"));
                        break;
                }
            }else {
                // callback.invoke("This is general sim details");
                simState = telMgr.getSimState();
                switch (simState) {
                    case TelephonyManager.SIM_STATE_ABSENT:
                        promise.reject(new Exception("Sim state is absent"));
                        break;
                    case TelephonyManager.SIM_STATE_NETWORK_LOCKED:
                        promise.reject(new Exception("Sim network is looked"));
                        break;
                    case TelephonyManager.SIM_STATE_PIN_REQUIRED:
                        promise.reject(new Exception("Sim state pin required"));
                        break;
                    case TelephonyManager.SIM_STATE_PUK_REQUIRED:
                        promise.reject(new Exception("Sim state PUK required"));
                        break;
                    case TelephonyManager.SIM_STATE_READY:
                        promise.resolve("Sim state is ready");
                        break;
                    case TelephonyManager.SIM_STATE_UNKNOWN:
                        promise.reject(new Exception("Sim state is unknown"));
                        break;
                    case TelephonyManager.SIM_STATE_CARD_IO_ERROR:
                        promise.reject(new Exception("Sim state IO error"));
                        break;
                    case TelephonyManager.SIM_STATE_CARD_RESTRICTED:
                        promise.reject(new Exception("Sim state card  restricted"));
                        break;
                    case TelephonyManager.SIM_STATE_NOT_READY:
                        promise.reject(new Exception("Sim state is not ready"));
                        break;
                    case TelephonyManager.SIM_STATE_PERM_DISABLED:
                        promise.reject(new Exception("Sim state perm is disable"));
                        break;
                }
            }
        }else {
            promise.reject(new Exception("Can not get status of sim"));
        }
    }
}
