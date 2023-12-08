import { ErrorMessage, Field, Form, Formik } from "formik"
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom"
import * as Yup from 'yup'
const AddPatient = () => {
    const [showPassword, setShowPassword] = useState('password');
    const initialValues = {
        patient_name: '',
        patient_email: '',
        patient_phone: '',
        patient_address: '',
        patient_password: '',
    }
    const validationSchema = Yup.object({
        patient_name: Yup.string().required('patient name is required'),
        patient_email: Yup.string().required('patient email is required'),
        patient_phone: Yup.number().required('patient phone is required'),
        patient_address: Yup.string().required('patient address is required'),
        patient_password: Yup.string().required('patient password is required')
    })
    const handleSubmit = (values) => {
        console.log(values);
    }
    return (
        <div className="w-full p-5 space-y-5">
            <h1 className=" space-x-5 p-2 text-lg">
                <Link className=" cursor-pointer" to='/dashboard'>Dashboard</Link>
                <span> / </span>
                <span> Patient </span>
                <span> / </span>
                <span className="text-blue-600"> Add Patient</span>
            </h1>
            <div className="w-full p-5 bg-white rounded shadow">
                <Formik
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    initialValues={initialValues}>
                    <Form className="w-full space-y-3">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="w-full space-y-2">
                                <Field 
                                type="text" name="patient_name" placeholder="Enter Patient Name"
                                    className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                                <ErrorMessage component='div' name="patient_name" className="text-red-500" />
                            </div>
                            <div className="w-full space-y-2">
                                <Field type="text" name="patient_email" placeholder="Enter Patient Email"
                                    className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                                <ErrorMessage component='div' name="patient_email" className="text-red-500" />
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="w-full space-y-2">
                                <Field type="number" name="patient_phone" placeholder="Enter Patient Phone"
                                    className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                                <ErrorMessage component='div' name="patient_phone" className="text-red-500" />
                            </div>
                            <div className="w-full space-y-2">
                                <Field type="text" name="patient_address" placeholder="Enter Patient Address"
                                    className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                                <ErrorMessage component='div' name="patient_address" className="text-red-500" />
                            </div>
                        </div>
                        <div className="w-full space-y-3 relative">
                            <Field className="w-full p-3 bg-[#EAEFF9]  rounded shadow outline-blue-600" type={showPassword} name="patient_password" />
                            {
                                showPassword == 'password' ? <BiHide className=" absolute right-3 top-0" size={25} onClick={() => setShowPassword('text')} />
                                    : <BiShow size={25} className=" absolute right-3 top-0" onClick={() => setShowPassword('password')} />
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