import axios from 'axios';
import { Alert, NativeModules, Platform } from 'react-native';
import http from '../../config/http';
import { baseUrl } from '../../config/http';
import Toast from 'react-native-toast-message';
import { getLocalStorage, setLocalStorage } from '../../shared/functions';
import { STORAGE_KEYS } from '../../shared/constants';
import { navigate } from '../../Navigation/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAppLoading } from '../AppLoader/appLoaderAction';
import { getUserData } from '../User/UserActions';
const { CalendarModule } = NativeModules;

export const SET_USER = 'SET_USER'

export const setUser = payload => {
  // console.log("This Data is going to be set in .....", payload)
  return async dispatch => {
    dispatch({
      type: SET_USER,
      payload: payload,
    });
  }

};

// export const registerAction = payload => async dispatch => {
//   try {
//     const reqObj = {
//       ...payload,
//     };
//     const registerRes = await http.post('/employees/login', reqObj);
//     console.log('Register status', registerRes.status);
//     if (registerRes.status === 200) {
//       Alert.alert(
//         "Success!",
//         "You are registered successfully.",
//         [
//           {
//             text: "Cancel",
//             onPress: () => console.log("Cancel Pressed"),
//           },
//           // { text: "OK", onPress: () => RootNavigation.navigate('Login') }
//         ]
//       );
//     }
//   } catch (error) { }
// };

export const loginAction = ({ email, password, navigation }) => async dispatch => {

  const data = { 'email': email, 'password': password }

  dispatch(setAppLoading(true));

  try {
    const loginRes = await axios.post(`${baseUrl}/employees/login`, data);

    dispatch(setAppLoading(false));
    if (loginRes?.status === 200) {
      console.log("Login Response .......", loginRes?.data?.user?._id)
      setLocalStorage(STORAGE_KEYS.TOKEN, loginRes?.data?.token);
      setLocalStorage(STORAGE_KEYS.USER_ID, loginRes?.data?.user?._id);
      setLocalStorage(STORAGE_KEYS.COMPANY_ID, loginRes?.data?.user?.company_id?._id);

      if (Platform.OS == 'android') {
        CalendarModule.createCalendarEvent('userid', loginRes?.data?.user?._id);
        CalendarModule.createCalendarEvent('companyid', loginRes?.data?.user?.company_id?._id);
        CalendarModule.createCalendarEvent('token', loginRes?.data?.token);
      }

      // dispatch(setUser(loginRes?.data?.user));
      dispatch(getUserData());
      navigation.replace('MainDashboard', { fromLogin: true });
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    }

  } catch (error) {
    dispatch(setAppLoading(false));
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

export const loginWithGoogleAction = ({ type, device, token, navigation }) => async dispatch => {

  const data = { 'type': type, 'social_token': token, 'device': device }

  dispatch(setAppLoading(true));

  try {
    const loginRes = await axios.post(`${baseUrl}/employees/login`, data);

    dispatch(setAppLoading(false));
    if (loginRes?.status === 200) {
      console.log("Login Response .......", loginRes?.data?.user?._id)
      setLocalStorage(STORAGE_KEYS.TOKEN, loginRes?.data?.token);
      setLocalStorage(STORAGE_KEYS.USER_ID, loginRes?.data?.user?._id);
      setLocalStorage(STORAGE_KEYS.COMPANY_ID, loginRes?.data?.user?.company_id?._id);

      if (Platform.OS == 'android') {
        CalendarModule.createCalendarEvent('userid', loginRes?.data?.user?._id);
        CalendarModule.createCalendarEvent('companyid', loginRes?.data?.user?.company_id?._id);
        CalendarModule.createCalendarEvent('token', loginRes?.data?.token);
      }

      // dispatch(setUser(loginRes?.data?.user));
      dispatch(getUserData());
      navigation.replace('MainDashboard');
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    }

  } catch (error) {
    dispatch(setAppLoading(false));
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

export const forgotAction = payload => async dispatch => {

  dispatch(setAppLoading(true));

  try {
    const response = await axios.post(`${baseUrl}/employees/forgotpassword`, payload);

    dispatch(setAppLoading(false));
    if (response?.status === 200) {
      Toast.show({
        type: 'success',
        text1: 'Verification code is send to your email !',
      });
      setTimeout(() => {
        navigate('RecoverPassword', payload?.email);
      }, 2000)
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    }

  } catch (error) {
    dispatch(setAppLoading(false));
    // console.log(error);
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


export const RecoverPasswordAction = payload => async dispatch => {
  // console.log('Getting this data to recover password.', payload);
  dispatch(setAppLoading(true));
  try {
    const response = await axios.put(`${baseUrl}/employees/resetpassword`, payload);

    dispatch(setAppLoading(false));
    if (response?.status === 200) {
      Toast.show({
        type: 'success',
        text1: response?.data?.message,
      });
      setTimeout(() => {
        navigate('Login');
      }, 2000)
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    }
  } catch (error) {
    dispatch(setAppLoading(false));
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

export const ChangePasswordAction = payload => async dispatch => {

  const token = await getLocalStorage(STORAGE_KEYS.TOKEN);
  dispatch(setAppLoading(true));

  try {
    const response = await axios.post(`${baseUrl}/employees/changepassword`, payload, {
      headers: {
        'x-access-token': token
      }
    });
    // console.log("Response ....", response)
    dispatch(setAppLoading(false));
    if (response?.status === 200) {
      Toast.show({
        type: 'success',
        text1: response?.data?.message,
      });
      setTimeout(() => {
        navigate('DashBoard');
      }, 2000)
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    }
    return true;
  } catch (error) {
    // console.log('Error', error.response.data.message);
    dispatch(setAppLoading(false));
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
