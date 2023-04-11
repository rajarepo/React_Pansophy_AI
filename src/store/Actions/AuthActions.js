// import {
//   getError,
//   axios,
//   getProfile,
//   changePasswordConfig,
//   updateEmailConfig,
//   getIPData,
//   getDeviceName,
//   updateUserProfileByIDConfig,
//   getUserProfileByIDConfig,
// } from "lib";
// import { getCurrentTokenState } from "lib/axios-interceptors";
// import { toast } from "react-toastify";
// import {
//   authenticationFail,
//   authenticationPending,
//   authenticationSuccess,
//   autoAuthenticationSuccess,
//   confirmOtpFail,
//   confirmOtpPending,
//   confirmOtpSuccess,
//   fetchAuthentorUriFail,
//   fetchAuthentorUriPending,
//   fetchAuthentorUriSuccess,
//   forgotPasswordFail,
//   forgotPasswordPending,
//   forgotPasswordSuccess,
//   initAuthenticationFail,
//   initAuthenticationPending,
//   initAuthenticationSuccess,
//   logout,
//   // resetPasswordFail,
//   // resetPasswordPending,
//   // resetPasswordSuccess,
//   // verificationFail,
//   // verificationPending,
//   // verificationSuccess,
// } from "store/slices/authSlice";
// import { logout } from "store/slices/authSlice";
// import {
//   checkMaintenanceFail,
//   checkMaintenancePending,
//   checkMaintenanceSuccess,
//   fetchSettingsFail,
//   fetchSettingsPending,
//   fetchSettingsSuccess
// } from "store/Slices/settingSlice";
// import {
//   UserRegistrationFail,
//   UserRegistrationPending,
//   UserRegistrationSuccess,
// } from "store/Slices/userRegistrationSlice";

const getAuthToken = (dispatch) => {
  const AuthToken = localStorage.getItem("AuthToken");

  // if (!AuthToken) {
  //   dispatch(logout());
  //   return;
  // }

  if (typeof AuthToken !== "undefined") {
    return JSON.parse(AuthToken && AuthToken);
  }

  return null;
}

export const SaveTokenInLocalStorage = (dispatch, userDetails) => {
  localStorage.setItem("CurrentUser", JSON.stringify(userDetails));
};

// // Update Email
// export const updateEmail = (data) => async (dispatch) => {
//   dispatch(initAuthenticationPending());
//   try {
//     const { url } = updateEmailConfig();
//     await axios.put(url, data);
//     const profileConfig = getProfile();
//     const profileRes = await axios.get(profileConfig?.url);
//     dispatch(
//       authenticationSuccess({
//         user: profileRes?.data?.data,
//       })
//     );
//     toast.success("Email updated successfully");
//   } catch (error) {
//     toast.error("Email update failed");
//   }
// };
// // Change Password
// export const changePassword = (values) => {
//   return async function (dispatch) {
//     dispatch(initAuthenticationPending());
//     try {
//       const { url } = changePasswordConfig();
//       await axios.post(url, values);
//       dispatch(logout());
//       toast.success(
//         "Password changed successfully, Please login again using new password"
//       );
//     } catch (e) {
//       toast.error(getError(e));
//     }
//   };
// };

// // Update User Profile
// export const updateUserProfile = (id, profile) => {
//   return async function (dispatch) {
//     dispatch(initAuthenticationPending());
//     try {
//       const { url } = updateUserProfileByIDConfig(id);
//       await axios.put(url, profile);
//       const profileConfig = getUserProfileByIDConfig(id);
//       const profileRes = await axios.get(profileConfig?.url);
//       dispatch(
//         authenticationSuccess({
//           user: profileRes?.data?.data,
//         })
//       );
//     } catch (e) {
//       toast.error(getError(e));
//     }
//   };
// };

// export const getUserProfile = (token) => {
//   return async (dispatch) => {
//     dispatch(authenticationPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/identity/profile`,
//       {
//         method: "GET",
//         headers: new Headers({
//           "Content-type": "application/json",
//           "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
//           tenant: "admin",
//           Authorization: `Bearer ${token}`,
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(authenticationFail(error));
//     }
//     const res = await response.json();
//     dispatch(
//       authenticationSuccess({
//         user: res.data,
//       })
//     );
//     SaveTokenInLocalStorage(dispatch, res.data);

