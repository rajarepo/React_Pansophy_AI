import { IconModal, Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
// import { updateEmail } from 'store/Actions/settings';
import { SmsTracking } from "iconsax-react";
import * as Yup from 'yup';

// const initialValues = {
//     email: '',
// };

const validationSchema = Yup.object().shape({
    email: Yup.string().required('This field is required!'),
});

export const VerifyYourEmail = ({ show, setShow, id }) => {
    const { user } = useSelector((state) => state?.settings)
    const dispatch = useDispatch();
    return (
        <IconModal
            // heading="Cancelation Request"
            // cancelButtonText="Go Back"
            customBody={
                <div className="mb-[32px] text-center">
                    <div className="mt-4 ml-auto mr-auto popUpIconBlue">
                        <SmsTracking className='iconPosition' size="30" color="#FFFFFF" variant="Linear" />
                    </div>
                    <div className='p-[20px] pb-[10px] '>
                        Verify Your Email
                    </div>
                    <div className='p-[20px] pt-[5px] pb-[10px] text-[#6C757D]  '>
                        Please click the link sent to your email address to complete the registration process.
                    </div>
                </div>
            }
            initialValues={{ id }}
            cancelButtonText='Close Window'
            submitText={false}
            // loading={loading}
            // handleSubmit={async () => {
            //     await dispatch(cancelRequestAtTheEnd(product?.id));
            //     setShow(false);
            // }}
            show={show}
            setShow={setShow}
        />
    );
};