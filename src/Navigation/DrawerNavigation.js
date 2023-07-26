import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'react-native';

import Dashboard from '../Screens/Dashboard';
import Wallet from '../Screens/Wallet/Wallet';
import Achievements from '../Screens/Achievements/Achievements';
import Schedule from '../Screens/Schedule/Schedule';
import Environment from '../Screens/Environment/Environment';
import RankStatus from '../Screens/RankStatus/RankStatus';
import ProfileSetting from '../Screens/ProfileSetting/ProfileSetting';
import ChangePassword from '../Screens/ChangePassword/ChangePassword';
import TabBar from './BottomTabNavigator';
import CustomDrawerContent from './customDrawer';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: '80%',
        },
        headerShown: false,
      }}>
      <Drawer.Screen name="DashBoard" component={TabBar} />
      <Drawer.Screen name="Wallet" component={Wallet} />
      <Drawer.Screen name="Achievements" component={Achievements} />
      <Drawer.Screen name="Schedule" component={Schedule} />
      <Drawer.Screen name="Environment" component={Environment} />
      <Drawer.Screen name="RankStatus" component={RankStatus} />
      <Drawer.Screen name="ProfileSetting" component={ProfileSetting} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />

    </Drawer.Navigator>
  );
};
export default MyDrawer;