//   };
// };

// export const signup = (
//   userName,
//   password,
//   confirmPassword,
//   email,
//   fullName,
//   status,
//   IpAddress
// ) => {
//   return async (dispatch) => {
//     dispatch(UserRegistrationPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/identity/register-admin`,
//       {
//         method: "POST",
//         body: JSON.stringify({
//           userName,
//           password,
//           confirmPassword,
//           email,
//           fullName,
//           status,
//           IpAddress,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//           "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
//           tenant: "admin",
//         }),
//       }
//     );

//     if (!response.ok) {
//       const error = await response.json();
//       let message = "";
//       if (error.message === "Email already in use") {
//         message = "Account with the same email already exits";
//       } else {
//         message =
//           "Failed to create account, Please check your connection and try again";
//       }
//       dispatch(UserRegistrationFail(message));
//     }
//     const data = await response.json();
//     dispatch(UserRegistrationSuccess(data));
//   };
// };

// export const forgotPassword = (email) => {
//   return async (dispatch) => {
//     dispatch(forgotPasswordPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/identity/forgot-password`,
//       {
//         method: "POST",
//         body: JSON.stringify({
//           email,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//           "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
//           tenant: "admin",
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(forgotPasswordFail(error));
//     }
//     const data = await response.json();
//     dispatch(forgotPasswordSuccess(data));
//   };
// };

// export const passwordReset = (email, password, confirmPassword, token) => {
//   return async (dispatch) => {
//     dispatch(resetPasswordPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/identity/reset-password`,
//       {
//         method: "POST",
//         body: JSON.stringify({
//           email,
//           password,
//           confirmPassword,
//           token,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//           tenant: "admin",
//           "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(resetPasswordFail(error));
//     }
//     const data = await response.json();
//     dispatch(resetPasswordSuccess(data));
//   };
// };

// export const validateEmailToken = (userId, code, navigate) => {
//   return async (dispatch) => {
//     dispatch(verificationPending());
//     try {
//       const res = await axios(
//         `${
//           process.env.REACT_APP_BASEURL
//         }/api/identity/confirm-email?userId=${userId}&code=${code.trim()}&tenant=admin`,
//         {
//           method: "GET",
//           headers: new Headers({
//             "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
//             tenant: "admin",
//           }),
//         }
//       );
//       if (res.status === 200) {
//         dispatch(verificationSuccess(res.data));
//         navigate("/admin/sign-in");
//         toast.success("Email Verified Successfuly");
//       }
//     } catch (error) {
//       toast.error("Failed to verify email");
//       navigate("/admin/sign-in");
//       dispatch(verificationFail(error.data));
//     }
//   };
// };

// export const AutoAuthenticate = (dispatch) => {
//   const CurrentUser = localStorage.getItem("CurrentUser");

//   const UserToken = getAuthToken(dispatch);
//   if (!UserToken) return;
//   const expireDate = new Date(UserToken.refreshTokenExpiryTime);
//   const todaysDate = new Date();
//   if (todaysDate > expireDate) {
//     return dispatch(logout());
//   }
//   const data = {
//     token: UserToken.token,
//     user: typeof CurrentUser !== "undefined" ? JSON.parse(CurrentUser) : null,
//   };
//   dispatch(autoAuthenticationSuccess(data));
// };

// export const maintenanceStatus = (token) => {
//   return async (dispatch) => {
//     dispatch(checkMaintenancePending());
//     const response = await fetch(
//       `/api/maintenance/maintenancemode/admin`,
//       {
//         method: "GET",
//         headers: new Headers({
//           "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
//           tenant: "admin",
//           modulename: "Maintenance",
//           moduleactionname: "Get"
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(checkMaintenanceFail(error));
//     }
//     const res = await response.json();
//     dispatch(checkMaintenanceSuccess(res));
//   };
// };

// export const trustedDays = () => {
//   return async (dispatch) => {
//     dispatch(fetchSettingsPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/v1/admin/settings/getsettingswithtenant/admin`,
//       {
//         method: "GET",
//         headers: new Headers({
//           "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
//           tenant: "admin",
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(fetchSettingsFail(error));
//     }
//     const res = await response.json();
//     dispatch(fetchSettingsSuccess(res.data));
//   };
// };

