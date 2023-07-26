import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Auth/Login';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import RecoverPassword from '../Screens/Auth/RecoverPassword';
import MyDrawer from './DrawerNavigation';
import ProfileSetting from '../Screens/ProfileSetting/ProfileSetting';
import { navigationRef } from './RootNavigator';
import { getLocalStorage } from '../shared/functions';
import { STORAGE_KEYS } from '../shared/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const Index = () => {

  const [token, setToken] = useState('');
  const [check, setCheck] = useState(false);

  const getToken = async () => {
    const val = await getLocalStorage(STORAGE_KEYS.TOKEN);
    setToken(val);
  }

  useEffect(() => {
    getToken();
    setTimeout(() => {
      setCheck(true)
    }, 1000)
  }, [])

  return (
    check ?
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={token === null ? 'Login' : 'MainDashboard'}>
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
