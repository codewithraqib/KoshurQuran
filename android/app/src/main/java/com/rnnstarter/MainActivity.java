package com.bracecapps.faizulwaheed;
import android.content.Intent;
import android.os.Bundle;
 
import com.emekalites.react.alarm.notification.BundleJSONConverter;
import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.DeviceEventManagerModule;
 
import org.json.JSONObject;

import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {

    //  @Override
    // public void onNewIntent(Intent intent) {
    //     super.onNewIntent(intent);
    //     try {
    //         Bundle bundle = intent.getExtras();
    //         if (bundle != null) {
    //             JSONObject data = BundleJSONConverter.convertToJSON(bundle);
    //             getReactInstanceManager().getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("OnNotificationOpened", data.toString());
    //         }
    //     } catch (Exception e) {
    //         System.err.println("Exception when handling notification opened. " + e);
    //     }
    // }
}
