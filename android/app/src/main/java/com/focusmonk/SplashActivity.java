package com.focusmonk; // make sure this is your package name


import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Handler;
import android.provider.Settings;
import android.text.TextUtils;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SuppressLint("CustomSplashScreen")
public class SplashActivity extends AppCompatActivity {

    Handler handler;
    SharedPreferences sharedPreferences;
    AlertDialog dialog;
    SharedPreferences.Editor scoreEditor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.launch_screen);
        sharedPreferences = getSharedPreferences(Constant.pref,MODE_PRIVATE);
        scoreEditor = sharedPreferences.edit();

        handler = new Handler();
        dialog = new AlertDialog.Builder(SplashActivity.this)
                .setTitle("Accessibility Service Required")
                .setCancelable(false)
                .setMessage("FocusApp needs access to the AccessibilityService API to manage distractions by limiting non-essential apps. No personal data is collected or shared. Please enable this service to use the app's features.")
                .setPositiveButton("I Understand", (dialog, which) -> {
                    Intent intent = new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS);
                    startActivity(intent);
                })
                .setNegativeButton("Cancel", (dialog, which) -> {
                dialog.dismiss();
            // Optionally, you can add any other action you want to perform when the user denies the permission
                })
                .setIcon(android.R.drawable.ic_dialog_alert)
                .create();

        try {
            get_all_apps();
        } catch (PackageManager.NameNotFoundException e) {
            throw new RuntimeException(e);
        }

    }

    public void next(){
        handler.postDelayed(() -> {
            Intent intent = new Intent(SplashActivity.this, MainActivity.class);
            startActivity(intent);
            startService(new Intent(SplashActivity.this,MyService.class));
            finish();
        },5000);
    }

    public void get_all_apps() throws PackageManager.NameNotFoundException {
        List<ApplicationInfo> data = getPackageManager().getInstalledApplications(PackageManager.GET_META_DATA);
        Set<String> set = new HashSet<>();

        // add all the app name in string list
        for (ApplicationInfo info : data) {
            if ((info.flags & ApplicationInfo.FLAG_SYSTEM) != 1) {
                set.add(""+info.packageName);
            }
        }


        scoreEditor.putStringSet(Constant.getallapps, set);
        scoreEditor.apply();
    }

    void DoInit()
    {
        boolean set = isAccessibilitySettingsOn(this);
        if (set)
        {
            dialog.dismiss();
            next();
        }
        else
        {
            dialog.show();
        }
    }
    @Override
    protected void onResume() {
        DoInit();
        super.onResume();
    }

    private boolean isAccessibilitySettingsOn(Context mContext) {
        int accessibilityEnabled = 0;
        final String service = getPackageName() + "/" + MyService.class.getCanonicalName();
        try {
            accessibilityEnabled = Settings.Secure.getInt(
                    mContext.getApplicationContext().getContentResolver(),
                    android.provider.Settings.Secure.ACCESSIBILITY_ENABLED);
        } catch (Settings.SettingNotFoundException ignored) {
        }
        TextUtils.SimpleStringSplitter mStringColonSplitter = new TextUtils.SimpleStringSplitter(':');

        if (accessibilityEnabled == 1) {
            String settingValue = Settings.Secure.getString(
                    mContext.getApplicationContext().getContentResolver(),
                    Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
            if (settingValue != null) {
                mStringColonSplitter.setString(settingValue);
                while (mStringColonSplitter.hasNext()) {
                    String accessibilityService = mStringColonSplitter.next();

                    if (accessibilityService.equalsIgnoreCase(service)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

}