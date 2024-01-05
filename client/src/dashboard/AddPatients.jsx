import { ErrorMessage, Field, Formik, Form } from "formik"
import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import * as Yup from 'yup'
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useRegisterPatientMutation, useUpdatePatientMutation } from "../redux/slices/PatientSlices"
import toast from "react-hot-toast"
import { MdArrowBack } from "react-icons/md";
const AddPatients = () => {
    // const navigate = useNavigate();
    const patientsData = useLocation().state;
    const [registerPatient] = useRegisterPatientMutation()
    const [ updatePatient ] = useUpdatePatientMutation();
    const initialRegister = {
        name: patientsData?.name || '',
        email: patientsData?.email || '',
        phone: patientsData?.phone || '',
        address: patientsData?.address || '',
        password: '',
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('name field is required'),
        email: Yup.string().required('email field is required'),
        phone: Yup.number().required('phone field is required'),
        address: Yup.string().required('address field is required'),
        password: !patientsData?.id && Yup.string().required('password field is required'),
    })

    const [images, setImages] = useState(null);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    console.log('my images', images);
    const setupCloudinaryWidget = () => {
        if (window.cloudinary) {
            cloudinaryRef.current = window.cloudinary;
            widgetRef.current = cloudinaryRef.current.createUploadWidget(
                {
                    cloudName: import.meta.env.VITE_APP_CLOUD_NAME,
                    uploadPreset: import.meta.env.VITE_APP_UPLOAD_PRESET,
                    maxFiles: 1,
                },
                (err, result) => {
                    if (err) {
                        console.error(err);
                    } else if (result.event === "success") {
                        // setImages((prevImages) => [...prevImages, result.info.secure_url]);
                        setImages(result.info.secure_url);
                    }
                }
            );
        }
    };

    useEffect(() => {
        setupCloudinaryWidget();
    }, []);


    const handleImageUpload = () => {
        widgetRef.current?.open();
    };

    const handleSubmit = (values) => {
        const { name, email, phone, address, password } = values;
        const image = images;
        if (!patientsData?.id) {
            registerPatient({ name, email, phone, address, password, image })
                .then((res) => {
                    const status = res.data.status;
                    if (status) {
                        toast.success(res?.data?.data);
                        // navigate('/')
                    } else {
                        toast.error(res?.data?.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            updatePatient({id : patientsData?.id , updatePatient : { name, email, phone, address , image,} })
                .then((res) => {
                    const status = res.data.status;
                    if (status) {
                        toast.success(res?.data?.data);
                        // navigate('/')
                    } else {
                        toast.error(res?.data?.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }

    }
    return (
        <div className="w-full lg:w-[95%] p-2 mt-10 mx-auto shadow rounded bg-white">
            <div className="w-full flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center gap-5">
                <div className="flex flex-row justify-start items-center gap-3 text-xs font-light lg:text-base">
                    <Link to='/'> <span className="text-blue-600">Home</span> / </Link>
                    <Link className="hover:text-blue-600" to='/dashboard'> Dashboard </Link>
                    <span> / Add Patients </span>
                </div>
                <Link className="px-3 py-2 rounded shadow bg-blue-600 text-white" to='/dashboard/patients'><MdArrowBack className="inline" size={20} /> <span> Back </span></Link>
            </div>
            <div className="w-full md:w-[30%] mx-auto p-3 rounded">
                <button onClick={handleImageUpload}>
                    <IoCloudUploadOutline size={100} />
                </button>
                <p className="w-full text-center text-2xl"> Upload Image</p>
            </div>
            <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialRegister}>
                <Form className="w-full space-y-3 p-3 mt-5 bg-[#FFFFFF]">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="w-full space-y-3">
                            <label htmlFor="" className="text-base font-medium ml-1">Name</label>
                            <Field type="text" className="w-full px-3 py-2 rounded border  outline-blue-600" name='name' placeholder="Enter Name" />
                            <ErrorMessage name="name" component="div" className="text-red-500" />
                        </div>
                        <div className="w-full space-y-3">
                            <label htmlFor="" className="text-base font-medium ml-1">Email</label>
                            <Field type="text" className="w-full px-3 py-2 rounded border  outline-blue-600" name='email' placeholder="Enter Email" />
                            <ErrorMessage name="email" component="div" className="text-red-500" />
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="w-full space-y-3">
                            <label htmlFor="" className="text-base font-medium ml-1">Phone</label>
                            <Field type="number" className="w-full px-3 py-2 rounded border outline-blue-600" name='phone' placeholder="Enter Phone" />
                            <ErrorMessage name="phone" component="div" className="text-red-500" />
                        </div>
                        <div className="w-full space-y-3">
                            <label htmlFor="" className="text-base font-medium ml-1">Address</label>
                            <Field type="text" className="w-full px-3 py-2 rounded border outline-blue-600" name='address' placeholder="Enter Address" />
                            <ErrorMessage name="address" component="div" className="text-red-500" />
                        </div>
                    </div>
                    {
                        !patientsData?.id && <div className="w-full space-y-3">
                            <label htmlFor="" className="text-base font-medium ml-1">Password</label>
                            <Field type="password" className="w-full px-3 py-2 rounded border outline-blue-600" name='password' placeholder="Enter Password" />
                            <ErrorMessage name="password" component="div" className="text-red-500" />
                        </div>
                    }
                    <button className="w-full md:w-fit px-3 py-2 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600
                    transition-all ease-in-out" type="submit">{ !patientsData?.id ? 'Register Now' : 'Update Now'}</button>
                </Form>
            </Formik>
        </div>
    )
}

export default AddPatients