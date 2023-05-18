package com.refit;

import android.content.pm.PackageManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class AccelerometerModule  extends ReactContextBaseJavaModule  {
    public AccelerometerModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "AccelerometerModule";
    }

    @ReactMethod
    public void hasAccelerometer(Promise promise){
        boolean hasSensor=getReactApplicationContext().getPackageManager().hasSystemFeature(PackageManager.FEATURE_SENSOR_ACCELEROMETER);
        if (hasSensor){
            promise.resolve(true);
        }else{
            promise.reject(new Exception("Accelerometer not found in device"));
        }
    }
}
