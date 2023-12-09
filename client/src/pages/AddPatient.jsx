import { ErrorMessage, Field, Form, Formik } from "formik"
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom"
import * as Yup from 'yup'
const AddPatient = () => {
    const [showPassword, setShowPassword] = useState('password');
    const initialValues = {
        name: '',
        email: '',
        password: '',
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('name is required'),
        email: Yup.string().required('email is required'),
        password: Yup.string().required('password is required')
    })
    const handleSubmit = (values) => {
        console.log(values);
    }
    return (
        <div className="w-full p-5 space-y-5 mt-7">
            <div className="w-full p-5 bg-white rounded shadow">
                <Formik
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    initialValues={initialValues}>
                    <Form className="w-full space-y-5">
                        <Link className='bg-blue-600 px-3 py-2 rounded text-white' to='/patient-list'> <MdArrowBack className='inline' size={25} /> <span>Back</span> </Link>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="w-full space-y-2">
                                <Field
                                    type="text" name="name" placeholder="Enter Name"
                                    className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                                <ErrorMessage component='div' name="name" className="text-red-500" />
                            </div>
                            <div className="w-full space-y-2">
                                <Field type="text" name="email" placeholder="Enter Email"
                                    className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                                <ErrorMessage component='div' name="email" className="text-red-500" />
                            </div>
                        </div>
                        <div className="w-full space-y-3 relative">
                            <Field className="w-full p-3 bg-[#EAEFF9]  rounded shadow outline-blue-600" type={showPassword} name="patient_password" />
                            {
                                showPassword == 'password' ? <BiHide className=" absolute right-3 top-0 cursor-pointer" size={25} onClick={() => setShowPassword('text')} />
                                    : <BiShow size={25} className=" absolute right-3 top-0 cursor-pointer" onClick={() => setShowPassword('password')} />
                            }
                            <ErrorMessage component="div" name="patient_password" className="text-red-500" />
                        </div>
                        <button className="w-full md:w-[30%] p-3 rounded shadow bg-blue-600 text-white" type="submit">submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default AddPatient