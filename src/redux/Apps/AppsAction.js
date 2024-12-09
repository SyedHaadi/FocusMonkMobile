import axios from 'axios';
import { Alert, Platform, NativeModules } from 'react-native';
import http from '../../config/http';
import { baseUrl } from '../../config/http';
import Toast from 'react-native-toast-message';
import { getLocalStorage, setLocalStorage } from '../../shared/functions';
import { STORAGE_KEYS } from '../../shared/constants';
import { navigate } from '../../Navigation/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAppLoading } from '../AppLoader/appLoaderAction';
const { CalendarModule } = NativeModules;

export const SET_APPS = 'SET_APPS';
export const GET_RANK_STATUS = 'GET_RANK_STATUS';
export const GET_COINS_TROPHIES = 'GET_COINS_TROPHIES';
export const GET_SCALEABLE = 'GET_SCALEABLE';

export const setApps = payload => async dispatch => {

  const companyId = await getLocalStorage(STORAGE_KEYS.COMPANY_ID);
  const token = await getLocalStorage(STORAGE_KEYS.TOKEN);

  if (payload) {
    dispatch(setAppLoading(false));
  } else {
    dispatch(setAppLoading(true));
  }

  try {
    const response = await axios.get(`${baseUrl}/blockapp/companyid/${companyId}`, {
      headers: {
        'x-access-token': token
      }
    });
    // console.log("This is the set Apps rsponse .....", response?.data[0]);
    dispatch(setAppLoading(false));

    if (response?.status === 200) {

      let data = response.data[0];
      let apps = response?.data[0]?.blockapps;
      let site = response?.data[0]?.blockurls;

      let app_android = [];
      let app_ios = [];
      let urls = [];;
      urls.push("bing.com");

      app_android.push("com.focusmonk");
      app_android.push("com.focusmonk1");


      if (apps) {

        apps.forEach((data) => {
          if (Platform.OS == 'android') {
            app_android.push(data.android);
          } else {
            app_ios.push(data.ios);
          }

          if (data?.url) {

            let temp = data?.url;
            if (temp.includes(",")) {
              let d = temp.split(",");
              for (let b of d) {
                urls.push(b);
              }
            } else {
              if (data.url != "") {
                urls.push(data.url);
              }
            }
          }
        });

      }

      if (site) {

        site.forEach((data) => {
          if (data) {
            urls.push(data);
          }
        });

      }


      //save locally
      if (Platform.OS == 'android') {
        data ? CalendarModule.createCalendarEvent('apps', JSON.stringify(data)) : "";
        app_android ? CalendarModule.createCalendarEvent('android', JSON.stringify(app_android)) : "";
        urls ? CalendarModule.createCalendarEvent('urls', urls.toString()) : "";

        CalendarModule.createCalendarEvent('get_all_apps', '');

        // app_ios ? CalendarModule.createCalendarEvent('ios', JSON.stringify(app_ios)) : "";
      }

      dispatch({
        type: SET_APPS,
        payload: { apps: response?.data[0]?.blockapps, urls: response?.data[0]?.blockurls, environment: response?.data[0]?.isBlock === true ? 'Strick Lock' : 'Soft Lock', data: response?.data },
      });

    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    }

  } catch (error) {
    dispatch(setAppLoading(false));
    // console.log("Catch Error Set Apps.......", error.message)
    if (error.toJSON().message === 'Network Error') {
      Toast.show({
        type: 'error',
        text1: 'No internet connection !',
      });
    }
    else if (error?.response?.data) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  }
};

export const getCoinsTrophies = payload => async dispatch => {

  const userId = await getLocalStorage(STORAGE_KEYS.USER_ID);
  const token = await getLocalStorage(STORAGE_KEYS.TOKEN);
  dispatch(setAppLoading(true));

  try {
    const response = await axios.get(`${baseUrl}/coins/getcoinandtrophy/${userId}`, {
      headers: {
        'x-access-token': token
      }
    });
    // console.log("This is the get Coins and trophies response .....", response);
    dispatch(setAppLoading(false));

    if (response?.status === 200) {
      dispatch({
        type: GET_COINS_TROPHIES,
        payload: response?.data,
      });

    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    }

  } catch (error) {
    dispatch(setAppLoading(false));
    // console.log("Catch Error .......", error.message)
    if (error.toJSON().message === 'Network Error') {
      Toast.show({
        type: 'error',
        text1: 'No internet connection !',
      });
    }
    else if (error?.response?.data) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  }
};


