import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { View, Text, StyleSheet, Image, NativeModules, Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DashboardHeader from '../Components/DashboardHeader';
import PremiumButton from '../Components/PremiumButton';
import Color from '../Utils/Color';
import Font from '../Utils/Font';
import { height_screen, width_screen } from '../Utils/Dimentions';
import { removeLocalStorage } from '../shared/functions';
import { STORAGE_KEYS } from '../shared/constants';
import { CommonActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackgroundService from 'react-native-background-actions';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SCHEDULE } from '../redux/Schedule/ScheduleActions';
import { SET_APPS } from '../redux/Apps/AppsAction';

const { CalendarModule } = NativeModules;

const CustomDrawerContent = ({ ...props }) => {

  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView
      style={styles.mainView}
      {...props}
      contentContainerStyle={{ paddingTop: 0 }}>
      <DashboardHeader {...props} />
      <View style={{ paddingHorizontal: width_screen * 0.035, paddingVertical: height_screen * 0.03 }}>
        <View>
          <DrawerItem
            style={styles.itemView}
            onPress={() => props.navigation.navigate('DashBoard')}
            label={'Home'}
            labelStyle={styles.labelText}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Ionicons name='home' size={height_screen * 0.022} color={Color.PrimaryColor} />
              </View>
            )}
          />
          <DrawerItem
            style={styles.itemView}
            onPress={() => props.navigation.navigate('Wallet')}
            label={'My Wallet'}
            labelStyle={styles.labelText}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Ionicons name='wallet' size={height_screen * 0.022} color={Color.PrimaryColor} />
              </View>
            )}
          />
          <DrawerItem
            style={styles.itemView}
            onPress={() => props.navigation.navigate('Achievements')}
            label={'Achievements'}
            labelStyle={styles.labelText}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Image source={require('../Assets/icons/achievements.png')} />
              </View>
            )}
          />
          <DrawerItem
            style={styles.itemView}
            onPress={() => props.navigation.navigate('Schedule')}
            label={'Focus Schedule'}
            labelStyle={styles.labelText}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Image source={require('../Assets/icons/schedule.png')} />
              </View>
            )}
          />
          <DrawerItem
            style={styles.itemView}
            onPress={() => props.navigation.navigate('Environment')}
            label={'Apps Control'}
            labelStyle={styles.labelText}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Image source={require('../Assets/icons/environment.png')} />
              </View>
            )}
          />
          <DrawerItem
            style={styles.itemView}
            onPress={() => props.navigation.navigate('RankStatus')}
            label={'Rank Status'}
            labelStyle={styles.labelText}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Image source={require('../Assets/icons/calender.png')} />
              </View>
            )}
          />
          <DrawerItem
            style={styles.itemView}
            onPress={() => props.navigation.navigate('ProfileSetting')}
            label={'Profile Setting'}
            labelStyle={styles.labelText}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Image source={require('../Assets/icons/profile.png')} />
              </View>
            )}
          />
          <DrawerItem
            style={styles.itemView}
            onPress={() => props.navigation.navigate('ChangePassword')}
            label={'Change Password'}
            labelStyle={styles.labelText}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Image source={require('../Assets/icons/lock.png')} />
              </View>
            )}
          />
          <DrawerItem
            style={styles.itemView}
            onPress={() => {
              BackgroundService.stop();
              removeLocalStorage(STORAGE_KEYS.TOKEN);
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
            label={'Logout'}
            labelStyle={styles.labelText}
            icon={({ color, size }) => (
              <View style={{ width: width_screen * 0.07 }}>
                <Image source={require('../Assets/icons/logout.png')} />
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
    fontSize: height_screen * 0.021
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
    marginBottom: -height_screen * 0.017
  }
});
