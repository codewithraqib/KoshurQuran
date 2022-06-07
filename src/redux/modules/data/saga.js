// @flow

import { App_Service } from "src/services";

import { take, put, call, fork, all } from "redux-saga/effects";

import {
  GET_FACEBOOK_DATA,
  fetchDataActionCreators,
  REGISTER_USER,
  LOGIN_SCREEN,
  GENERATE_OTP,
  VERIFY_OTP,
  GET_ISLAMIC_DATE,
  GET_ALL_SURAHS,
} from "./actions";
import AppData from "src/services/appData";

const callback = (response, callback) => {
  if (callback)
    if (response.result === "ok" && response.data) {
      callback({ success: true, data: response.data });
    } else {
      callback({
        success: false,
        error: "Login Failed try after sometime",
      });
    }
};

export function* asyncGetFacebookUserData({ payload }) {
  const { facebookToken } = payload;

  // eslint-disable-next-line
  const url = `https://graph.facebook.com/v2.11/me?access_token=${facebookToken}&fields=id,name,email,picture{url}`;

  try {
    const response = yield call(App_Service, { url, method: "GET" });

    if (response.result === "ok") {
      yield put(
        fetchDataActionCreators.getFacebookUserDataSuccess(response.data)
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchGetFacebookUserData() {
  while (true) {
    const action = yield take(GET_FACEBOOK_DATA);
    yield* asyncGetFacebookUserData(action);
  }
}

export function* asyncRegisterUser({ payload }) {
  // const { facebookToken } = payload;

  // eslint-disable-next-line
  const url = AppData.BASE_URL + "api/v1/register";

  try {
    const response = yield call(App_Service, {
      url,
      method: "POST",
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchRegisterUser() {
  while (true) {
    const action = yield take(REGISTER_USER);
    yield* asyncRegisterUser(action);
  }
}

export function* asyncLoginUser({ payload }) {
  // const { facebookToken } = payload;

  // eslint-disable-next-line
  const url = AppData.BASE_URL + "api/v1/login";

  try {
    const response = yield call(App_Service, {
      url,
      method: "POST",
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchLoginUser() {
  while (true) {
    const action = yield take(LOGIN_SCREEN);
    yield* asyncLoginUser(action);
  }
}

export function* asyncGenerateOtp({ payload }) {
  // const { facebookToken } = payload;

  // eslint-disable-next-line
  const url = AppData.BASE_URL + "api/v1/resendotp";

  try {
    const response = yield call(App_Service, {
      url,
      method: "POST",
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGenerateOtp() {
  while (true) {
    const action = yield take(GENERATE_OTP);
    yield* asyncGenerateOtp(action);
  }
}

export function* asyncVerifyOtp({ payload }) {
  // const { facebookToken } = payload;

  // eslint-disable-next-line
  const url = AppData.BASE_URL + "api/v1/verifyotp";

  try {
    const response = yield call(App_Service, {
      url,
      method: "POST",
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchVerifyOtp() {
  while (true) {
    const action = yield take(VERIFY_OTP);
    yield* asyncVerifyOtp(action);
  }
}

export function* asyncGetSurahList({ payload }) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + `api/all-posts.php`;

  try {
    const response = yield call(App_Service, {
      url,
      method: "GET",
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetSurahList() {
  while (true) {
    const action = yield take(GET_ALL_SURAHS);
    yield* asyncGetSurahList(action);
  }
}

/// Get Checksum from paytm
export function* asyncGetIslamicDate({ payload }) {
  const url = `http://api.aladhan.com/v1/gToH?date=${payload.date}`;

  console.log("Url is", url);

  try {
    const response = yield call(App_Service, {
      url,
      method: "GET",
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetIslamicDate() {
  while (true) {
    const action = yield take(GET_ISLAMIC_DATE);
    yield* asyncGetIslamicDate(action);
  }
}

export default function*() {
  yield all([
    fork(watchGetFacebookUserData),
    fork(watchRegisterUser),
    fork(watchLoginUser),
    fork(watchGenerateOtp),
    fork(watchVerifyOtp),
    fork(watchGetSurahList),
    fork(watchGetIslamicDate),
  ]);
}
