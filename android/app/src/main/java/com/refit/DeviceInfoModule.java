package com.refit;

//import static com.refit.StorageModule.externalMemoryAvailable;
import static android.content.Context.ACTIVITY_SERVICE;
import android.content.Context;
import android.os.Build;
import android.os.Environment;
import android.os.StatFs;
import android.telephony.TelephonyManager;
import android.app.ActivityManager;
import android.annotation.SuppressLint;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.io.File;
import java.text.DecimalFormat;

public class DeviceInfoModule extends ReactContextBaseJavaModule {
    DeviceInfoModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "DeviceInfoModule";
    }

    @ReactMethod
    public void getDeviceModel(Promise promise) {
        String deviceModel = Build.MODEL;
        promise.resolve(deviceModel);
    }

    @ReactMethod
    public void getDeviceBrand(Promise promise) {
        String deviceBrand = Build.MANUFACTURER;
        promise.resolve(deviceBrand);
    }

    @SuppressLint("HardwareIds")
    @ReactMethod
    public void getDeviceId(Promise promise) {
    TelephonyManager telephonyManager=(TelephonyManager)getReactApplicationContext().getSystemService(Context.TELEPHONY_SERVICE);
    String IMEI = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
        IMEI = telephonyManager.getImei().toString();
    }
        promise.resolve(IMEI);
    }


// @ReactMethod
//     public void getInternalMemoryInfo(Promise promise) {
//         StatFs stat = new StatFs(Environment.getDataDirectory().getPath());
//         long bytesAvailable;
//         bytesAvailable = stat.getBlockSizeLong() * stat.getAvailableBlocksLong();
//         // long megAvailable = bytesAvailable / (1000 * 1000);
//         // long megTotal;
//         // megTotal = (stat.getBlockSizeLong() * stat.getBlockCountLong()) / (1000 * 1000);
//         // String bytesAvailable =  bytesAvailable
//         promise.resolve(""+bytesAvailable);

//     }

    @ReactMethod
    public void getInternalMemoryInfo(Promise promise) {
        try {
            StatFs statFs = new StatFs(Environment.getDataDirectory().getPath());
            long byteAvailable = statFs.getBlockSizeLong() * statFs.getAvailableBlocksLong() ;
            long byteTotal = statFs.getBlockSizeLong() * statFs.getBlockCountLong() ;
            promise.resolve(""+byteAvailable);
        } catch (Exception e) {
            promise.reject(e);
            }
        }

   
    @ReactMethod
    public void getTotalInternalMemorySize(Promise promise) {
        try {
            StatFs statFs = new StatFs(Environment.getDataDirectory().getPath());
            long byteAvailable = statFs.getBlockSizeLong() * statFs.getAvailableBlocksLong() ;
            long byteTotal = statFs.getBlockSizeLong() * statFs.getBlockCountLong() ;
            promise.resolve(""+byteTotal);
        } catch (Exception e) {
            promise.reject(e);
            }
        }



    public static String formatSize(long size) {
        String suffix = null;

        if (size >= 1024) {
            suffix = "KB";
            size /= 1024;
            if (size >= 1024) {
                suffix = "MB";
                size /= 1024;
            }
        }

        StringBuilder resultBuffer = new StringBuilder(Long.toString(size));

        int commaOffset = resultBuffer.length() - 3;
        while (commaOffset > 0) {
            resultBuffer.insert(commaOffset, ',');
            commaOffset -= 3;
        }

        if (suffix != null) resultBuffer.append(suffix);
        return resultBuffer.toString();
    }

}
