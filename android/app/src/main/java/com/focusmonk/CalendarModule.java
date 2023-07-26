package com.focusmonk;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Set;

public class CalendarModule extends ReactContextBaseJavaModule {

    SharedPreferences sharedPreferences = getReactApplicationContext().getSharedPreferences(Constant.pref, Context.MODE_PRIVATE);
    SharedPreferences.Editor scoreEditor;

    CalendarModule(ReactApplicationContext context) {
        super(context);
    }
    @NonNull
    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public void createCalendarEvent(String key, String value) throws JSONException {

        SharedPreferences.Editor editor = sharedPreferences.edit();

        switch (key) {
            case "apps":
                Log.d("APPS", value);
                editor.putString(Constant.apps_data, value);
                editor.apply();
                break;
            case "android":
                Log.d("android", value);
                editor.putString(Constant.android, value);
                editor.apply();
                break;
            case "ios":
                Log.d("IOS", value);
                editor.putString(Constant.ios, value);
                editor.apply();
                break;
            case "schedule":
                Log.d("schedule", value);
                editor.putString(Constant.schedule, value);
                editor.apply();
                break;
            case "schedule-api":
                Log.d("schedule-api", value);
                editor.putString(Constant.schedule_api, value);
                editor.apply();
                break;
            case "token":
                Log.d("token", value);
                editor.putString(Constant.Token, value);
                editor.apply();
                break;
            case "device":
                Log.d("device", value);
                editor.putString(Constant.Device_Token, value);
                editor.apply();
                break;

            case "userid":
                editor.putString(Constant.user_id, value);
                editor.apply();
                break;

            case "companyid":
                editor.putString(Constant.company_id, value);
                editor.apply();
                break;

            case "urls":
                editor.putString(Constant.urls, value);
                editor.apply();
                break;


            case "clear":
                editor.clear();
                editor.apply();
                break;

            case "get_all_apps":
                get_all_apps();
                break;

            case "openApps":

                try {
                    Intent intent = getReactApplicationContext().getPackageManager().getLaunchIntentForPackage(value);
                    if (intent != null) {
                        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        getReactApplicationContext().startActivity(intent);
                    }  // App not found, handle the error

                } catch (ActivityNotFoundException ignored) {
                }
                break;

        }
    }

    public void get_all_apps() {
        scoreEditor = sharedPreferences.edit();
        List<ApplicationInfo> data = getReactApplicationContext().getPackageManager().getInstalledApplications(PackageManager.GET_META_DATA);
        Set<String> set = new HashSet<>();
        // add all the app name in string list
        for (ApplicationInfo info : data) {
            if ((info.flags & ApplicationInfo.FLAG_SYSTEM) != 1) {
                set.add(""+info.packageName);
            }
        }
        scoreEditor.putStringSet(Constant.getallapps, set);
        scoreEditor.apply();

        getReactApplicationContext().startService(new Intent(getReactApplicationContext(),MyService.class));

    }


}


