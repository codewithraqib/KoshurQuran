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
  GET_QUIZ_LIST,
  GET_PROFILE,
  BUY_QUIZ,
  ADD_REMOVE_WALLET_AMOUNT,
  SUBMIT_PARTICULAR_ANSWER,
  GET_QUIZ_DETAILS,
  GET_QUIZ_CATEGORIES,
  GET_MY_QUIZES,
  GET_TRANSACTION_REPORT,
  CREATE_PASSWORD,
  GET_BANNER,
  GET_PAYTM_CHECKSUM,
  GET_ISLAMIC_DATE,
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

export function* asyncGetQuizList({ payload }) {
  // const { facebookToken } = payload;

  console.log("Payload in quiz list is", payload);

  // eslint-disable-next-line
  const url =
    // AppData.BASE_URL + 'api/v1/quiz/by-category/1';
    AppData.BASE_URL + `api/v1/quiz/by-category/${payload.category}`;

  console.log("url in quiz list is", url);

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

export function* watchGetQuizList() {
  while (true) {
    const action = yield take(GET_QUIZ_LIST);
    yield* asyncGetQuizList(action);
  }
}

export function* asyncGetProfile({ payload }) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + `api/v1/profile`;

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

export function* watchGetProfile() {
  while (true) {
    const action = yield take(GET_PROFILE);
    yield* asyncGetProfile(action);
  }
}

//BUY QUIZ
export function* asyncBuyQuiz({ payload }) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + `api/v1/quiz/buy/${payload.quizId}`;

  console.log("URL TO BUY QUIZ", url);

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

export function* watchBuyQuiz() {
  while (true) {
    const action = yield take(BUY_QUIZ);
    yield* asyncBuyQuiz(action);
  }
}

//ADD OR REMOVE WALLET AMOUNT
export function* asyncAddRemoveWalletAmount({ payload }) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + `api/v1/walet/add-remove-money`;

  console.log("Payload is", payload.data);

  try {
    const response = yield call(App_Service, {
      url,
      method: "PUT",
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchAddRemoveWalletAmount() {
  while (true) {
    const action = yield take(ADD_REMOVE_WALLET_AMOUNT);
    yield* asyncAddRemoveWalletAmount(action);
  }
}

//SUBMIT PARTICULAR ANSWER OF QUIZ
export function* asyncSubmitParticularAnswer({ payload }) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + "api/v1/answers";

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

export function* watchSubmitParticularAnswer() {
  while (true) {
    const action = yield take(SUBMIT_PARTICULAR_ANSWER);
    yield* asyncSubmitParticularAnswer(action);
  }
}

//GET QUIZ DETAILS
export function* asyncGetQuizDetails({ payload }) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + `api/v1/quiz/${payload.id}`;

  console.log("Get quiz details url is", url);

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

export function* watchGetQuizDetails() {
  while (true) {
    const action = yield take(GET_QUIZ_DETAILS);
    yield* asyncGetQuizDetails(action);
  }
}

//GET QUIZ CATEGORIES
export function* asyncGetQuizCategories({ payload }) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + "api/v1/category/list";

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

export function* watchGetQuizCategories() {
  while (true) {
    const action = yield take(GET_QUIZ_CATEGORIES);
    yield* asyncGetQuizCategories(action);
  }
}

//GET MY QUIZES
export function* asyncGetMyQuizes({ payload }) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + "api/v1/my-quizzes";

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

export function* watchGetMyQuizes() {
  while (true) {
    const action = yield take(GET_MY_QUIZES);
    yield* asyncGetMyQuizes(action);
  }
}

//GET TRANSACTION REPORTS
export function* asyncGetTransactionReport({ payload }) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + "api/v1/transactions";

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

export function* watchGetTransactionReport() {
  while (true) {
    const action = yield take(GET_TRANSACTION_REPORT);
    yield* asyncGetTransactionReport(action);
  }
}

/// CREATE A NEW PASSWORD
export function* asyncCreatePassword({ payload }) {
  const url = AppData.BASE_URL + "api/v1/reset-password";

  console.log("payload loginWithPin is", payload);

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

export function* watchCreatePassword() {
  while (true) {
    const action = yield take(CREATE_PASSWORD);
    yield* asyncCreatePassword(action);
  }
}

/// Get Banner
export function* asyncGetBanner({ payload }) {
  const url = AppData.BASE_URL + "api/v1/banners";

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

export function* watchGetBanner() {
  while (true) {
    const action = yield take(GET_BANNER);
    yield* asyncGetBanner(action);
  }
}

/// Get Checksum from paytm
export function* asyncGetPaytmChecksum({ payload }) {
  const url = `https://bigbagsalesventure.com/api/generatpaytmhashes?customers_id=${
    payload.data.cust_id
  }&amount=${payload.data.amount}`;

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

export function* watchGetPaytmChecksum() {
  while (true) {
    const action = yield take(GET_PAYTM_CHECKSUM);
    yield* asyncGetPaytmChecksum(action);
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
    fork(watchGetQuizList),
    fork(watchGetProfile),
    fork(watchBuyQuiz),
    fork(watchAddRemoveWalletAmount),
    fork(watchSubmitParticularAnswer),
    fork(watchGetQuizDetails),
    fork(watchGetQuizCategories),
    fork(watchGetMyQuizes),
    fork(watchGetTransactionReport),
    fork(watchCreatePassword),
    fork(watchGetBanner),
    fork(watchGetPaytmChecksum),
    fork(watchGetIslamicDate),
  ]);
}
