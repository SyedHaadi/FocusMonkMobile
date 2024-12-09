import {
  GET_LANGUAGE,
  LANGUAGE_ENGLISH,
  LANGUAGE_SPANISH,
  START_AUTH_LOADING,
  START_LOADING,
  STOP_AUTH_LOADING,
  STOP_LOADING,
} from "../actionTypes";
import axios from "axios";
import { Alert } from "react-native";
import { baseUrl } from "../../config/http";
import { getLocalStorage, setLocalStorage } from "../../shared/functions";
import { STORAGE_KEYS } from "../../shared/constants";

export const setLanguageEnglish = () => (dispatch) => {
  console.log("setLanguageEnglish");

  dispatch({
    type: LANGUAGE_ENGLISH,
  });
};

export const setLanguageSpanish = () => (dispatch) => {
  console.log("setLanguageSpanish");
  dispatch({
    type: LANGUAGE_SPANISH,
  });
};

export const getLanguageData = () => async (dispatch) => {
  const langType = await getLocalStorage(STORAGE_KEYS.Language_Type);
  const langData = langType ? langType : "en";
  axios.get(`${baseUrl}/common/getlanguages`)
    .then((res) => {
      // console.log("Hahhahahahaha", res?.data)
      setLocalStorage(STORAGE_KEYS.Language, JSON.stringify(res?.data));
      if (res.status === 200) {
        const languageData = res?.data[langData]?.translation
        // console.log("Response getLanguageData getLanguageData", languageData);
        dispatch({
          type: GET_LANGUAGE,
          payload: languageData,
        });
      }
    })
    .catch((err) => {
      console.log("getLanguageData Error", err);
    });
};

export const changeLanguage = (item) => async (dispatch) => {
  console.log("Lan ......", item?.value);
  let temp;
  if (item?.value === "English") {
    temp = "en";
    setLocalStorage(STORAGE_KEYS?.Language_Type, "en")
  } else if (item?.value === "Spanish") {
    temp = "es";
    setLocalStorage(STORAGE_KEYS?.Language_Type, "es")
  } else if (item?.value === "Portuguese") {
    temp = "pr";
    setLocalStorage(STORAGE_KEYS?.Language_Type, "pr")
  } else {
    temp = "en";
    setLocalStorage(STORAGE_KEYS?.Language_Type, "en")
  }
  const lanData = await getLocalStorage(STORAGE_KEYS.Language);
  const newData = JSON.parse(lanData);

  dispatch({
    type: GET_LANGUAGE,
    payload: newData[temp].translation,
  });

}
