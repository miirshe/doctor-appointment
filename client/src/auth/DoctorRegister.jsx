import { ErrorMessage, Field, Formik, Form } from "formik"
import { useEffect, useRef, useState } from "react"
import { IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"
import * as Yup from 'yup'
import { IoCloudUploadOutline } from 'react-icons/io5';
const DoctorRegister = () => {
    const initialRegister = {
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        description: '',
        hos_id: '',
        hos_name: ''
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('name field is required'),
        email: Yup.string().required('email field is required'),
        phone: Yup.number().required('phone field is required'),
        address: Yup.string().required('address field is required'),
        password: Yup.string().required('password field is required'),
        description: Yup.string().required('description field is required'),
        hos_name: Yup.string().required('hos_name field is required'),
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
        console.log(values);
    }
    return (
        <div className="w-full md:w-[95%] lg:w-[90%] mx-auto p-4 mt-20">
            <div className="w-full flex flex-row justify-start items-center gap-5">
                <Link className=" hover:text-blue-600 transition-all ease-in-out" to='/'>Home</Link>
                <IoIosArrowForward className="inline" size={15} />
                <span>Doctor Register</span>
            </div>
            <div className="w-full md:w-[30%] mx-auto p-3 rounded">
                <button onClick={handleImageUpload}>
                    <IoCloudUploadOutline size={100} />
                </button>
                <p className="w-full text-center text-2xl"> Upload Image</p>
            </div>
            <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialRegister}>
                <Form className="w-full shadow-md rounded space-y-4 p-5 mt-10">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <div className="w-full space-y-3">
                            <Field type="text" className="w-full px-3 py-2 rounded border border-slate-400 outline-blue-600" name='name' placeholder="Enter Name" />
                            <ErrorMessage name="name" component="div" className="text-red-500" />
                        </div>
                        <div className="w-full space-y-3">
                            <Field type="text" className="w-full px-3 py-2 rounded border border-slate-400 outline-blue-600" name='email' placeholder="Enter Email" />
                            <ErrorMessage name="email" component="div" className="text-red-500" />
                        </div>
                        <div className="w-full space-y-3">
                            <Field type="number" className="w-full px-3 py-2 rounded border border-slate-400 outline-blue-600" name='phone' placeholder="Enter Phone" />
                            <ErrorMessage name="phone" component="div" className="text-red-500" />
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="w-full space-y-3">
                            <Field type="text" className="w-full px-3 py-2 rounded border border-slate-400 outline-blue-600" name='address' placeholder="Enter Address" />
                            <ErrorMessage name="address" component="div" className="text-red-500" />
                        </div>
                        <div className="w-full space-y-3">
                            <Field type="password" className="w-full px-3 py-2 rounded border border-slate-400 outline-blue-600" name='password' placeholder="Enter Password" />
                            <ErrorMessage name="password" component="div" className="text-red-500" />
                        </div>

                    </div>

                    <div className="w-full space-y-3">
                        <Field as="textarea" rows="4" className="w-full px-3 py-2 rounded border border-slate-400 outline-blue-600" name='description' placeholder="Enter Description" />
                        <ErrorMessage name="description" component="div" className="text-red-500" />
                    </div>
                    <div className="w-full space-y-3">
                        <Field as="select" rows="4" className="w-full px-3 py-2 rounded border border-slate-400 outline-blue-600" name='hos_name'>
                            <option value="">-select hospital name--</option>
                        </Field>
                        <ErrorMessage name="hos_name" component="div" className="text-red-500" />
                    </div>
                    <button className="w-full md:w-fit px-3 py-2 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600
                    transition-all ease-in-out" type="submit">Register Now</button>
                    <p>Already have an account <Link to='/doctor-login' className="text-red-500">Login</Link></p>

                </Form>
            </Formik>
        </div>
    )
}

export default DoctorRegister