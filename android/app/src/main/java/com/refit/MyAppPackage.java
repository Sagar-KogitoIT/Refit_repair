package com.refit;;
import com.facebook.react.ReactPackage;
        import com.facebook.react.bridge.NativeModule;
        import com.facebook.react.bridge.ReactApplicationContext;
        import com.facebook.react.uimanager.ViewManager;

        import java.util.ArrayList;
        import java.util.Collections;
        import java.util.List;

public class MyAppPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new AccelerometerModule(reactContext));
        modules.add(new BluetoothModule(reactContext));
        modules.add(new CameraModule(reactContext));
        modules.add(new DeviceInfoModule(reactContext));
        modules.add(new EarpieceModule(reactContext));
        modules.add(new FingerPrintModule(reactContext));
        modules.add(new GPSModule(reactContext));
        modules.add(new GyroscopeModule(reactContext));
        modules.add(new LockScreenModule(reactContext));
        modules.add(new NetworkModule(reactContext));
        modules.add(new ProximityModule(reactContext));
        modules.add(new SimReaderModule(reactContext));
        modules.add(new WifiModule(reactContext));

        return modules;
    }

}