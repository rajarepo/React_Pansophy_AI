import { Modal } from 'components';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateName } from 'store/Actions/settings';
import { getUserDetailsDispatch, setSettingsLoading } from 'store/Slices/settingsSlice';
import * as Yup from 'yup';

const initialValues = {
    full_name: '',
};

const validationSchema = Yup.object().shape({
    full_name: Yup.string().required('This field is required!'),
});

export const UpdateNameModal = ({ show, setShow, id }) => {
    const { user } = useSelector((state) => state?.settings)
    const dispatch = useDispatch();
    const fields = [
        {
            type: 'input',
            name: 'full_name',
            placeholder: user?.full_name,
            title: 'Full Name',
        }
    ];

    return (
        <Modal
            heading="Update Name"
            cancelButtonText={false}
            fields={fields}
            initialValues={initialValues}
            validationSchema={validationSchema}
            submitText="Save Changes"
            handleSubmit ={ (values) => {
                 dispatch(                   
                    updateName(values?.full_name,setShow)
                   
                )
            }
            }
            show={show}
            setShow={setShow}
        />
    );
};