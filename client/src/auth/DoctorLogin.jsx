import { ErrorMessage, Field, Formik, Form } from "formik"
import { IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"
import * as Yup from 'yup'
const DoctorLogin = () => {
    const initialRegister = {
        email: '',
        password: '',
    }
    const validationSchema = Yup.object({
        email: Yup.string().required('email field is required'),
        password: Yup.string().required('password field is required'),
    })
    const handleSubmit = (values) => {
        console.log(values);
    }
    return (
        <div className="w-full md:w-[95%] lg:w-[90%] mx-auto p-4 mt-20">
            <div className="w-full flex flex-row justify-start items-center gap-5">
                <Link className=" hover:text-blue-600 transition-all ease-in-out" to='/'>Home</Link>
                <IoIosArrowForward className="inline" size={15} />
                <span>Doctor Login</span>
            </div>
            <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialRegister}>
                <Form className="w-full md:w-[30%] mx-auto shadow-md rounded space-y-5 p-5 mt-10">
                    <h1 className="w-full text-center text-lg font-medium">Login</h1>
                    <div className="w-full space-y-3">
                        <Field type="text" className="w-full px-3 py-2 rounded border border-slate-400 outline-blue-600" name='email' placeholder="Enter Email" />
                        <ErrorMessage name="email" component="div" className="text-red-500" />
                    </div>
                    <div className="w-full space-y-3">
                        <Field type="password" className="w-full px-3 py-2 rounded border border-slate-400 outline-blue-600" name='password' placeholder="Enter Password" />
                        <ErrorMessage name="password" component="div" className="text-red-500" />
                    </div>
                    <button className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600
                    transition-all ease-in-out" type="submit">Login Now</button>
                    <p>Don't have an account <Link to='/doctor-register' className="text-red-500">Login</Link></p>

                </Form>
            </Formik>
        </div>
    )
}

export default DoctorLogin