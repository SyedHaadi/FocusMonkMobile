package com.focusmonk;

import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CalendarModule extends ReactContextBaseJavaModule {

    SharedPreferences sharedPreferences;
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
    public void createCalendarEvent(String key, String value) {
        sharedPreferences = getReactApplicationContext().getSharedPreferences(Constant.pref, Context.MODE_PRIVATE);
        scoreEditor = sharedPreferences.edit();

        switch (key) {
            case "apps":
                Log.d("APPS", value);
                scoreEditor.putString(Constant.apps_data, value);
                scoreEditor.apply();
                break;
            case "android":
                Log.d("android", value);
                scoreEditor.putString(Constant.android, value);
                scoreEditor.apply();
                break;
            case "ios":
                Log.d("IOS", value);
                scoreEditor.putString(Constant.ios, value);
                scoreEditor.apply();
                break;
            case "schedule":
                Log.d("schedule", value);
                scoreEditor.putString(Constant.schedule, value);
                scoreEditor.apply();
                break;
            case "schedule-api":
                Log.d("schedule-api", value);
                scoreEditor.putString(Constant.schedule_api, value);
                scoreEditor.apply();
                break;
            case "token":
                Log.d("token", value);
                scoreEditor.putString(Constant.Token, value);
                scoreEditor.apply();
                break;
            case "device":
                Log.d("device", value);
                scoreEditor.putString(Constant.Device_Token, value);
                scoreEditor.apply();
                break;

            case "userid":
                scoreEditor.putString(Constant.user_id, value);
                scoreEditor.apply();
                break;

            case "companyid":
                scoreEditor.putString(Constant.company_id, value);
                scoreEditor.apply();
                break;

            case "urls":
                scoreEditor.putString(Constant.urls, value);
                scoreEditor.apply();
                break;


            case "clear":
                scoreEditor.clear();
                scoreEditor.apply();
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
        sharedPreferences = getReactApplicationContext().getSharedPreferences(Constant.pref, Context.MODE_PRIVATE);

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


