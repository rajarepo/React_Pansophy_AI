import { IconModal, Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { Progress as ProgressBar } from "antd";
// import { updateEmail } from 'store/Actions/settings';
import { SmsTracking, TickCircle, Warning2 } from "iconsax-react";
// import {Logout1} from "iconsax-react"
// import Logout1 from 'iconsax-svelte/Logout1.svelte';
import * as Yup from 'yup';

// const initialValues = {
//     email: '',
// };

const validationSchema = Yup.object().shape({
    email: Yup.string().required('This field is required!'),
});

export const UploadFailed = ({ show, setShow, id, status, percent }) => {
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
            // heading="Cancelation Request"
            // cancelButtonText="Go Back"
            customBody={
                <div className="mb-[32px] text-center">
                    <div className="mt-4 ml-auto mr-auto popUpIconRed">
                        <Warning2 className='iconPosition' size="30" color="#FFFFFF" variant="Linear" />
                    </div>
                    <div className='p-[20px] pb-[10px] '>
                        Upload Failed
                    </div>
                    <div className='p-[40px] pt-[5px] pb-[10px] text-[#6C757D]  '>
                        Please check that the format in your data corresponds to that on Sample CSVs.
                    </div>
                    {/* <ProgressBar className='ml-5'
                        percent={percent}
                        // format={(percent) => <div className="text-white">{percent}</div>}
                        strokeColor={status === "failed" ? "#F64E60" : "#0BB783"}
                        trailColor="#323248"
                    /> */}
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