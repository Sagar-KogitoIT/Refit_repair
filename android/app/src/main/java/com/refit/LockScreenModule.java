package com.refit;;

import android.app.KeyguardManager;
import android.content.Context;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class LockScreenModule extends ReactContextBaseJavaModule {

    public LockScreenModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "LockScreenModule";
    }

    @ReactMethod
    public void getLockScreenStatus(Promise promise){
        KeyguardManager myKM = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            myKM = (KeyguardManager) getReactApplicationContext().getSystemService(Context.KEYGUARD_SERVICE);
            if (myKM.inKeyguardRestrictedInputMode()) {
                //it is locked
                promise.resolve("Device is lock");
            } else {
                //it is not locked
                promise.resolve("Device is unlock");
            }
        }else {
            promise.reject(new Exception("Could not get any information"));
        }
    }
}
