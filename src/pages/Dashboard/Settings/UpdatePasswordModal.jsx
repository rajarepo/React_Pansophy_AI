import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const fields = [
    {
        type:'input',
        name: 'currentpassword',
        placeholder: '********',
        title: 'Current Password',
    },
    {
        type:'input',
        name: 'newpassword',
        placeholder: '********',
        title: 'New Password',
    },
    {
        type:'input',
        name: 'confirmpassword',
        placeholder: '********',
        title: 'Confirm Password',
    }
];

const initialValues = {
    updateemail: '',
};

const validationSchema =Yup.object().shape({
    updateemail: Yup.string().required('This field is required!'),
});

export const UpdatePasswordModal = ({ show, setShow, id }) => {
    // const dispatch = useDispatch();
    return (
        <Modal
            heading="Update Password"
            cancelButtonText={false}
            fields={fields}
            initialValues={initialValues}
            validationSchema={validationSchema}
            submitText="Save Changes"
            // handleSubmit={async () => {
            //     await dispatch(cancelRequestAtTheEnd(product?.id));
            //     setShow(false);
            // }}
            show={show}
            setShow={setShow}
        />
    );
};