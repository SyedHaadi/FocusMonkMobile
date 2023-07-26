package com.focusmonk;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.annotation.SuppressLint;
import android.app.ActivityManager;
import android.content.SharedPreferences;
import android.util.Log;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityNodeInfo;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.focusmonk.Model.ApiResponse;
import com.focusmonk.Model.ScheduleModel;

import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MyService extends AccessibilityService {
    public String browserApp="";
    public String browserUrl="";
    SharedPreferences sharedPreferences;

    ArrayList<String> extra = new ArrayList<>(
            Arrays.asList(
                    "com.google.android.apps.messaging",
                    "com.google.android.apps.authenticator2",
                    "com.google.android.apps.translate",
                    "com.google.android.apps.tachyon",
                    "com.google.android.apps.meetings",
                    "com.google.android.apps.docs",
                    "com.google.android.gm",
                    "com.google.android.dialer",
                    "com.google.android.contacts",
                    "com.google.android.apps.docs.editors.docs"
            ));

    ArrayList<String> browser_app_list = new ArrayList<>(
            Arrays.asList(
                    "com.android.chrome",
                    "org.mozilla.firefox",
                    "com.opera.browser",
                    "com.opera.mini.native",
                    "com.duckduckgo.mobile.android",
                    "com.microsoft.emmx",
                    "com.UCMobile.intl"
            ));
            

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        try{

            if (event.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED
                    || event.getEventType() == AccessibilityEvent.TYPE_WINDOWS_CHANGED
                    || event.getEventType() == AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED
            ) {

                sharedPreferences = getSharedPreferences(Constant.pref,MODE_PRIVATE);
                String token = sharedPreferences.getString(Constant.Token,"null");

                if (!token.equals("null")){
                    String[] getApps = allApps();
                    List<String> allapps = Arrays.asList(getApps);

                    String urls = sharedPreferences.getString(Constant.urls, null);
                    String checking = sharedPreferences.getString(Constant.apps_data,null);
                    String list = sharedPreferences.getString(Constant.android, null);

                    String packages = event.getPackageName().toString();

                    if (checking != null){
                        try {
                            JSONObject obj = new JSONObject(checking);
                            boolean duty = calculate_schedule();
                            if (duty){

                                if (list.contains(packages)) {
                                    //Site Checking...
                                    
                                    if (browser_app_list.contains(packages)){
                                        if (urls != null) {
                                            AccessibilityNodeInfo parentNodeInfo = event.getSource();
                                            if (parentNodeInfo != null) {
                                                String packageName = event.getPackageName().toString();

                                                SupportedBrowserConfig browserConfig = null;
                                                for (SupportedBrowserConfig supportedConfig : getSupportedBrowsers()) {
                                                    if (supportedConfig.packageName.equals(packageName)) {
                                                        browserConfig = supportedConfig;
                                                    }
                                                }

                                                //this is not supported browser, so exit
                                                if (browserConfig != null) {

                                                    String capturedUrl = captureUrl(parentNodeInfo, browserConfig);
                                                    parentNodeInfo.recycle();

                                                    if (capturedUrl != null) {

                                                        if (!packageName.equals(browserApp)) {
                                                            if (android.util.Patterns.WEB_URL.matcher(capturedUrl).matches()) {
                                                                browserApp = packageName;
                                                                browserUrl = capturedUrl;
                                                                capturedUrl = handleURL(capturedUrl);

                                                                if (!urls.contains(capturedUrl)) {
                                                                    if (obj.getBoolean("isBlock")) {
                                                                        performGlobalAction(GLOBAL_ACTION_BACK);
                                                                    }
                                                                    else if (obj.getBoolean("isOpen")) {
                                                                        makeDistract();
                                                                    }
                                                                }else{
                                                                    makeFocus();
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            if (!capturedUrl.equals(browserUrl)) {
                                                                if (android.util.Patterns.WEB_URL.matcher(capturedUrl).matches()) {
                                                                    browserUrl = capturedUrl;
                                                                    capturedUrl = handleURL(capturedUrl);

                                                                    if (!urls.contains(capturedUrl)) {
                                                                        if (obj.getBoolean("isBlock")) {
                                                                            performGlobalAction(GLOBAL_ACTION_BACK);
                                                                        }
                                                                        else if (obj.getBoolean("isOpen")) {
                                                                            makeDistract();
                                                                        }
                                                                    }else{
                                                                        makeFocus();
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else{
                                        makeFocus();
                                    }

                                }
                                else{

                                    if (allapps.contains(packages) && !extra.contains(packages)){
                                        if (obj.getBoolean("isBlock")){
                                            performGlobalAction(GLOBAL_ACTION_BACK);
                                            try{
                                                String p = event.getPackageName().toString();
                                                @SuppressLint("ServiceCast") ActivityManager am = (ActivityManager) getSystemService(ACCOUNT_SERVICE);
                                                am.killBackgroundProcesses(p);
                                            }catch (Exception ignored){
                                            }
                                            Toast.makeText(this, "This App is not in your Focus Environment", Toast.LENGTH_SHORT).show();
                                        }

                                        if (obj.getBoolean("isOpen")){
                                            makeDistract();
                                        }
                                    }
                                }


                            }
                        } catch (Throwable t) {
                            Log.e("My App", "Could not parse malformed JSON: \"" + checking + "\"");
                        }
                    }

                }

            }
        }catch (Exception e){
            Toast.makeText(this, ""+e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onInterrupt() {
    }

    public void makeFocus(){
        boolean status = sharedPreferences.getBoolean(Constant.status, false);

        if (!status) { 
            Toast.makeText(this, "You are in Focus Environment.", Toast.LENGTH_LONG).show();

            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.putBoolean(Constant.status, true);
            editor.apply();
            Api(true);
        }

    }

    public void makeDistract(){
        boolean status = sharedPreferences.getBoolean(Constant.status, false);

        if (status) {
            Toast.makeText(this, "You are Distracted...", Toast.LENGTH_LONG).show();

            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.putBoolean(Constant.status, false);
            editor.apply();
            Api(false);
        }
    }

    @Override
    protected void onServiceConnected() {
        super.onServiceConnected();

        String[] getApps = allApps();

        AccessibilityServiceInfo info = getServiceInfo();
        info.packageNames = getApps;
        info.eventTypes = AccessibilityEvent.TYPES_ALL_MASK;
        info.notificationTimeout = 100;
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_ALL_MASK;
        setServiceInfo(info);
    }

    public String[] allApps(){

        sharedPreferences = getSharedPreferences(Constant.pref,MODE_PRIVATE);
        Set<String> data = sharedPreferences.getStringSet(Constant.getallapps, null);

        String[] dummy = new String[]{
                "com.whatsapp.w4b",
                "com.mxtech.videoplayer.ad",
                "com.google.android.youtube",
                "com.google.android",
                "com.android.chrome",
                "com.facebook.katana",
                "com.whatsapp",
                "org.mozilla.firefox",
                "com.opera.browser",
                "com.opera.mini.native",
                "com.google.android.googlequicksearchbox",
                "com.duckduckgo.mobile.android",
                "com.microsoft.emmx",
                "com.sec.android.app.sbrowser"
        };

        if (data == null){
            return dummy;
        }else{
            String[] myArray = new String[data.size()];
            data.toArray(myArray);

            HashSet<String> unique = new HashSet<>(Arrays.asList(myArray));
            unique.addAll(Arrays.asList(dummy));
            String[] newArray = new String[unique.size()];

            unique.toArray(newArray);
            return newArray;
        }
    }

    public boolean calculate_schedule() throws JSONException {
        sharedPreferences = getSharedPreferences(Constant.pref,MODE_PRIVATE);

        Calendar calendar = Calendar.getInstance();
        int current_hour = calendar.get(Calendar.HOUR_OF_DAY);
        int current_minute = calendar.get(Calendar.MINUTE);
        int current_day = calendar.get(Calendar.DAY_OF_WEEK);

        current_day = current_day - 1;

        String input = sharedPreferences.getString(Constant.schedule,null);

        Log.d("DATEs","Day: "+current_day);

        JSONArray jsonArray = new JSONArray(input);
        Log.d("DATEs","Data: "+jsonArray);

        ArrayList<ScheduleModel> check = get_schedule_data(jsonArray,current_day);

        if (!check.isEmpty()) {

            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.putInt(Constant.today_duty_day,check.get(0).getDay());
            editor.apply();

            List<Integer> hours = Arrays.asList(check.get(0).getDuty_hours());
            if (hours.contains(current_hour)) {
                int index = hours.indexOf(current_hour);
                int last_index = hours.size() - 1;
                if (last_index == 0) {
                    String y = current_hour + ":" + check.get(0).getStart_minute();
                    String z = current_hour + ":" + check.get(0).getEnd_minute();
                    String x = current_hour + ":" + current_minute;
                    if (x.compareTo(y) >= 0 && x.compareTo(z) < 0) {
                        return calculate_break(check);
                    } else {
                        return false;
                    }
                } else if (index == last_index) {
                    String y = current_hour + ":" + check.get(0).getEnd_minute();
                    String z = current_hour + ":" + current_minute;
                    if (z.compareTo(y) >= 0) {
                        return false;
                    } else {
                        return calculate_break(check);
                    }
                } else if (index == 0) {
                    String y = current_hour + ":" + check.get(0).getStart_minute();
                    String z = current_hour + ":" + current_minute;
                    if (z.compareTo(y) >= 0) {
                        return calculate_break(check);
                    } else {
                        return false;
                    }
                } else {
                    return calculate_break(check);
                }
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

    public boolean calculate_break(ArrayList<ScheduleModel> check){
        Calendar calendar = Calendar.getInstance();
        int current_hour = calendar.get(Calendar.HOUR_OF_DAY);
        int current_minute = calendar.get(Calendar.MINUTE);

        List<Integer> break_hours = Arrays.asList(check.get(0).getBreak_hours());
        if (break_hours.contains(current_hour)) {
            int last_index = break_hours.size() - 1;

            String y = break_hours.get(0) + ":" + check.get(0).getBreak_start_time();
            String z = break_hours.get(last_index) + ":" + check.get(0).getBreak_end_time();
            String x = current_hour + ":" + current_minute;

            if (x.compareTo(y) >= 0 && x.compareTo(z) < 0) {
                return false;
            } else {
                return true;
            }

        } else {
            return true;
        }

    }


    private ArrayList<ScheduleModel> get_schedule_data(JSONArray jsonArray, int current_day) throws JSONException {
        ArrayList<ScheduleModel> check = new ArrayList<>();
        for (int i = 0; i < jsonArray.length(); i++) {

            if (jsonArray.getJSONObject(i).getInt("day") == current_day) {
                ScheduleModel m = new ScheduleModel();

                m.setDay(jsonArray.getJSONObject(i).getInt("day"));
                m.setBreak_end_time(jsonArray.getJSONObject(i).getString("break_end_minute"));
                m.setBreak_start_time(jsonArray.getJSONObject(i).getString("break_start_minute"));
                m.setStart_minute(jsonArray.getJSONObject(i).getString("start_minute"));
                m.setEnd_minute(jsonArray.getJSONObject(i).getString("end_minute"));


                JSONArray array_one = jsonArray.getJSONObject(i).getJSONArray("break_hours");
                Integer[] strArr = new Integer[array_one.length()];
                for (int j = 0; j < array_one.length(); j++) {
                    strArr[j] = array_one.getInt(j);
                }

                JSONArray array_two = jsonArray.getJSONObject(i).getJSONArray("duty_hours");
                Integer[] strArtwork = new Integer[array_two.length()];
                for (int k = 0; k < array_two.length(); k++) {
                    strArtwork[k] = array_two.getInt(k);
                }

                m.setBreak_hours(strArr);
                m.setDuty_hours(strArtwork);

                check.add(m);
            }
        }

        return check;
    }

    private void Api(boolean b) {

        Calendar calendar = Calendar.getInstance();
        int current_day = calendar.get(Calendar.DAY_OF_WEEK);
        current_day = current_day - 1;

        sharedPreferences = getSharedPreferences(Constant.pref,MODE_PRIVATE);
        String token = sharedPreferences.getString(Constant.Token,"");
        String device = sharedPreferences.getString(Constant.Device_Token,"");

        String userid = sharedPreferences.getString(Constant.user_id,"");
        String company_id = sharedPreferences.getString(Constant.company_id,"");


        Map<String, Object> param = new HashMap<>();
        param.put("status",b);
        param.put("device",device);
        param.put("date",new Date());
        param.put("employee_id",userid);
        param.put("company_id",company_id);
        param.put("dutyDay",""+current_day);

        try {
            Call<ApiResponse> call = Constant.getClient().coin_management(
                    param,
                    token
                    );
            call.enqueue(new Callback<ApiResponse>() {
                @Override
                public void onResponse(@NotNull Call<ApiResponse> call, @NotNull Response<ApiResponse> response) {
                    if (response.isSuccessful()) {
                        ApiResponse sd = response.body();
                        assert sd != null;
                    }
                }
                @Override
                public void onFailure(@NotNull Call<ApiResponse> call, @NotNull Throwable t) {
                    Log.e("ERROR", "onResponse: "+call);
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /////// Website Blocking Functions
    private static class SupportedBrowserConfig {
        public String packageName, addressBarId;
        public SupportedBrowserConfig(String packageName, String addressBarId) {
            this.packageName = packageName;
            this.addressBarId = addressBarId;
        }
    }

    @NonNull
    private static List<SupportedBrowserConfig> getSupportedBrowsers() {
        List<SupportedBrowserConfig> browsers = new ArrayList<>();
        browsers.add( new SupportedBrowserConfig("com.android.chrome", "com.android.chrome:id/url_bar"));
        browsers.add( new SupportedBrowserConfig("org.mozilla.firefox", "org.mozilla.firefox:id/mozac_browser_toolbar_url_view"));
        browsers.add( new SupportedBrowserConfig("com.opera.browser", "com.opera.browser:id/url_field"));
        browsers.add( new SupportedBrowserConfig("com.opera.mini.native", "com.opera.mini.native:id/url_field"));
        browsers.add( new SupportedBrowserConfig("com.duckduckgo.mobile.android", "com.duckduckgo.mobile.android:id/omnibarTextInput"));
        browsers.add( new SupportedBrowserConfig("com.microsoft.emmx", "com.microsoft.emmx:id/url_bar"));
        browsers.add( new SupportedBrowserConfig("com.UCMobile.intl", "com.UCMobile.intl:id/url_bar"));

        return browsers;
    }

    private String captureUrl(AccessibilityNodeInfo info, SupportedBrowserConfig config) {

        //  getChild(info);
        List<AccessibilityNodeInfo> nodes = info.findAccessibilityNodeInfosByViewId(config.addressBarId);
        if (nodes == null || nodes.size() == 0) {
            return null;
        }

        AccessibilityNodeInfo addressBarNodeInfo = nodes.get(0);
        String url = null;
        if (addressBarNodeInfo.getText() != null) {
            url = addressBarNodeInfo.getText().toString();
        }

        addressBarNodeInfo.recycle();
        return url;
    }

    public String handleURL(String url) throws MalformedURLException {
        URL newURL;
        if (url.startsWith("https://") || url.startsWith("http://")) {
            newURL = new URL(url);
        } else {
            newURL = new URL("https://" + url);
        }
        return newURL.getHost();
    }

}
