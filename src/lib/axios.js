import axiosMain from 'axios';
import store from 'store';
import { logout } from 'store/Slices/authSlice';

export const axios = axiosMain.create({
  baseURL: 'https://pansophy-api.m2mbeta.com/api/v1/login/access-token',
});

function setCurrentTokenState(tokenState) {
  localStorage.setItem('AuthToken', JSON.stringify(tokenState));
}

function getCurrentTokenState() {
  console.log("getcurrnttokenstae")
  const AuthToken = localStorage.getItem('AuthToken');
  const tokenObj = JSON.parse(AuthToken);
  return tokenObj;
}

function refreshToken() {
  const current = getCurrentTokenState();
  return axiosMain.post(
    `https://pansophy-api.m2mbeta.com/api/v1/login/access-token`,
    {
      token: current?.token,
      refreshToken: current?.refreshToken,
    },
    {
      headers: {
        'Content-type': 'application/json',
      },
    }
  );
}

axios.interceptors.request.use(

  function (config) {
    console.log("axios.interceptors.request")
    const AuthToken = localStorage.getItem('AuthToken');
    const tokenObj = JSON.parse(AuthToken);
    const token = tokenObj?.token;
    config.headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

let refreshing_token = null;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;
    if (error.response && error.response.status === 401 && !config._retry) {
      config._retry = true;
      try {
        refreshing_token = refreshing_token ? refreshing_token : refreshToken();
        let res = await refreshing_token;
        refreshing_token = null;
        if (res?.data?.data?.token) {
          setCurrentTokenState(res?.data?.data);
        } else {
          localStorage.removeItem('AuthToken');
        }
        return axios(config);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
