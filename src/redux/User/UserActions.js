import axios from 'axios';
import { Alert, NativeModules, Platform } from 'react-native';
import http from '../../config/http';
import { baseUrl } from '../../config/http';
import Toast from 'react-native-toast-message';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../shared/functions';
import { STORAGE_KEYS } from '../../shared/constants';
import { navigate } from '../../Navigation/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setAppLoading } from '../AppLoader/appLoaderAction';
import BackgroundService from 'react-native-background-actions';
import { CommonActions } from '@react-navigation/native';

export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_RANK_TROPHY = 'GET_USER_RANK_TROPHY';
export const GET_TIME_DATA = 'GET_TIME_DATA';
export const SET_MANAGMENT_DATA = "SET_MANAGMENT_DATA";

const SET_SCHEDULE = 'SET_SCHEDULE';

const { CalendarModule } = NativeModules;


export const getUserData = navigation => async dispatch => {
  const token = await getLocalStorage(STORAGE_KEYS.TOKEN);
  dispatch(setAppLoading(true));

  try {
    const response = await axios.get(`${baseUrl}/employees/authenticate`, {
      headers: {
        'x-access-token': token
      }
    });
    dispatch(setAppLoading(false));

    if (response?.status === 200) {

      if (Platform.OS == 'android') {
        CalendarModule.createCalendarEvent('userid', response.data.user._id);
        CalendarModule.createCalendarEvent('companyid', response.data.user.company_id._id);
      }

      dispatch({
        type: GET_USER_DATA,
        payload: response?.data?.user,
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
    console.log("Catch Error User Data.......", error.message);
    
    if (
      error?.response?.data?.message == "Unauthorized" ||
      error?.response?.status == 401
  ) {
      try {
          removeLocalStorage(STORAGE_KEYS.TOKEN);
          CalendarModule.createCalendarEvent('clear', "");

          stopBackgroundService();
          navigation.dispatch(
              CommonActions.reset({
                  index: 1,
                  routes: [
                      { name: 'Login' },
                  ],
              })
          );
      } catch (err) {
          console.log(err);
      }

  }
    
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
    } else if (error?.request) {
      Toast.show({
        type: 'error',
        text1: error?.request,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  }
};

export const updateUserData = (data) => async dispatch => {

  // console.log("User Data going to be Update ......", data);
  const userId = await getLocalStorage(STORAGE_KEYS.USER_ID);
  const companyId = await getLocalStorage(STORAGE_KEYS.COMPANY_ID);
  const token = await getLocalStorage(STORAGE_KEYS.TOKEN);

  // console.log("This is the all data on request ....", userId, "Token", token, "Data", data);
  dispatch(setAppLoading(true));

  try {
    const response = await axios.put(`${baseUrl}/employees/${userId}`, data, {
      headers: {
        "Content-Type": "application/json",
        'x-access-token': token
      }
    }
    );

    dispatch(setAppLoading(false));
    if (response?.status) {
      dispatch(getUserData());

      Alert.alert('Success', response?.data?.message, [
        { text: 'OK', onPress: () => navigate('DashBoard') },
      ]);

    }
    else {
      Toast.show({
        type: 'error',
        text1: response?.data?.message,
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
    } else if (error?.request) {
      Toast.show({
        type: 'error',
        text1: error?.request,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  }
};

export const getUserRankTrophy = payload => async dispatch => {

  const companyId = await getLocalStorage(STORAGE_KEYS.COMPANY_ID);
  const token = await getLocalStorage(STORAGE_KEYS.TOKEN);

  dispatch(setAppLoading(true));
  try {
    const body = {
      "company_id": companyId
    }
    const response = await axios.post(`${baseUrl}/coins/gettingranks`, body, {
      headers: {
        'x-access-token': token
      }
    });
    // console.log("This is the get user Rank and trophy response .....", response?.data);
    dispatch(setAppLoading(false));

    if (response?.status === 200) {
      return;
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    }

  } catch (error) {
    dispatch(setAppLoading(false));
    // console.log("Catch Error .......", error.response.data.message)
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

export const getTimeData = payload => async dispatch => {

  const companyId = await getLocalStorage(STORAGE_KEYS.COMPANY_ID);
  const token = await getLocalStorage(STORAGE_KEYS.TOKEN);

  if (payload){
    dispatch(setAppLoading(false));
  }else{
    dispatch(setAppLoading(true));
  }

  try {
    const response = await axios.get(`${baseUrl}/common/userdesktop/${companyId}`, {
      headers: {
        'x-access-token': token
      }
    });
    // console.log("This is the get Time Data response .....", response?.data);
    dispatch(setAppLoading(false));

    if (response?.status === 200) {

      dispatch({
        type: GET_TIME_DATA,
        payload: response?.data,
      });

      if (response.data.scheduledata.schedule.length > 0){

        let array = [];
        let dataa = response.data.scheduledata.schedule[0].schedule;
  
        for (let x of dataa) {
          if (x.status == true) {
            let count = dayCounter(x.days.toLowerCase());
  
            //Duty time calculation
            let start_time = new Date(x.start_time);
            let end_time = new Date(x.end_time);
  
            let start_minute = addZero(start_time.getMinutes());
            let end_minute = addZero(end_time.getMinutes());
  
            let duty_hours = [];
            duty_hours.push(start_time.getHours());
  
            if (start_time.getHours() > end_time.getHours()) {
              let totalhours = 24 - (start_time.getHours() - end_time.getHours());
              for (let i = 0; i < totalhours; i++) {
                start_time.setHours(start_time.getHours() + 1);
                duty_hours.push(start_time.getHours());
              }
            } else {
              let totalhours = end_time.getHours() - start_time.getHours();
              for (let i = 0; i < totalhours; i++) {
                start_time.setHours(start_time.getHours() + 1);
                duty_hours.push(start_time.getHours());
              }
            }
  
            //break time calculation
            let break_timestart = new Date(x.break_timestart);
            let break_timeend = new Date(x.break_timeend);
            let break_start_minute = addZero(break_timestart.getMinutes());
            let break_end_minute = addZero(break_timeend.getMinutes());
            let break_hours = [];
            break_hours.push(break_timestart.getHours());
  
            if (break_timestart.getHours() > break_timeend.getHours()) {
              let totalhours =
                24 - (break_timestart.getHours() - break_timeend.getHours());
              for (let i = 0; i < totalhours; i++) {
                break_timestart.setHours(break_timestart.getHours() + 1);
                break_hours.push(break_timestart.getHours());
              }
            } else {
              let totalhours =
                break_timeend.getHours() - break_timestart.getHours();
  
              for (let i = 0; i < totalhours; i++) {
                break_timestart.setHours(break_timestart.getHours() + 1);
                break_hours.push(break_timestart.getHours());
              }
            }
  
            //final data
            let data = {
              day: count,
              start_minute: start_minute,
              end_minute: end_minute,
              duty_hours: duty_hours,
              break_start_minute: break_start_minute,
              break_end_minute: break_end_minute,
              break_hours: break_hours,
            };
  
            array.push(data);
          }
        }
  
        setLocalStorage(STORAGE_KEYS?.ScheduleData, JSON.stringify(array));
  
        //save locally
        if (Platform.OS == 'android') {
          CalendarModule.createCalendarEvent('schedule-api', JSON.stringify(dataa));
          CalendarModule.createCalendarEvent('schedule', JSON.stringify(array));
        }
    
        dispatch({
          type: SET_SCHEDULE,
          payload: dataa,
        });
        
      }else{
        dispatch({
          type: SET_SCHEDULE,
          payload: [],
        });
      }

    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    }

  } catch (error) {
    dispatch(setAppLoading(false));
    // console.log("Catch Error .......", error)
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

const stopBackgroundService = async () => {
  await BackgroundService.stop();
}


function dayCounter(day) {
  if (day == "monday") {
    return 1;
  }
  if (day == "tuesday") {
    return 2;
  }
  if (day == "wednesday") {
    return 3;
  }
  if (day == "thursday") {
    return 4;
  }
  if (day == "friday") {
    return 5;
  }
  if (day == "saturday") {
    return 6;
  }
  if (day == "sunday") {
    return 0;
  }
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return "" + i;
}