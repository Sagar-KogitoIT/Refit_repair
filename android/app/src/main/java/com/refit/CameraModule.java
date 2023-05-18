package com.refit;;

import android.annotation.SuppressLint;
import android.content.pm.PackageManager;
import android.hardware.Camera;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CameraModule extends ReactContextBaseJavaModule {

    CameraModule(ReactApplicationContext context){
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "CameraModule";
    }

    @ReactMethod
    public void checkForFrontCamera(Promise promise){


        if (getReactApplicationContext().getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_FRONT)) {
            Camera.CameraInfo cameraInfo = new Camera.CameraInfo();
            int numberOfCameras = Camera.getNumberOfCameras();
            for (int i = 0; i < numberOfCameras; i++) {
                Camera.getCameraInfo(i, cameraInfo);
                if (cameraInfo.facing == Camera.CameraInfo.CAMERA_FACING_FRONT) {
                    if (Camera.open() != null) {
                        promise.resolve(true);
                    } else {
                        promise.reject(new Exception("Could not open camera"));
                    }
                    return;
                }
            }
        }else {
            promise.reject(new Exception("Device does not support front camera"));
        }
    }

    @SuppressLint("UnsupportedChromeOsCameraSystemFeature")
    @ReactMethod
    public void checkForBackCamera(Promise promise){
        if (getReactApplicationContext().getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA)){
            Camera.CameraInfo cameraInfo = new Camera.CameraInfo();
            int numberOfCameras = Camera.getNumberOfCameras();
            for (int i = 0; i < numberOfCameras; i++) {
                Camera.getCameraInfo(i, cameraInfo);
                if (cameraInfo.facing == Camera.CameraInfo.CAMERA_FACING_BACK) {
                    if (Camera.open() != null) {
                        promise.resolve(true);
                        return;
                    } else {
                        promise.reject(new Exception("Could not open camera"));
                        return;
                    }
                }
            }
        }else{
            promise.reject(new Exception("Device does not support rear camera"));
        }
    }
}
