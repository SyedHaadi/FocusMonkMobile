import { APP_LOADING, ANIMATION_LOADING } from './appLoaderAction';

const initialState = {
  loading: false,
  AnimationLoading: false
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ANIMATION_LOADING:
      return {
        ...state,
        AnimationLoading: action.payload,
      };
    default:
      return state;
  }
};

export default loadingReducer;
