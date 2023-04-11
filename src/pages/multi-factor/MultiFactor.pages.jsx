import { Alert } from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { getUserProfile } from 'store/Actions/AuthActions';
// import { messageNotifications } from 'store';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row, Col, InputNumber } from 'antd';
import './MultiFactor.pages.scss'
// import {
//   ChangeMfaStatus,
//   initAuthenticationFail,
//   initAuthenticationPending,
//   initAuthenticationSuccess,
// } from 'store/Slices/authSlice';
// import { accountSuspended, closeLockScreen } from 'store/Slices/settingSlice';
// import Recaptcha from 'pages/Google-Recaptcha/Recaptcha';
// import { useCookies } from 'react-cookie';
// import { useTranslation } from 'react-i18next';
// import { getIPData, getDeviceName } from 'lib';

const initialValues = { 
    password: '',
    confirmPassword: '',
};

const SignUpSchema = Yup.object().shape({
    password: Yup.string()
    .required('password is required.')
    .min(6, 'Password must be atleast 6 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required.')
    .min(6, 'Password must be atleast 6 characters')
    .oneOf(
      [Yup.ref('password'), null],
      'Confirm Password must matches with Password'
    ),
});

const fields = [
    { name: 'password', label: 'Password', placeholder: '**********' },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: '**********',
  },
];


function MultiFactor() {
//   const { t } = useTranslation('/LoginPage/ns');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [cookies] = useCookies();
//   const isTrustDevice = cookies.admin_days ? true : false;
//   const refRecaptcha = useRef();
  let hasMFAEnabled = false;
//   const login = (userName, password, TrustDevice) => {
//     return async (dispatch) => {
//       dispatch(initAuthenticationPending());
//       const { ip, location } = await getIPData();
//       const response = await fetch(
//         `${process.env.REACT_APP_BASEURL}/api/tokens`,
//         {
//           method: 'POST',
//           body: JSON.stringify({
//             userName,
//             password,
//             TrustDevice,
//           }),
//           headers: new Headers({
//             'Content-type': 'application/json',
//             'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
//             tenant: 'admin',
//             'X-Forwarded-For': ip,
//             location,
//             devicename: getDeviceName(),
//           }),
//         }
//       );
//       if (!response.ok) {
//         const error = await response.json();
//         if (error.exception === 'User Not Found.') {
//           setError('User Not found, Please check your credentials');
//         }
//         if (error.exception.includes('User Not Active')) {
//           hasMFAEnabled = true;
//           // localStorage.setItem("Account-Suspended", true);
//           dispatch(accountSuspended());
//           navigate('/admin/account-suspended');

//           toast.error(
//             'Account has been suspended, Please contact administration',
//             {
//               ...messageNotifications,
//             }
//           );
//         }
//         dispatch(initAuthenticationFail(error));
//       }
//       const res = await response.json();
//       if (res.messages[0]) {
//         hasMFAEnabled = true;
//         navigate('/admin/one-time-password');
//         localStorage.setItem('userId', res.messages[1]);
//         localStorage.setItem('userName', res.messages[3]);
//         if (res.messages[4] === 'true') {
//           dispatch(ChangeMfaStatus());
//           toast.success('Please enter the 6 figure code from you MFA App', {
//             ...messageNotifications,
//           });
//         } else {
//           toast.success('Please verify otp to login', {
//             ...messageNotifications,
//           });
//         }
//       }
//       dispatch(initAuthenticationSuccess(res.data));
//       dispatch(closeLockScreen());
//       dispatch(getUserProfile(res.data.token));
//       localStorage.setItem('AuthToken', JSON.stringify(res.data));
//     };
//   };

  return (
    <div className="w-screen" >
            <Row className='bg-color' style={{height:'100%'}}>
                <Col lg={12}>
                    <div className='p-5'>
                        <p className="logoname">Pan<span style={{color:'#0096C7'}}>sophy</span></p>
                    </div>
                    <div className="col mx-4 mb-15">
                        <img src="/img/logo.svg" className="robotimg mx-auto" alt="" />
                    </div>
                </Col>
                <Col lg={12} className="p-4" style={{background:'#0C0E0F'}}>
                    <div className="p-5 ">
                        <div className="p-4">
                            <h2 className="text-md text-2xl text-white title">
                                Multi Factor Authentication
                            </h2>
                            <p className="custom-text-light mb-4 subtitle">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                        <Formik

                            initialValues={initialValues}
                            validationSchema={SignUpSchema}
                        // onSubmit={async (values, { resetForm }) => {
                        //   try {
                        //     setIsLoading(true);
                        //     await dispatch(
                        //       signup(
                        //         values.username,
                        //         values.password,
                        //         values.confirmPassword,
                        //         values.emailAddress,
                        //         values.fullName,
                        //         '1',
                        //         ipAddress
                        //       )
                        //     );
                        //     toast.success(
                        //       'Account Created Successfully, Pending email verification',
                        //       {
                        //         ...messageNotifications,
                        //       }
                        //     );
                        //     resetForm();
                        //     setIsLoading(false);
                        //   } catch (error) {
                        //     setIsLoading(false);
                        //     toast.error('Error. Check all fields and try again', {
                        //       ...messageNotifications,
                        //     });
                        //   }
                        // }}
                        >
                          {({ errors, touched }) => (
                                <Form>  
                                    <div className="pt-3">
                                        <InputNumber controls={false} defaultValue={2} size='large' min={1} max={100000} className='numberfield input mr-5' style={{textAlign:'center'}}/>
                                        <InputNumber controls={false} defaultValue="-" size='large' min={1} max={100000} className='numberfield input mr-5'/>
                                        <InputNumber controls={false} defaultValue="-" size='large' min={1} max={100000} className='numberfield input mr-5'/>
                                        <InputNumber controls={false} defaultValue="-" size='large' min={1} max={100000} className='numberfield input mr-5'/>
                                        <InputNumber controls={false} defaultValue="-" size='large' min={1} max={100000} className='numberfield input mr-5'/>
                                        <InputNumber controls={false} defaultValue="-" size='large' min={1} max={100000} className='numberfield input'/>
                                        
                                    </div>
                                    <div className="px-4" style={{paddingTop:'9.6rem'}}>
                                        
                                        <button
                                            type="submit"
                                            className="mt-4 submitButton hover:bg-blue-700 text-white w-full mb-2 rounded-md h-14 hover:bg-sky-600/[.8] ease-in duration-200"
                                        >
                                            Continue to Pansophy
                                        </button>                      
                            
                                    </div>
                                    
                                </Form>
                               
                            )}  
                            
                        </Formik>
                    </div>
                </Col>
            </Row>


        </div>
  );
}

export default MultiFactor;
