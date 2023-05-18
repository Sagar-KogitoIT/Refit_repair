package com.refit;;


import android.content.Context;
import android.hardware.fingerprint.FingerprintManager;
import android.os.Build;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class FingerPrintModule extends ReactContextBaseJavaModule  {
    FingerPrintModule(ReactApplicationContext context){
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "FingerPrintModule";
    }


    @ReactMethod
    public void getFingerPrintStatus(Promise promise){

        if (Build.VERSION.SDK_INT>=Build.VERSION_CODES.M){

            FingerprintManager fingerprintManager=(FingerprintManager) getReactApplicationContext().getSystemService(Context.FINGERPRINT_SERVICE);

            if (!fingerprintManager.isHardwareDetected()) {
                // Device doesn't support fingerprint authentication
                promise.reject(new Exception("Device does not have fingerprint sensor"));
            } else {
                // Everything is ready for fingerprint authentication
                promise.resolve("FingerPrint sensor is working perfectly");
            }
        }else{
            promise.reject(new Exception("Device does not support fingerprint sensor"));
        }
    }
}
