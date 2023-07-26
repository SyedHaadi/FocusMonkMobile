package com.focusmonk;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class Constant {

    public static String main_url = "https://focusmonk-app-uv729.ondigitalocean.app/api/";

    public static String pref = "focusmonk_preference";

    public static String status = "current_status";

    public static String apps_data = "apps_data";
    public static String android = "android";
    public static String ios = "ios";
    public static String schedule = "schedule";

    public static String schedule_api = "schedule-api";
    public static String Token = "token";
    public static String Device_Token = "device";

    public static String getallapps = "getallapps";

    public static String user_id = "userid";
    public static String company_id = "companyid";

    public static String urls = "urls";

    public static String today_duty_day = "today_duty_day";

    public static com.focusmonk.ApiInterface getClient() {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(main_url)
                .addConverterFactory(GsonConverterFactory.create())
                .client(getOkHttpClient())
                .build();
        return retrofit.create(com.focusmonk.ApiInterface.class);
    }

    private static OkHttpClient getOkHttpClient() {
        return new OkHttpClient.Builder()
                .connectTimeout(40, TimeUnit.SECONDS)
                .readTimeout(40, TimeUnit.SECONDS)
                .build();
    }

}
