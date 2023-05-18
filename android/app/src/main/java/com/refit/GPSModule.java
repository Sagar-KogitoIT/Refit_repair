package com.refit;;

import android.content.Context;
import android.location.LocationManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class GPSModule extends ReactContextBaseJavaModule {


    GPSModule(ReactApplicationContext context){
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "GPSModule";
    }

    @ReactMethod
    public void checkGPSStatus(Promise promise){
        LocationManager manager =(LocationManager) getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);

        if (manager.isProviderEnabled(LocationManager.GPS_PROVIDER)){
            promise.resolve(true);
        }else{
            promise.reject(new Exception("GPS dose not detect."));
        }
    }


}