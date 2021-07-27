package com.rnelement;

import com.facebook.react.ReactActivity;
import androidx.annotation.Nullable;
import android.view.KeyEvent;
 
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "rnElement";
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();
        WritableMap params = Arguments.createMap();
        params.putInt("which", event.getKeyCode());
        if (event.getAction() == KeyEvent.ACTION_DOWN) {
            sendEvent(reactContext, "keydown", params);
        } else if (event.getAction() == KeyEvent.ACTION_UP) {
            sendEvent(reactContext, "keyup", params);
        }
        return super.dispatchKeyEvent(event);
    }
}
