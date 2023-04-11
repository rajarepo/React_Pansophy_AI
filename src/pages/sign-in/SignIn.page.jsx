import { Alert } from 'react-bootstrap';
import { Provider, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { getUserProfile } from 'store/Actions/AuthActions';
// import { messageNotifications } from 'store';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row, Col } from 'antd';
import './SignIn.page.scss';
import SignUp from '../sign-up/SignUp.page';
import { currentTokenDispatch, initAuthenticationPending, initAuthenticationSuccess } from 'store/Slices/authSlice';
import { SaveTokenInLocalStorage } from 'store/Actions/AuthActions';
import { toast } from 'react-toastify';
import { VerifyYourEmail } from 'pages/Dashboard/AllPopupmodel/VerifyYourEmail';
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
    username: '',
    password: '',
};

const SignUpSchema = Yup.object().shape({
    username: Yup.string()
        .required('Email Address is required.')
        .email('Email format not recognized.'),
    password: Yup.string()
        .required('password is required.')
        .min(6, 'Password must be atleast 8 characters'),
});

const fields = [
    { name: 'username', label: 'Email Address', placeholder: 'paul.elliott@fakemail.com' },
    { name: 'password', label: 'Password', placeholder: '**********' },
];

function SignIn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = (email, password) => {
        return async () => {
            initialValues.username = email;
            initialValues.password = password;
            const formBody = Object.keys(initialValues)
                .map(key => encodeURIComponent(key) + '=' +
                    encodeURIComponent(initialValues[key])).join('&');
            dispatch(initAuthenticationPending());
            const response = await fetch(
                `https://pansophy-api.m2mbeta.com/api/v1/login/access-token`,
                {
                    method: 'POST',
                    body: formBody,
                    headers: new Headers({
                        'Content-type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*'
                    }),

                }
            );
            const res = await response.json();
            if (response?.status === 200) {
                navigate(`/dashboard/`)
            }
            else if (response?.status != 200) {
                toast.error("Username/Password in Incorrect")
            }
            sessionStorage.setItem("token", res?.access_token);
            dispatch(initAuthenticationSuccess(res.data));
            SaveTokenInLocalStorage(dispatch, res.data);
        }
    }

    return (
        <div className="w-screen min-height">
            <Row className='bg-color' style={{ height: '100%' }}>
                <Col lg={12}>
                    <div className='p-5'>
                        <p className="logoname">Pan<span style={{ color: '#0096C7' }}>sophy</span></p>
                    </div>
                    <div className="col mx-4 mb-15"
                    >
                        <img src="/img/logo.svg" className="mx-auto robotimg" alt="" />
                    </div>
                </Col>
                <Col lg={12} className="p-4" style={{ background: '#0C0E0F' }}>
                    <div className="p-5 ">
                        <div className="p-4">
                            <h2 className="text-md text-2xl text-white title">
                                Sign In
                            </h2>
                            <p className="custom-text-light mb-4 subtitle">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                        <Formik

                            initialValues={initialValues}
                            validationSchema={SignUpSchema}
                            onSubmit={async (values, { resetForm }) => {
                                try {
                                    await dispatch(
                                        login(values.username, values.password)
                                    )
                                } catch (err) {

                                }
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    {fields.map((field) => {
                                        return (
                                            <div className="pt-3 p-4" key={field?.name}>
                                                <Row>
                                                    <Col lg={12}>
                                                        <label
                                                            htmlFor={field?.name}
                                                            className="form-label text-white font-light text-sm"
                                                        >
                                                            {field?.label}
                                                        </label>
                                                    </Col>
                                                    <Col lg={12}>
                                                        {errors[field?.name] && touched[field?.name] ? (
                                                            <div className="text-red-600 text-sm">
                                                                {errors[field?.name]}
                                                            </div>
                                                        ) : null}
                                                    </Col>
                                                </Row>
                                                <Field
                                                    type={
                                                        field?.name === 'password' ||
                                                            field?.name === 'confirmPassword'
                                                            ? 'password'
                                                            : 'text'
                                                    }
                                                    className="w-full h-12 input rounded-md placeholder:text-gray-400 text-gray-400 placeholder:text-sm px-3 placeholder:font-light focus:outline-none"
                                                    id={field?.name}
                                                    name={field?.name}
                                                    placeholder={field?.placeholder}
                                                />
                                            </div>
                                        );
                                    })}
                                    <div className="p-4" style={{ paddingTop: '3.6rem' }}>
                                        <div className='d-flex' style={{ columnGap: '10px' }}>
                                            <div className="col-6">
                                                <button
                                                    type="ghost"
                                                    className="mt-4 p-2 cancelButton hover:bg-blue-700 text-white w-full mb-2 rounded-md h-14 hover:bg-sky-600/[.8] ease-in duration-200"
                                                    onClick={() => {
                                                        navigate(
                                                            `/sign-up`
                                                        );
                                                    }}
                                                >
                                                    Create an Account
                                                </button>
                                            </div>
                                            <div className="col-6">
                                                <button
                                                    type="submit"
                                                    className="mt-4 p-2 submitButton hover:bg-blue-700 text-white w-full mb-2 rounded-md h-14 hover:bg-sky-600/[.8] ease-in duration-200"
                                                >
                                                    Sign In
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='forgotpwd pt-5'>
                                        <Link to="/forgot-password"> Forgot your Password? </Link>
                                        <Link to="/forgot-password" className="text-blue-400"> Reset Password</Link>
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

export default SignIn;