export const getRankStatus = payload => async dispatch => {

  const companyId = await getLocalStorage(STORAGE_KEYS.COMPANY_ID);
  const token = await getLocalStorage(STORAGE_KEYS.TOKEN);

  if (payload) {
    dispatch(setAppLoading(false));
  } else {
    dispatch(setAppLoading(true));
  }


  try {
    const body = {
      "company_id": companyId
    }
    const response = await axios.post(`${baseUrl}/coins/gettingranks`, body, {
      headers: {
        'x-access-token': token
      }
    });
    // console.log("This is the get Rank status rsponse .....", response?.data);
    dispatch(setAppLoading(false));

    if (response?.status === 200) {
      dispatch({
        type: GET_RANK_STATUS,
        payload: response?.data?.data,
      });
      dispatch({
        type: GET_SCALEABLE,
        payload: response?.data,
      });
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    }

  } catch (error) {
    dispatch(setAppLoading(false));
    // console.log("Catch Error .......", error.message)
    if (error.toJSON().message === 'Network Error') {
      Toast.show({
        type: 'error',
        text1: 'No internet connection !',
      });
    }
    else if (error?.response?.data) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  }
};

export const getTotalRank = payload => async dispatch => {

  const companyId = await getLocalStorage(STORAGE_KEYS.COMPANY_ID);
  const token = await getLocalStorage(STORAGE_KEYS.TOKEN);

  if (payload) {
    dispatch(setAppLoading(false));
  } else {
    dispatch(setAppLoading(true));
  }

  try {
    const body = {
      "company_id": companyId
    }
    const response = await axios.post(`${baseUrl}/coins/gettingranks`, body, {
      headers: {
        'x-access-token': token
      }
    });
    // console.log("This is the get Rank YEhi status rsponse .....", response?.data);
    dispatch(setAppLoading(false));

    if (response?.status === 200) {
      dispatch({
        type: GET_RANK_STATUS,
        payload: response?.data?.data,
      });
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    }

  } catch (error) {
    dispatch(setAppLoading(false));
    // console.log("Catch Error .......", error.message)
    if (error.toJSON().message === 'Network Error') {
      Toast.show({
        type: 'error',
        text1: 'No internet connection !',
      });
    }
    else if (error?.response?.data) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  }
};

export const getTodayRank = payload => async dispatch => {

  const companyId = await getLocalStorage(STORAGE_KEYS.COMPANY_ID);
  const token = await getLocalStorage(STORAGE_KEYS.TOKEN);

  if (payload) {
    dispatch(setAppLoading(false));
  } else {
    dispatch(setAppLoading(true));
  }


  try {
    const body = {
      "company_id": companyId
    }
    const response = await axios.post(`${baseUrl}/coins/gettingtodayranks`, body, {
      headers: {
        'x-access-token': token
      }
    });
    // console.log("This is the get Rank YEhi status rsponse .....", response?.data);
    dispatch(setAppLoading(false));

    if (response?.status === 200) {
      dispatch({
        type: GET_RANK_STATUS,
        payload: response?.data?.data,
      });
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    }

  } catch (error) {
    dispatch(setAppLoading(false));
    // console.log("Catch Error .......", error.message)
    if (error.toJSON().message === 'Network Error') {
      Toast.show({
        type: 'error',
        text1: 'No internet connection !',
      });
    }
    else if (error?.response?.data) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  }
};


export const getWeeklyRank = payload => async dispatch => {

  const companyId = await getLocalStorage(STORAGE_KEYS.COMPANY_ID);
  const token = await getLocalStorage(STORAGE_KEYS.TOKEN);

  if (payload) {
    dispatch(setAppLoading(false));
  } else {
    dispatch(setAppLoading(true));
  }


  try {
    const body = {
      "company_id": companyId
    }
    const response = await axios.post(`${baseUrl}/coins/gettingweeklyranks`, body, {
      headers: {
        'x-access-token': token
      }
    });
    // console.log("This is the get Rank YEhi status rsponse .....", response?.data);
    dispatch(setAppLoading(false));

    if (response?.status === 200) {
      dispatch({
        type: GET_RANK_STATUS,
        payload: response?.data?.data,
      });
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    }

  } catch (error) {
    dispatch(setAppLoading(false));
    // console.log("Catch Error .......", error.message)
    if (error.toJSON().message === 'Network Error') {
      Toast.show({
        type: 'error',
        text1: 'No internet connection !',
      });
    }
    else if (error?.response?.data) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  }
};


export const getMonthlyRank = payload => async dispatch => {

  const companyId = await getLocalStorage(STORAGE_KEYS.COMPANY_ID);
  const token = await getLocalStorage(STORAGE_KEYS.TOKEN);

  if (payload) {
    dispatch(setAppLoading(false));
  } else {
    dispatch(setAppLoading(true));
  }


  try {
    const body = {
      "company_id": companyId
    }
    const response = await axios.post(`${baseUrl}/coins/gettingmonthlyranks`, body, {
      headers: {
        'x-access-token': token
      }
    });
    // console.log("This is the get Rank YEhi status rsponse .....", response?.data);
    dispatch(setAppLoading(false));

    if (response?.status === 200) {
      dispatch({
        type: GET_RANK_STATUS,
        payload: response?.data?.data,
      });
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    }

  } catch (error) {
    dispatch(setAppLoading(false));
    // console.log("Catch Error .......", error.message)
    if (error.toJSON().message === 'Network Error') {
      Toast.show({
        type: 'error',
        text1: 'No internet connection !',
      });
    }
    else if (error?.response?.data) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  }
};