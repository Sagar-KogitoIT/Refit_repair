package com.refit;;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class WifiModule extends ReactContextBaseJavaModule {

    WifiModule(ReactApplicationContext context){
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "WifiModule";
    }

    @ReactMethod
    public void getWifiStatus(Promise promise){
        ConnectivityManager connectivityManager = (ConnectivityManager)getReactApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        boolean connected =(connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI).getState() == NetworkInfo.State.CONNECTED);
        if (connected){
            promise.resolve("Wifi is connected");
        }else{
            promise.reject(new Exception("Wifi is not connected"));
        }
    }
}
