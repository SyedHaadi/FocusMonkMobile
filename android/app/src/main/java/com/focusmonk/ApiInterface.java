package com.focusmonk;


import com.focusmonk.Model.ApiResponse;

import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;

public interface ApiInterface {

    @Headers("Accept: application/json")
    @POST("managment/coinmanagment")
    Call<ApiResponse> coin_management(
            @Body Map<String, Object> body,
            @Header("x-access-token") String token
    );


}







