// import store from './../store/index';
// import { REACT_API_BASE_URL } from '@env';


const REACT_API_BASE_URL = 'https://pansophy-api.m2mbeta.com/api/v1/';
const X_API_KEY = 'qwertyuioasdfghjklzxcvbnm';
/**
 * API service methods to make life easier
 */
export const API = {
  /**
   * Execute a query
   * @param url
   * @param method
   * @param body
   * @returns
   */
  execute: async (url, method = 'GET', data = null) => {
    let body = null;
    let value = null;
    if (data) {
      body = new FormData();
      for (const key in data) {
        // console.log({ key: key, value: data[key], type: typeof (data[key]) });
        value = data[key];
        if (typeof value == 'object') {
          var fileURI = value.path;
          let filename = fileURI.split('/').pop();
          body.append('image', {
            uri: fileURI,
            name: filename,
            type: value.mime,
            mime: value.mime,
          });
          // console.log(filename);
        } else {
          body.append(key, data[key]);
        }
      }
    }
    console.log({body, data});
    // const token = store.getState().auth.token;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODEwNzUzNTIsInN1YiI6IjM1In0.YqPHG4aTZFOk7XSoSZqCSXCv2OVdRsn-CJbcbWj4Wqs';

    let headers = {
      Accept: 'application/json',
      'x-api-key': X_API_KEY
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    let res = await fetch(`${REACT_API_BASE_URL}${url}`, {
      method: method,
      headers,
      body: body,
    });

    // console.log({ url: `${REACT_API_BASE_URL}${url}`, token: token, body: body });

    return Promise.all([res.status, res.json(), res.ok]);
  },

  /**
   * Process the response after the query has been executed
   * @param res
   * @returns
   */
  processResponse: (res) => {
    if (!res[2]) {
      throw new Error(res[1].message);
    }

    return res[1];
  },

  /**
   * Authenticate user on the system
   * @param data Object with identity and password
   * @returns
   */
  getConnectedWebsites: async (skip = 0, limit = 100) => {
    let res = await API.execute(`connected-websites/?skip=${skip}&limit=${limit}`, 'GET');
    return API.processResponse(res);
  },

  /**
   * Save a new connected website
   * @param data Object containing saving details
   * @returns
   */
  saveAConnectedWebsite: async (data) => {
    let params = new URLSearchParams(data).toString();
    let res = await API.execute(`connected-websites?${params}`, 'POST', data);
    return API.processResponse(res);
  },

};
