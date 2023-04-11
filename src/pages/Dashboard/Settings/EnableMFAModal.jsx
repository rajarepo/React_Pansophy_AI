import { Modal } from 'components';
import React from 'react';
import QRCode from "react-qr-code";
import { useDispatch } from 'react-redux';
import { verifyMFAOtp } from 'store/Actions/settings';
import * as Yup from 'yup';

const initialValues = {
    otp: '',
};

const validationSchema = Yup.object().shape({
    otp: Yup.string().required('This field is required!'),
});

export const EnableMFAModal = ({ show, setShow, id }) => {
    const qrCode = sessionStorage.getItem("qrCode");
    const dispatch = useDispatch();
    const fields = [
        {
            type: 'input',
            name: 'otp',
            placeholder: 'Enter MFA Code...',
            title: 'Enter Code From MFA Application',
        }
    ];

    return (
        <Modal
            headerBody={
                <div className='mt-4 QRcodebg bg-white' style={{ borderRadius: '8px', marginLeft: "35px" }}>
                    <div className="flex items-center justify-center">
                        <QRCode size={350} className="mt-10"
                            value={qrCode} />

                    </div>
                </div>

            }
            heading="Set Up MFA"

                fields={fields}
                initialValues={initialValues}
                validationSchema={validationSchema}
                submitText="Enable Multi Factor Authentication"
                cancelButtonText='Close Window'
                handleSubmit={(values) => 
                    dispatch(verifyMFAOtp(values?.otp))}
                show={show}
                setShow={setShow}

        />

    );
};