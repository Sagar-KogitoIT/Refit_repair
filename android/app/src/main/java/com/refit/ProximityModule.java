package com.refit;;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ProximityModule  extends ReactContextBaseJavaModule{

    ProximityModule(ReactApplicationContext context){
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "ProximityModule";
    }

    @ReactMethod
    public void checkProximitySensor(Promise promise){
        SensorManager sensorManager=(SensorManager)  getReactApplicationContext().getSystemService(Context.SENSOR_SERVICE);
        Sensor proxy=sensorManager.getDefaultSensor(Sensor.TYPE_PROXIMITY);
        if (proxy!=null){
            promise.resolve(true);
        }else{
            promise.reject(new Exception("Device does not support proximity sensor"));
        }
    }
}
