import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import Index from './src/Navigation/Index';
import Color from './src/Utils/Color';
import DeviceInfo from 'react-native-device-info';
import { height_screen, width_screen } from './src/Utils/Dimentions';
import AnimationLoader from './src/Components/AnimationLoader';

const App = () => {

  useEffect(() => {
    {
      SplashScreen.hide();
    }
    // getId();
  }, []);

  // const getId = async () => {
  //   let deviceId = await DeviceInfo.getUniqueId();
  //   // console.log("Yes this is App js and Unique Id is .....", deviceId);
  // }

  // const MyStatusBar = ({ backgroundColor, ...props }) => (
  //   <View style={[styles.statusBar, { backgroundColor }]}>
  //     <SafeAreaView>
  //       <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  //     </SafeAreaView>
  //   </View>
  // );

  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  return (
    <Provider store={store}>
      <>
        {/* <StatusBar backgroundColor={Color.PrimaryColor} /> */}

        <MyStatusBar backgroundColor={Color.PrimaryColor} barStyle="light-content" />
        <Index />
        <AnimationLoader />
      </>
    </Provider>
  );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default App;
