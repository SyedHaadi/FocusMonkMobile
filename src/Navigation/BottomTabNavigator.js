import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
// import {MainDashboard} from '../screens';
// import {BottomFabBar} from 'rn-wave-bottom-bar';
// import Images from '../constants/Images';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../Screens/Dashboard';
import Wallet from '../Screens/Wallet/Wallet';
import Environment from '../Screens/Environment/Environment';
import Schedule from '../Screens/Schedule/Schedule';
import Color from '../Utils/Color';
import { height_screen, width_screen } from '../Utils/Dimentions';
import { useSelector } from 'react-redux';



const generateScreen = screen => () => {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text>{screen}!</Text>

    </View>
  );
};
const tabBarIcon =
  name =>
    ({ focused, color, size }) =>
      <Icon name={name} size={28} color={focused ? '#EB6A5D' : 'gray'} />;

const Tab = createBottomTabNavigator();

const TabBar = () => {

  const languageData = useSelector((state) => state?.language?.language_data);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Color.Grey,
        // tabBarActiveBackgroundColor: '#F9F9F9',
        // tabBarInactiveBackgroundColor: 'grey',
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'android' ? height_screen * 0.035 : height_screen * 0.03,
          height: height_screen * 0.08,
          width: width_screen * 0.94,
          paddingBottom: height_screen * 0.01,
          paddingTop: height_screen * 0.01,
          borderRadius: 20,
          marginHorizontal: width_screen * 0.03,
          backgroundColor: Color.White,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }
      }}

    >
      <Tab.Screen
        options={{ tabBarIcon: ({ focused }) => (<Ionicons style={{ marginBottom: -height_screen * 0.01 }} name='bar-chart' size={height_screen * 0.03} color={focused ? Color.PrimaryColor : Color.Grey} />), tabBarShowLabel: true }}
        name={languageData?.performance ? languageData?.performance : 'Performance'}
        component={Dashboard}
      />
      <Tab.Screen
        options={{ tabBarIcon: ({ focused }) => (<Ionicons style={{ marginBottom: -height_screen * 0.01 }} name='wallet' size={height_screen * 0.03} color={focused ? Color.PrimaryColor : Color.Grey} />), tabBarShowLabel: true }}
        name={languageData?.wallet ? languageData?.wallet : 'Wallet'}
        component={Wallet}
      />
      <Tab.Screen
        options={{ tabBarIcon: ({ focused }) => (<Ionicons style={{ marginBottom: -height_screen * 0.01 }} name='grid' size={height_screen * 0.027} color={focused ? Color.PrimaryColor : Color.Grey} />), tabBarShowLabel: true }}
        name={languageData?.apps ? languageData?.apps : 'Apps'}
        component={Environment}
      />
      <Tab.Screen
        options={{ tabBarIcon: ({ focused }) => (<Ionicons style={{ marginBottom: -height_screen * 0.01 }} name='time' size={height_screen * 0.029} color={focused ? Color.PrimaryColor : Color.Grey} />), tabBarShowLabel: true }}
        name={languageData?.schedule ? languageData?.schedule : 'Schedule'}
        component={Schedule}
      />
    </Tab.Navigator>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginVertical: 5,
  },
  bottomBar: {},
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 30,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  img: {
    width: 30,
    height: 30,
  },
});

export default TabBar;