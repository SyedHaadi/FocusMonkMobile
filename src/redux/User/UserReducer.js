import { GET_TIME_DATA, GET_USER_DATA, GET_USER_RANK_TROPHY, SET_MANAGMENT_DATA } from './UserActions';

initialState = {
  user: null,
  timeData: null,
  managmentData: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case GET_TIME_DATA:
      return {
        ...state,
        timeData: action.payload,
      };
    case SET_MANAGMENT_DATA:
      return {
        ...state,
        managmentData: action.payload,
      };
    // case GET_USER_RANK_TROPHY:
    //   return {
    //     ...state,
    //     userRank: action?.payload?.user[0]?.rank,
    //     userCoins: action?.payload?.user[0]?.coins,
    //     userTrophy: action?.payload?.trophy
    //   };

    default:
      return state;
  }
};

export default userReducer;
