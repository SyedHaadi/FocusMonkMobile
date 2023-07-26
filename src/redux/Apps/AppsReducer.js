import { SET_APPS, GET_RANK_STATUS, GET_COINS_TROPHIES, GET_SCALEABLE } from '../Apps/AppsAction';

initialState = {
  environment: '',
  appsList: [],
  urlsList: [],
  emptyApps: false,
  rankList: [],
  scaleable: null,
  wallet: null,
  userRank: '',
  userCoins: '',
  userTrophy: {}
};

export const appsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APPS:
      return {
        ...state,
        appsList: action?.payload?.apps,
        urlsList: action?.payload?.urls,
        environment: action?.payload?.environment,
        emptyApps: action?.payload?.data?.length > 0 ? false : true
      };
    case GET_RANK_STATUS:
      return {
        ...state,
        rankList: action?.payload,
      };
    case GET_SCALEABLE:
      return {
        ...state,
        scaleable: action?.payload,
        userRank: action?.payload?.user[0]?.rank,
        userCoins: action?.payload?.user[0]?.coins + action?.payload?.user[0]?.extracoins,
        userTrophy: action?.payload?.trophy
      };
    case GET_COINS_TROPHIES:
      return {
        ...state,
        wallet: action?.payload,
      };

    default:
      return state;
  }
};

export default appsReducer;
