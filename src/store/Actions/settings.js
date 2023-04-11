import { toast } from "react-toastify";
import { getUserDetailsDispatch, setSettingsLoading } from "store/Slices/settingsSlice";

export const getUserDetails = () => {
    return async (dispatch,getState) => { 
        const currentToken = sessionStorage.getItem("token");      
      dispatch(setSettingsLoading(true));
      try {
        const response = await fetch(
          `https://pansophy-api.m2mbeta.com/api/v1/users/me`,
          {
              method: 'GET',
              headers: new Headers({
                  'Access-Control-Allow-Origin': '*',
                   'Authorization': `Bearer ${currentToken}`,
                  'x-api-key': 'qwertyuioasdfghjklzxcvbnm'
              }),
  
          }
      );
        const res = await response.json();         
        await dispatch(getUserDetailsDispatch(res));
        dispatch(setSettingsLoading(false));
      } catch (e) {
        dispatch(setSettingsLoading(false));
      }
    };
  };

  export const updateName = (full_name,setShow) => {
    return async (dispatch) => {
        const currentToken = sessionStorage.getItem("token");    
        const response = await fetch(
            `https://pansophy-api.m2mbeta.com/api/v1/users/me`,
            {
                method: 'PUT',
                body:JSON.stringify({
                    full_name,
                  }),
                headers: new Headers({
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${currentToken}`,
                    'x-api-key': 'qwertyuioasdfghjklzxcvbnm'
                }),

            }
        );
        if(response?.status === 200){
            dispatch(getUserDetails());
            setShow(false);
        }
        else if(response?.status === 429){
            toast.error("Rate limit exceeded: 5 per 1 minute")
        }
         const res = await response.json();

    };
};

export const updateEmail = (email,setShow) => {
    return async (dispatch) => {
        const currentToken = sessionStorage.getItem("token");    
        const response = await fetch(
            `https://pansophy-api.m2mbeta.com/api/v1/users/me`,
            {
                method: 'PUT',
                body:JSON.stringify({
                    email
                  }),
                headers: new Headers({
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${currentToken}`,
                    'x-api-key': 'qwertyuioasdfghjklzxcvbnm'
                }),

            }
        );
        if(response?.status === 200){
            dispatch(getUserDetails());
            setShow(false);
        }
        else if(response?.status === 429){
            toast.error("Rate limit exceeded: 5 per 1 minute")
        }
         const res = await response.json();
    };
};

export const changeMFAstatus = (setEnableMFA) => {
    return async (dispatch, getState) => {
        const currentToken = sessionStorage.getItem("token");
        const { user } = getState().settings;
        const response = await fetch(
            `https://pansophy-api.m2mbeta.com/api/v1/users/setup-mfa/${user?.id}`,
            {
                method: 'PUT',
                headers: new Headers({
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${currentToken}`,
                    'x-api-key': 'qwertyuioasdfghjklzxcvbnm'
                }),
            }
        );
        if(response?.status === 200){
            const res = await response.json();
            let img =res?.totp_uri
            const qrCode = sessionStorage.setItem("qrCode",img);
            setEnableMFA(true)
        }
        else{
            toast.error("The user doesn't have enough privileges")
        }
       
    };
};

export const verifyMFAOtp = (otp) => {
    return async (dispatch, getState) => {
        const currentToken = sessionStorage.getItem("token");
        const { user } = getState().settings;
        const response = await fetch(
            `https://pansophy-api.m2mbeta.com/api/v1/users/verify-otp/${otp}?email=${user?.email}`,
            {
                method: 'POST',
                headers: new Headers({
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${currentToken}`,
                    'x-api-key': 'qwertyuioasdfghjklzxcvbnm'
                }),
            }
        );
    };
};