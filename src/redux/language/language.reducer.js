import {
  LANGUAGE_ENGLISH,
  LANGUAGE_SPANISH,
  GET_LANGUAGE,
} from "../actionTypes";

const initialState = {
  language: "en",
  language_data: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LANGUAGE_ENGLISH:
      return { ...state, language: "en" };
    case LANGUAGE_SPANISH:
      return { ...state, language: "sp" };
    case GET_LANGUAGE:
      return { ...state, language_data: action.payload };

    default:
      return state;
  }
}
