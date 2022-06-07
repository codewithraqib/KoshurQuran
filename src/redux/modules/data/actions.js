// @flow

import { createAction } from "redux-actions";

export const GET_FACEBOOK_DATA = "data/GET_FACEBOOK_DATA";
export const REGISTER_USER = "data/REGISTER_USER";
export const LOGIN_SCREEN = "data/LOGIN_SCREEN";
export const GENERATE_OTP = "data/GENERATE_OTP";
export const VERIFY_OTP = "data/VERIFY_OTP";
export const SET_MUSIC_TOGGLE_BUTTON = "data/SET_MUSIC_TOGGLE_BUTTON";
export const GET_ISLAMIC_DATE = "data/GET_ISLAMIC_DATE";
export const SET_CURRENT_SURAH = "data/SET_CURRENT_SURAH";
export const GET_ALL_SURAHS = "data/GET_ALL_SURAHS";
export const SET_ALL_SURAHS = "data/SET_ALL_SURAHS";

export const fetchDataActionCreators = {
  getFacebookUserData: createAction(GET_FACEBOOK_DATA),
  registerUser: createAction(REGISTER_USER),
  loginUser: createAction(LOGIN_SCREEN),
  generateOtp: createAction(GENERATE_OTP),
  verifyOtp: createAction(VERIFY_OTP),
  setMusicToggleButton: createAction(SET_MUSIC_TOGGLE_BUTTON),
  getIslamicDate: createAction(GET_ISLAMIC_DATE),
  setCurrentSurah: createAction(SET_CURRENT_SURAH),
  getAllSurahs: createAction(GET_ALL_SURAHS),
  setAllSurahs: createAction(SET_ALL_SURAHS),
};
