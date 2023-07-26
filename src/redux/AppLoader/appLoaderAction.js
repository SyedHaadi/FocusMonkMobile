export const APP_LOADING = 'APP_LOADING';
export const ANIMATION_LOADING = 'ANIMATION_LOADING';

export const setAppLoading = payload => {
  return dispatch => {
    return dispatch({
      type: APP_LOADING,
      payload: payload,
    });
  };
};

export const setAnimationLoading = payload => {
  return dispatch => {
    return dispatch({
      type: ANIMATION_LOADING,
      payload: payload,
    });
  };
};

// export const setAppToast = payload => {
//   return dispatch => {
//     return dispatch({
//       type: APP_LOADER_ACTION_TYPES.APP_TOAST,
//       payload,
//     });
//   };
// };
