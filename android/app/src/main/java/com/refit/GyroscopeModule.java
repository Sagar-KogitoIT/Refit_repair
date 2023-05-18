package com.refit;;

import android.content.pm.PackageManager;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class GyroscopeModule extends ReactContextBaseJavaModule{

    public GyroscopeModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "GyroscopeModule";
    }

    @ReactMethod
    public void isGyroScopeWorking(Promise promise){
        boolean hasSensor= getReactApplicationContext().getPackageManager().hasSystemFeature(PackageManager.FEATURE_SENSOR_GYROSCOPE);

        if (hasSensor){
            promise.resolve(true);
        }else{
            promise.reject(new Exception("Device does not have Gyroscope"));
        }
    }
}
