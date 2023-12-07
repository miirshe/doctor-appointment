import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
const HospitalRegister = () => {
  const [showPassword , setShowPassword] = useState('password');
  const initialValues = {
    hospital_name: '',
    hospital_email: '',
    hospital_location: '',
    hospital_phone: '',
    hospital_password: '',
    hospital_description: '',
  }
  const validationSchema = Yup.object({
    hospital_name: Yup.string().required('Name is required'),
    hospital_email: Yup.string().required('Email is required'),
    hospital_location: Yup.string().required('Location is required'),
    hospital_phone: Yup.number().required('Phone is required'),
    hospital_password: Yup.string().required('<PASSWORD>'),
    hospital_description: Yup.string().required('Description is required'),
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
            <h1 className="w-full text-xl tracking-widest">Hospital Register</h1>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className="w-full space-y-3">
                <Field className="w-full p-3 rounded bg-[#EAEFF9] shadow outline-blue-600" type="text" name="hospital_name" placeholder="Enter Hospital Name" />
                <ErrorMessage component="div" name="hospital_name" className="text-red-500" />
              </div>

              <div className="w-full space-y-3">
                <Field className="w-full p-3 bg-[#EAEFF9]  rounded shadow outline-blue-600" type="text" name="hospital_email" placeholder="Enter Hospital Email" />
                <ErrorMessage component="div" name="hospital_email" className="text-red-500" />
              </div>
            </div>
            <div className="w-full space-y-3 relative">
              <Field className="w-full p-3 bg-[#EAEFF9]  rounded shadow outline-blue-600" type={showPassword} name="hospital_password"/>
              {
                showPassword == 'password' ? <BiHide className=" absolute right-3 top-0" size={25} onClick={() => setShowPassword('text')}/> 
                : <BiShow size={25} className=" absolute right-3 top-0" onClick={() => setShowPassword('password')}/> 
              }
              <ErrorMessage component="div" name="hospital_password" className="text-red-500"/>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className="w-full space-y-3">
                <Field className="w-full p-3 rounded bg-[#EAEFF9] shadow outline-blue-600" type="text" name="hospital_location" placeholder="Enter Hospital Location" />
                <ErrorMessage component="div" name="hospital_location" className="text-red-500" />
              </div>

              <div className="w-full space-y-3">
                <Field className="w-full p-3 bg-[#EAEFF9]  rounded shadow outline-blue-600" type="number" name="hospital_phone" placeholder="Enter Hospital Phone" />
                <ErrorMessage component="div" name="hospital_phone" className="text-red-500" />
              </div>
            </div>

            <div className="w-full space-y-3">
              <Field className="w-full p-3 bg-[#EAEFF9]  rounded shadow outline-blue-600" as="textarea" name="hospital_description" rows="4" placeholder="Enter Hospital Description" />
              <ErrorMessage component="div" name="hospital_description" className="text-red-500" />
            </div>

            <p> Already have account ! <Link className="text-blue-600" to="/hospital-login">Hospital Login</Link></p>
            <button className="w-full p-3 rounded bg-blue-600 text-white" type="submit">Login</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default HospitalRegister