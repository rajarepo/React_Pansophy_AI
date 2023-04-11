import axiosMain from "axios";
import { logout } from "store/Slices/authSlice";
import { axios } from "./axios";
import { AuthTokenKey } from "./constants";

function setCurrentTokenState(tokenState) {
  console.log("setCurrentTokenState");
  localStorage.setItem(AuthTokenKey, JSON.stringify(tokenState));
}


export function getCurrentTokenState() {
  console.log("getCurrentTokenState");
  const AuthToken = localStorage.getItem(AuthTokenKey);
  console.log("AuthToken",AuthToken);
  const tokenObj = JSON.parse(AuthToken);
  console.log("tokenObj",tokenObj);
  return tokenObj;
}

function refreshToken() {
  console.log("refreshToken");
  const current = getCurrentTokenState();
  console.log("currentTokenStatus :: ", current);
  return axiosMain.post(
    `https://pansophy-api.m2mbeta.com/api/v1/login/access-token`,
    {
      token: current?.token,
      refreshToken: current?.refreshToken,
    },
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
}

const setUpInterceptor = ({ store, navigate }) => {
  const handleError = async (error) => {
    return Promise.reject(error);
  };

  axios.interceptors.request.use(async (config) => {
    console.log("axios.interceptors.request");
    /* your logic here */
    const AuthToken = localStorage.getItem(AuthTokenKey);
    const tokenObj = JSON.parse(AuthToken);
    const token = tokenObj?.token;
    config.headers = {
      ...config.headers,
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return config;
  }, handleError);

  let refreshing_token = null;
  axios.interceptors.response.use(
    async (response) => response,
    async (error) => {
      const config = error.config;
      if (error.response && error.response.status === 401 && !config._retry) {
        config._retry = true;
        try {
          refreshing_token = refreshing_token
            ? refreshing_token
            : refreshToken();
          let res = await refreshing_token;
          console.log("res :: ",res);
          refreshing_token = null;
          if (res?.data?.data?.token) {
            setCurrentTokenState(res?.data?.data);
          }
          return axios(config);
        } catch (err) {
          store.dispatch(logout());
          navigate("/sign-in");
        }
      }
    }
  );
};

export default setUpInterceptor;
