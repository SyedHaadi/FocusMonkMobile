import {createNavigationContainerRef} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

export const navigationRef = createNavigationContainerRef();

export const NavigateTo = (screenName, params = {}) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screenName, params);
  }
};

export const NestedNavigation = (routeName, screenName, params = {}) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(routeName, {
      screenName: screenName,
      params: params,
    });
  }
};

export const setLocalStorage = async (key, value) => {
  return await AsyncStorage.setItem(key, value);
};

export const removeLocalStorage = async key => {
  return await AsyncStorage.removeItem(key);
};

export const clearLocalStorage = async () => {
  return await AsyncStorage.clear();
};

export const getLocalStorage = async key => {
  return await AsyncStorage.getItem(key);
};

export const isEmailValid = email => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(String(email).toLocaleLowerCase());
};

export const isIos = () => {
  return Platform.OS === 'ios';
};

export const getExtention = (url = '') => {
  return url.substring(url.lastIndexOf('.') + 1, url.length) || url;
};