// export const loginbyOtp = (userName, otpCode) => {
//   return async (dispatch) => {
//     dispatch(initAuthenticationPending());
//     const { ip, location } = await getIPData();
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/tokens/gettokenbyotp`,
//       {
//         method: "POST",
//         body: JSON.stringify({
//           userName,
//           otpCode,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//           "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
//           tenant: "admin",
//           "X-Forwarded-For": ip,
//           location,
//           devicename: getDeviceName(),
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(initAuthenticationFail(error));
//     }
//     const res = await response.json();
//     dispatch(initAuthenticationSuccess(res.data));
//     dispatch(getUserProfile(res.data.token));
//     localStorage.setItem("AuthToken", JSON.stringify(res.data));
//   };
// };

// export const confirmOtp = (userId, otp) => {
//   return async (dispatch) => {
//     dispatch(confirmOtpPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/mfauthenticator/validate-mfa`,
//       {
//         method: "POST",
//         body: JSON.stringify({
//           userId,
//           otp,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//           "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
//           tenant: "admin",
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(confirmOtpFail(error));
//     }
//     const res = await response.json();
//     dispatch(confirmOtpSuccess(res));
//     const username = localStorage.getItem("userName");
//     dispatch(loginbyOtp(username, otp));
//   };
// };

// export const validateMFA = (userId, code, isRemember) => {
//   return async (dispatch) => {
//     dispatch(initAuthenticationPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/mfauthenticator/validate-mfa`,
//       {
//         method: "POST",
//         body: JSON.stringify({
//           userId,
//           code,
//           isRemember,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//           "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
//           tenant: "admin",
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(initAuthenticationFail(error));
//     }
//     const res = await response.json();
//     dispatch(initAuthenticationSuccess(res.tokenResponse));
//     dispatch(getUserProfile(res.tokenResponse.token));
//     localStorage.setItem("AuthToken", JSON.stringify(res.tokenResponse));
//   };
// };

// export const disableConfirmOtp = (userId, otp, isRemember) => {
//   return async (dispatch) => {
//     dispatch(confirmOtpPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/mfauthenticator/removetwofactorauthentication`,
//       {
//         method: "POST",
//         body: JSON.stringify({
//           userId,
//           otp,
//           isRemember,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//           "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
//           tenant: "admin",
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(confirmOtpFail(error));
//     }
//     const res = await response.json();
//     dispatch(confirmOtpSuccess(res));
//     const username = localStorage.getItem("userName");
//     dispatch(loginbyOtp(username, otp));
//   };
// };

// export const GetMFAUri = (userId) => {
//   return async (dispatch) => {
//     dispatch(fetchAuthentorUriPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/mfauthenticator/get-mfa-key`,
//       {
//         method: "POST",
//         body: JSON.stringify({
//           userId,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//           "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
//           tenant: "admin",
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(fetchAuthentorUriFail(error));
//     }
//     const res = await response.json();
//     dispatch(fetchAuthentorUriSuccess(res?.authenticatorUri));
//   };
// };

// export const loginAsClient = (userId, messageNotifications) => {
//   return async (dispatch) => {
//     dispatch(verificationPending());
//     const current = getCurrentTokenState();
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/tokens/loginadminasclient?clientId=${userId}`,
//       {
//         method: "POST",
//         headers: new Headers({
//           "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
//           tenant: "admin",
//           Authorization: `Bearer ${current?.token}`,
//           AdminAsClient: "admin"
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(verificationFail(error));
//       dispatch(authenticationFail('Login as client failed'))
//       toast.error("Login as client failed", {
//         ...messageNotifications,
//       });
//       return;
//     }
//     const res = await response.json();
//     const token = res.data;
//     const authToken = getAuthToken(dispatch);
//     const CurrentUser = localStorage.getItem("CurrentUser");
//     const userProfile = JSON.parse(CurrentUser);
//     localStorage.removeItem("AuthToken");
//     localStorage.removeItem("CurrentUser");
//     token.adminSession = {
//       token: authToken.token,
//       adminId: userProfile.id,
//       fullName: userProfile.fullName
//     }
//     window.location.href = `${process.env.REACT_APP_CLIENT_SITE_URL}/client/sign-in-by-token?token=${encodeURI(JSON.stringify(token))}`;
//   };
// }