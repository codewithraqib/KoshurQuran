import {
  GET_FACEBOOK_DATA_SUCCESS,
  GET_PROFILE,
  LOGIN_SUCCESS,
  REGISTER_USER,
  SAVE_MOBILE_PASSWORD,
  SET_MUSIC_TOGGLE_BUTTON,
  SET_QUIZ_RESULT,
  SET_PROFILE,
  SET_CURRENT_SURAH,
} from "./actions";

export const DEFAULT = {};

export default function data(state = DEFAULT, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_FACEBOOK_DATA_SUCCESS: {
      return {
        ...state,
        user: payload,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginData: payload,
      };
    }

    case SET_PROFILE: {
      return {
        ...state,
        profileData: payload,
      };
    }

    case SAVE_MOBILE_PASSWORD: {
      return {
        ...state,
        saveMobilePassword: payload,
      };
    }
    case SET_MUSIC_TOGGLE_BUTTON: {
      return {
        ...state,
        musicButtonValue: payload,
      };
    }
    case SET_QUIZ_RESULT: {
      return {
        ...state,
        quizResults: payload,
      };
    }

    case SET_CURRENT_SURAH: {
      return {
        ...state,
        currentSurah: payload,
      };
    }
    default:
      return state;
  }
}
