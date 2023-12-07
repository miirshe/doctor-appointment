import { ErrorMessage, Field, Form, Formik } from "formik"
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom"
import * as Yup from 'yup';
const HospitalLogin = () => {
  const [showPassword , setShowPassword] = useState('password');
  const initialValues  = {
    hospital_email : '',
    hospital_password : ''
  }
  const validationSchema = Yup.object({
    hospital_email : Yup.string().required('Email is required'),
    hospital_password : Yup.string().required('Password is required')
  })
  const handleSubmit = (values) => {
    console.log(values);
  }
  return (
    <div className='w-full p-2 lg:p-5 bg-white h-screen overflow-y-auto'>
    <div className='w-full lg:w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-5 p-3 lg:p-5'>
      <img src="/images/hospital.png" alt="" />
      <Formik onSubmit={handleSubmit} 
      initialValues={initialValues}
      validationSchema={validationSchema}>
        <Form className="w-full space-y-5 p-4">
          <h1 className="w-full text-xl tracking-widest">Hospital Login</h1>
          <div className="w-full space-y-3">
            <Field className="w-full p-3 rounded bg-[#EAEFF9] shadow outline-blue-600" type="text" name="hospital_email" placeholder = "Enter Hospital Email"/>
            <ErrorMessage component="div" name="hospital_email" className="text-red-500"/>
          </div>

          <div className="w-full space-y-3 relative">
              <Field className="w-full p-3 bg-[#EAEFF9]  rounded shadow outline-blue-600" type={showPassword} name="hospital_password"/>
              {
                showPassword == 'password' ? <BiHide className=" absolute right-3 top-0" size={25} onClick={() => setShowPassword('text')}/> 
                : <BiShow size={25} className=" absolute right-3 top-0" onClick={() => setShowPassword('password')}/> 
              }
              <ErrorMessage component="div" name="hospital_password" className="text-red-500"/>
            </div>
          
          <p>I don't have account ! <Link className="text-blue-600" to="/hospital-register">Hospital Register</Link></p>
          <button className="w-full p-3 rounded bg-blue-600 text-white" type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  </div>
  )
}

export default HospitalLogin