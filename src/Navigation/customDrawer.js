import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { View, Text, StyleSheet, Image, Linking, NativeModules, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DashboardHeader from '../Components/DashboardHeader';
import PremiumButton from '../Components/PremiumButton';
import Color from '../Utils/Color';
import Font from '../Utils/Font';
import { height_screen, width_screen } from '../Utils/Dimentions';
import { removeLocalStorage, setLocalStorage } from '../shared/functions';
import { STORAGE_KEYS } from '../shared/constants';
import { CommonActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackgroundService from 'react-native-background-actions';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SCHEDULE } from '../redux/Schedule/ScheduleActions';
import { SET_APPS } from '../redux/Apps/AppsAction';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const { CalendarModule } = NativeModules;

const CustomDrawerContent = ({ ...props }) => {

  const dispatch = useDispatch();
  const languageData = useSelector((state) => state?.language?.language_data);

  const navigation = useNavigation();

  const currentRouteName = props.state.routeNames[props.state.index];

  const handleHomePress = () => {
    // Call your handleHomePress function from here
    navigation.reset({
      index: 0,
      routes: [
        { name: 'DashBoard' },
      ],
    });
  };


  const openURLInBrowser = (url) => {
    Linking.openURL(url)
      .then((supported) => {
        if (!supported) {
          console.error('Opening URL in browser is not supported');
        } else {
          console.log('URL opened in browser');
        }
      })
      .catch((err) => console.error('Error occurred while opening URL:', err));
  };

  return (
    <DrawerContentScrollView
      style={styles.mainView}
      {...props}
      contentContainerStyle={{ paddingTop: 0 }}>
      <DashboardHeader {...props} />
      <View style={{ paddingLeft: width_screen * 0.02, paddingVertical: height_screen * 0.03 }}>
        <View>
          <DrawerItem
            style={[styles.itemView, { backgroundColor: currentRouteName === 'DashBoard' ? Color.PrimaryColor : Color.White }]}
            onPress={() => {
              props.navigation.navigate('DashBoard')
              handleHomePress()
            }}
            label={languageData?.home ? languageData?.home : 'Home'}
            labelStyle={[styles.labelText, { color: currentRouteName === 'DashBoard' ? Color.White : Color.Grey }]}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Ionicons name='home' size={height_screen * 0.022} color={currentRouteName === 'DashBoard' ? Color.Grey : Color.PrimaryColor} />
              </View>
            )}
          />
          <DrawerItem
            style={[styles.itemView, { backgroundColor: currentRouteName === 'Wallet' ? Color.PrimaryColor : Color.White }]}
            onPress={() => props.navigation.navigate('Wallet')}
            label={languageData?.my_wallet ? languageData?.my_wallet : 'My Wallet'}
            labelStyle={[styles.labelText, { color: currentRouteName === 'Wallet' ? Color.White : Color.Grey }]}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Ionicons name='wallet' size={height_screen * 0.022} color={currentRouteName === 'Wallet' ? Color.Grey : Color.PrimaryColor} />
              </View>
            )}
          />
          <DrawerItem
            style={[styles.itemView, { backgroundColor: currentRouteName === 'Achievements' ? Color.PrimaryColor : Color.White }]}
            onPress={() => props.navigation.navigate('Achievements')}
            label={languageData?.achievements ? languageData?.achievements : 'Achievements'}
            labelStyle={[styles.labelText, { color: currentRouteName === 'Achievements' ? Color.White : Color.Grey }]}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Ionicons name='ribbon' size={height_screen * 0.022} color={currentRouteName === 'Achievements' ? Color.Grey : Color.PrimaryColor} />
              </View>
            )}
          />
          <DrawerItem
            style={[styles.itemView, { backgroundColor: currentRouteName === 'Schedule' ? Color.PrimaryColor : Color.White }]}
            onPress={() => props.navigation.navigate('Schedule')}
            label={languageData?.focus_schedule ? languageData?.focus_schedule : 'Focus Schedule'}
            labelStyle={[styles.labelText, { color: currentRouteName === 'Schedule' ? Color.White : Color.Grey }]}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Ionicons name='time' size={height_screen * 0.022} color={currentRouteName === 'Schedule' ? Color.Grey : Color.PrimaryColor} />
              </View>
            )}
          />
          <DrawerItem
            style={[styles.itemView, { backgroundColor: currentRouteName === 'Environment' ? Color.PrimaryColor : Color.White }]}
            onPress={() => props.navigation.navigate('Environment')}
            label={languageData?.apps_control ? languageData?.apps_control : 'Apps Control'}
            labelStyle={[styles.labelText, { color: currentRouteName === 'Environment' ? Color.White : Color.Grey }]}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Ionicons name='grid' size={height_screen * 0.022} color={currentRouteName === 'Environment' ? Color.Grey : Color.PrimaryColor} />
              </View>
            )}
          />
          <DrawerItem
            style={[styles.itemView, { backgroundColor: currentRouteName === 'RankStatus' ? Color.PrimaryColor : Color.White }]}
            onPress={() => props.navigation.navigate('RankStatus')}
            label={languageData?.rank_status ? languageData?.rank_status : 'Rank Status'}
            labelStyle={[styles.labelText, { color: currentRouteName === 'RankStatus' ? Color.White : Color.Grey }]}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Ionicons name='calendar' size={height_screen * 0.022} color={currentRouteName === 'RankStatus' ? Color.Grey : Color.PrimaryColor} />
              </View>
            )}
          />
          <DrawerItem
            style={[styles.itemView, { backgroundColor: currentRouteName === 'ProfileSetting' ? Color.PrimaryColor : Color.White }]}
            onPress={() => props.navigation.navigate('ProfileSetting')}
            label={languageData?.profile_setting ? languageData?.profile_setting : 'Profile Setting'}
            labelStyle={[styles.labelText, { color: currentRouteName === 'ProfileSetting' ? Color.White : Color.Grey }]}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Ionicons name='person' size={height_screen * 0.022} color={currentRouteName === 'ProfileSetting' ? Color.Grey : Color.PrimaryColor} />
              </View>
            )}
          />
          <DrawerItem
            style={[styles.itemView, { backgroundColor: currentRouteName === 'ChangePassword' ? Color.PrimaryColor : Color.White }]}
            onPress={() => props.navigation.navigate('ChangePassword')}
            label={languageData?.change_password ? languageData?.change_password : 'Change Password'}
            labelStyle={[styles.labelText, { color: currentRouteName === 'ChangePassword' ? Color.White : Color.Grey }]}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Ionicons name='lock-open' size={height_screen * 0.022} color={currentRouteName === 'ChangePassword' ? Color.Grey : Color.PrimaryColor} />
              </View>
            )}
          />
          <DrawerItem
            style={styles.itemView}
            onPress={() => openURLInBrowser('https://bevy.com/focusmonkapp/')}
            label={languageData?.community ? languageData?.community : 'Community'}
            labelStyle={styles.labelText}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07, flexDirection: 'row' }}>
                <Icon name='user-friends' size={height_screen * 0.022} color={Color.PrimaryColor} />
              </View>
            )}
          />
          <DrawerItem
            style={styles.itemView}
            onPress={() => {
              BackgroundService.stop();
              removeLocalStorage(STORAGE_KEYS.TOKEN);
              if (Platform.OS === 'ios') {
                const d = new Date();
                setLocalStorage(STORAGE_KEYS.Counter, JSON.stringify(false));
                setLocalStorage(STORAGE_KEYS.Counter_Date, JSON.stringify(d));
              }
              dispatch({
                type: SET_SCHEDULE,
                payload: [1, 2, 1, 4],
              });
              dispatch({
                type: SET_APPS,
                payload: { data: [1, 2, 1, 4] },
              });
              if (Platform.OS == 'android') {
                CalendarModule.createCalendarEvent('clear', "");
              }
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Login' },
                  ],
                })
              );
            }}
            label={languageData?.logout ? languageData?.logout : 'Logout'}
            labelStyle={styles.labelText}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Ionicons name='log-out' size={height_screen * 0.027} color={Color.PrimaryColor} />
              </View>
            )}
          />



        </View>
      </View>
    </DrawerContentScrollView>
  );
};
export default CustomDrawerContent;
const styles = StyleSheet.create({
  labelText: {
    fontFamily: Font.Medium,
    right: 24,
    color: Color.Grey,
    fontSize: height_screen * 0.019,
  },
  mainView: {
    height: '100%',
    width: '100%',
    backgroundColor: Color.White,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  itemView: {
    justifyContent: 'center',
    marginBottom: -height_screen * 0.014,
    borderRadius: 0,
    marginTop: height_screen * 0.01,
  }
});
