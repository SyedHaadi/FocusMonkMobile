import 'react-native-gesture-handler';
/**
 * @format
 */

import { Alert, AppRegistry, NativeEventEmitter, NativeModules, DeviceEventEmitter, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// import { setApps } from './src/redux/Apps/AppsAction';
// DeviceEventEmitter.addListener('myEventName', (actionName) => {
//   switch (actionName) {
//     case 'fetchUserData':
//       dispatch(setApps());
//       break;
//     // ... other cases
//     default:
//       break;
//   }
// });


if (Platform.OS === 'android') {
  const MyModule = NativeModules.MyModule;
  const eventEmitter = new NativeEventEmitter(MyModule);

  // Listen to the event emitted from Java
  eventEmitter.addListener('MyFunctionEvent', (param1, param2) => {
    // Call your JavaScript function here
  });

  DeviceEventEmitter.addListener('MyFunctionEvent', (eventData) => {
    // Handle the event and call your JavaScript function

  });
}


AppRegistry.registerComponent(appName, () => App);


