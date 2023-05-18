package com.refit;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class NetworkModule extends ReactContextBaseJavaModule {
    NetworkModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "NetworkModule";
    }


    @ReactMethod
    public void getNetworkStatus(Promise promise){
        try {
            ConnectivityManager connectivityManager = (ConnectivityManager) getReactApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);

            boolean connected = ((connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE).getState() == NetworkInfo.State.CONNECTED ||
                    connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI).getState() == NetworkInfo.State.CONNECTED));

            if (connected) {
                promise.resolve("Network is connected");
            } else {
                promise.reject(new Exception("Network is not connected"));
            }
        }catch (Exception e){
            promise.reject(e);
        }
    }
}