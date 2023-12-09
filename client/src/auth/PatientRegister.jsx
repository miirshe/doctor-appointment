import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
const PatientRegister = () => {
    const [showPassword, setShowPassword] = useState('password');
    const initialValues = {
        name : '',
        email: '',
        password: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    })
    const handleSubmit = (values) => {
        console.log(values);
    }
    return (
        <div className='w-full p-2 lg:p-5 bg-white h-screen overflow-y-auto'>
            <div className='w-full lg:w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-5 p-3 lg:p-5'>
                <img src="/images/doctor.png" alt="" />
                <Formik onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}>
                    <Form className="w-full space-y-5 p-4 relative">
                        <div className="w-full flex flex-row justify-between items-center">
                            <h1 className="text-xl tracking-widest">login</h1>
                            <Link to="/user-login" className="text-red-500">are you user ?</Link>
                        </div>
                        <div className="w-full space-y-3">
                            <Field className="w-full p-3 rounded bg-[#EAEFF9] shadow outline-blue-600" type="text" name="name" placeholder="Enter Name" />
                            <ErrorMessage component="div" name="name" className="text-red-500" />
                        </div>

                        <div className="w-full space-y-3">
                            <Field className="w-full p-3 rounded bg-[#EAEFF9] shadow outline-blue-600" type="text" name="email" placeholder="Enter Email" />
                            <ErrorMessage component="div" name="email" className="text-red-500" />
                        </div>

                        <div className="w-full space-y-3 relative">
                            <Field className="w-full p-3 bg-[#EAEFF9]  rounded shadow outline-blue-600" type={showPassword} name="password" />
                            {
                                showPassword == 'password' ? <BiHide className=" absolute right-3 top-0 cursor-pointer" size={25} onClick={() => setShowPassword('text')} />
                                    : <BiShow size={25} className=" absolute right-3 top-0 cursor-pointer" onClick={() => setShowPassword('password')} />
                            }
                            <ErrorMessage component="div" name="password" className="text-red-500" />
                        </div>
                        <button className="w-full p-3 rounded bg-blue-600 text-white" type="submit">Register</button>
                        <p className="w-full text-center space-x-2">I don't have account <Link className="text-red-500" to='/patient-login'>Login</Link></p>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default PatientRegister