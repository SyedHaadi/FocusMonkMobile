import axios from 'axios';
import {store} from '../redux/store';
import { STORAGE_KEYS, TOAST_STATUS } from '../shared/constants';
import {getLocalStorage, removeLocalStorage} from '../shared/functions';
import {setAppLoading, setAppToast} from '../redux/AppLoader/appLoaderAction';


export const baseUrl = 'https://focusmonk-app-uv729.ondigitalocean.app/api';

const BASE_URL = 'https://focusmonk-app-uv729.ondigitalocean.app/api';

const http = axios.create({
  baseURL: BASE_URL,
});
http.interceptors.request.use(
  async config => {
    const token = (await getLocalStorage(STORAGE_KEYS.TOKEN)) || '';
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  err => Promise.reject(err),
);

const ResponseInterceptor = response => {
  store.dispatch(setAppLoading(false));
  return response;
};

http.interceptors.response.use(ResponseInterceptor, err => {
  const error = err?.response?.data || err;
  store.dispatch(setAppLoading(false));
  if (err?.response?.status === 401) {
    //unthorized user
    removeLocalStorage(STORAGE_KEYS.TOKEN);
    // RootNavigation.navigate('Sign-in');
  }

  if (error) {
    store.dispatch(
      setAppToast({
        title: 'Error',
        description: err.response.data.message,
        status: TOAST_STATUS.ERROR,
        showToast: true,
      }),
    );
  }

  return err;
});

export default http;
