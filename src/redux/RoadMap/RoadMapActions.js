import axios from 'axios';
import { Alert } from 'react-native';
import http from '../../config/http';
import { baseUrl } from '../../config/http';
import Toast from 'react-native-toast-message';
import { getLocalStorage, setLocalStorage } from '../../shared/functions';
import { STORAGE_KEYS } from '../../shared/constants';
import { navigate } from '../../Navigation/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAppLoading } from '../AppLoader/appLoaderAction';

export const GET_ROAD_MAP = 'GET_ROAD_MAP';

export const getRoadMap = payload => async dispatch => {

    const token = await getLocalStorage(STORAGE_KEYS.TOKEN);
    dispatch(setAppLoading(true));

    try {
        const response = await axios.get(`${baseUrl}/roadmap/allroadmap`, {
            headers: {
                'x-access-token': token
            }
        });
        console.log("This is the get road map response .....", response.data);
        dispatch(setAppLoading(false));

        if (response?.status === 200) {
            dispatch({
                type: GET_ROAD_MAP,
                payload: response?.data,
            });
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Something went wrong!',
            });
        }

    } catch (error) {
        dispatch(setAppLoading(false));
        // console.log("Catch Error .......", error.message)
        if (error.toJSON().message === 'Network Error') {
            Toast.show({
              type: 'error',
              text1: 'No internet connection !',
            });
          }
          else if (error?.response?.data) {
            Toast.show({
                type: 'error',
                text1: error?.response?.data?.message,
            });
        } else if (error?.request) {
            Toast.show({
                type: 'error',
                text1: error?.request,
            });
        } else {
            Toast.show({
                type: 'error',
                text1: error?.message,
            });
        }
    }
};