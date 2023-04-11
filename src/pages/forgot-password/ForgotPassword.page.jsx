import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row, Col } from 'antd';
import { toast } from 'react-toastify';
import { VerifcationEmail } from 'pages/Dashboard/AllPopupmodel/VerificationEmail';
import './Forgot-password.scss';
const initialValues = {
    email: '',
};

const SignUpSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email Address is required.')
        .email('Email format not recognized.'),
});

const fields = [
    { name: 'email', label: 'Email Address', placeholder: 'paul.elliott@fakemail.com' },
];


function ForgotPassword() {
    const currentToken = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showAdd, setShowAdd] = useState(false);

    const passwordRecovery = (email)=> {
        return async (dispatch) => {
            try{
                const response = await fetch(
                    `https://pansophy-api.m2mbeta.com/api/v1/password-recovery/${email}`,
                    {
                        method: 'POST',
                        headers: new Headers({
                            'Access-Control-Allow-Origin': '*',
                            'Authorization': `Bearer ${currentToken}`,
                            'x-api-key': 'qwertyuioasdfghjklzxcvbnm'
                        }),

                    }
                );
                const res = await response.json();

                if (response?.status === 200) {
                    setShowAdd(true)
                 }
            }catch(e) {
                console.error(e)
                toast.error("Email Not Registered")
            }
        };
    }

    return (
        <div className="w-screen min-height" >
             <VerifcationEmail show={showAdd} setShow={setShowAdd} />
            <Row className='bg-color' style={{ height: '100%' }}>
                <Col lg={12}>
                    <div className='p-5'>
                        <p className="logoname">Pan<span style={{ color: '#0096C7' }}>sophy</span></p>
                    </div>
                    <div className="col mx-4 mb-15 ">
                        <img src="/img/logo.svg" className="robotimg mx-auto" alt="" />
                    </div>
                </Col>
                <Col lg={12} className="p-4 " style={{ background: '#0C0E0F' }}>
                    <div className="p-5 ">
                        <div className="p-4">
                            <h2 className="text-md text-2xl text-white title">
                                Forgot Password
                            </h2>
                            <p className="custom-text-light mb-4 subtitle">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                        <Formik

                            initialValues={initialValues}
                            validationSchema={SignUpSchema}
                            onSubmit={async (values, { resetForm }) => {
                                await dispatch(
                                    passwordRecovery(
                                        values.email,
                                    )
                                )
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
                                    <div className="px-4" style={{ paddingTop: '9.6rem' }}>

                                        <button
                                        // onClick={() => setShowAdd(true)}
                                            type="submit"
                                            className="mt-4 submitButton hover:bg-blue-700 text-white w-full mb-2 rounded-md h-14 hover:bg-sky-600/[.8] ease-in duration-200"
                                        >
                                            Send Email
                                        </button>

                                    </div>
                                    <div className='forgotpwd pt-5'>
                                        <Link to="#"> Didn't receive email? </Link>
                                        <Link to="/reset-password" className="text-blue-400"> Resend Email</Link>
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

export default ForgotPassword;