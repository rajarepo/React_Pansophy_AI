import { IconModal, Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { Progress as ProgressBar } from "antd";
// import { updateEmail } from 'store/Actions/settings';
import { SmsTracking, TickCircle } from "iconsax-react";
// import {Logout1} from "iconsax-react"
// import Logout1 from 'iconsax-svelte/Logout1.svelte';
import * as Yup from 'yup';

// const initialValues = {
//     email: '',
// };

const validationSchema = Yup.object().shape({
    email: Yup.string().required('This field is required!'),
});

export const DataCollectionComplete = ({ show, setShow, id, status, percent }) => {
    let statusText;
    switch (status) {
        case "importing":
            statusText = "Importing...";
            break;
        case "failed":
            statusText = "Import Failed";
            break;
        case "success":
            statusText = "Import Successfull";
            break;
        default:
            statusText = "Importing...";
            break;
    }
    const { user } = useSelector((state) => state?.settings)
    const dispatch = useDispatch();


    return (
        <IconModal
        cancelButtonText= {false}
             submitText='Proceed to Next Step'
            customBody={
                <div className="mb-[32px] text-center">
                    <div className="mt-4 ml-auto mr-auto popUpIconGreen">
                        <TickCircle className='iconPosition' size="30" color="#FFFFFF" variant="Linear" />
                    </div>
                    <div className='p-[20px] pb-[10px] '>
                        Data Collection Completed
                    </div>
                    <div className='p-[20px] pt-[5px] pb-[10px] text-[#6C757D]  '>
                        Data collection completed! You will be redirected to the next step.
                    </div>
                </div>
            }
            initialValues={{ id }}
            // submitText='Proceed to Next Step'
            // loading={loading}
            // handleSubmit={async () => {
            //     await dispatch(cancelRequestAtTheEnd(product?.id));
            //     setShow(false);
            // }}
            show={show}
            setShow={setShow}
            disableCancel={false}
        />
    );
};