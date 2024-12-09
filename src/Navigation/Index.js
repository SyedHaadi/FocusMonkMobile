import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Auth/Login';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import RecoverPassword from '../Screens/Auth/RecoverPassword';
import MyDrawer from './DrawerNavigation';
import ProfileSetting from '../Screens/ProfileSetting/ProfileSetting';
import { navigationRef } from './RootNavigator';
import { getLocalStorage, setLocalStorage } from '../shared/functions';
import { STORAGE_KEYS } from '../shared/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getLanguageData } from '../redux/language/language.actions';
import { getCurrencies, getLocales } from "react-native-localize";

const Stack = createNativeStackNavigator();

const Index = () => {

  const [token, setToken] = useState('');
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  const languageData = useSelector((state) => state?.language?.language_data);

  const getToken = async () => {
    const val = await getLocalStorage(STORAGE_KEYS.TOKEN);
    setToken(val);
  }

  const setUpLanguage = async () => {
    const checkLang = await getLocalStorage(STORAGE_KEYS.Language_Type);
    if (!checkLang) {
      const defaultLanguage = await getLocales();
      setLocalStorage(STORAGE_KEYS?.Language_Type, defaultLanguage[0].languageCode == 'en' || defaultLanguage[0].languageCode == 'es' || defaultLanguage[0].languageCode == 'pt' ? defaultLanguage[0].languageCode == 'pt' ? 'pr' : defaultLanguage[0].languageCode : 'en')
    }
    dispatch(getLanguageData());
  }

  useEffect(() => {
    setUpLanguage()
    getToken();
    setTimeout(() => {
      setCheck(true)
    }, 2000)
  }, [])

  useEffect(() => {
    if (check) {
      if (token && Platform.OS === 'ios') {
        Alert.alert(
          languageData?.COINS_PROMPT,
          languageData?.Keep_Active,
          [
            {
              text: 'OK',
              onPress: () => {
                console.log("closed.")
              },
            },
          ],
          { cancelable: false }
        );
      }
    }

  }, [check]);

  return (
    check ?
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={token ? 'MainDashboard' : 'Login'}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
          <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
          <Stack.Screen name="MainDashboard" component={MyDrawer} />

        </Stack.Navigator>
      </NavigationContainer>
      :
      null
  );
};

export default Index;

const styles = StyleSheet.create({});
