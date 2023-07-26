import { combineReducers } from 'redux';
import loadingReducer from './AppLoader/appLoaderReducer';
import appsReducer from './Apps/AppsReducer';
import authReducer from './Auth/authReducer';
import scheduleReducer from './Schedule/ScheduleReducer';
import userReducer from './User/UserReducer';
import roadMapReducer from './RoadMap/RoadMapReducer';

export const RootReducer = combineReducers({
  appLoading: loadingReducer,
  user: authReducer,
  apps: appsReducer,
  schedule: scheduleReducer,
  userData: userReducer,
  roadMap: roadMapReducer
});

