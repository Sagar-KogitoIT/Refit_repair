package com.refit;;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothManager;
import androidx.annotation.NonNull;


public class BluetoothModule extends ReactContextBaseJavaModule {
    BluetoothModule(ReactApplicationContext context){
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "BluetoothModule";
    }

    @ReactMethod
    public void isBluetoothAvailable(Promise promise){

        BluetoothManager bluetoothManager = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            bluetoothManager = getReactApplicationContext().getSystemService(BluetoothManager.class);
            BluetoothAdapter bluetoothAdapter = bluetoothManager.getAdapter();
            if (bluetoothAdapter == null) {
                promise.reject(new Exception("Device does not have bluetooth"));
            }else{
                promise.resolve(true);
            }
        }else{
            promise.reject(new Exception("Device does not support bluetooth"));
        }
    }
}
