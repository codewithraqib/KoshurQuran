// @flow

import {set, isEmpty} from 'lodash';
import CommonService from './commonService';

export default async function App_Service({url, method, params}) {
  const headers = {};

  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');

  try {
    if (CommonService.token) {
      console.log('Auth token', CommonService.token);
      set(headers, 'Authorization', `Bearer ${CommonService.token}`);
    }
  } catch (e) {
    console.log('fffffff');
  }

  const reqBody = {
    method,
    headers,
  };

  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }

  return fetch(url, reqBody)
    .then(response => response.json())
    .then(data => {
      return {
        result: 'ok',
        data,
      };
    })
    .catch(() => {
      return {
        result: 'error',
        message: 'Please check your internet connection!',
      };
    });
}
