import { ErrorMessage, Field, Form, Formik } from "formik"
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom"
import * as Yup from 'yup';
const DoctorRegister = () => {
  const [showPassword, setShowPassword] = useState('password');
  const initialValues = {
    doctor_name: '',
    doctor_email: '',
    doctor_address: '',
    doctor_phone: '',
    doctor_password: '',
    doctor_description: '',
    doctor_specialization: '',
    doctor_experience: '',
  }
  const validationSchema = Yup.object({
    doctor_name: Yup.string().required('Name is required'),
    doctor_email: Yup.string().required('Email is required'),
    doctor_address: Yup.string().required('Address is required'),
    doctor_phone: Yup.string().required('Phone is required'),
    doctor_password: Yup.string().required('Password is required'),
    doctor_description: Yup.string().required('Description is required'),
    doctor_specialization: Yup.string().required('Specialization is required'),
    doctor_experience: Yup.string().required('Experience is required'),
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
          <Form className="w-full space-y-5 p-4">
            <h1 className="w-full text-xl tracking-widest">Doctor Register</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full space-y-3">
                <Field className="w-full p-3 rounded bg-[#EAEFF9] shadow outline-blue-600" type="text" name="doctor_name" placeholder="Enter Doctor Name" />
                <ErrorMessage component="div" name="doctor_name" className="text-red-500" />
              </div>

              <div className="w-full space-y-3">
                <Field className="w-full p-3 bg-[#EAEFF9]  rounded shadow outline-blue-600" type="text" name="doctor_email" placeholder="Enter Doctor Email" />
                <ErrorMessage component="div" name="doctor_email" className="text-red-500" />
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full space-y-3">
                <Field className="w-full p-3 rounded bg-[#EAEFF9] shadow outline-blue-600" type="text" name="doctor_phone" placeholder="Enter Doctor Phone" />
                <ErrorMessage component="div" name="doctor_phone" className="text-red-500" />
              </div>

              <div className="w-full space-y-3">
                <Field className="w-full p-3 bg-[#EAEFF9]  rounded shadow outline-blue-600" type="text" name="doctor_address" placeholder="Enter Doctor Address" />
                <ErrorMessage component="div" name="doctor_address" className="text-red-500" />
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full space-y-3 relative">
                <Field className="w-full p-3 bg-[#EAEFF9]  rounded shadow outline-blue-600" type={showPassword} name="doctor_password" />
                {
                  showPassword == 'password' ? <BiHide className=" absolute right-3 top-0" size={25} onClick={() => setShowPassword('text')} />
                    : <BiShow size={25} className=" absolute right-3 top-0" onClick={() => setShowPassword('password')} />
                }
                <ErrorMessage component="div" name="doctor_password" className="text-red-500" />
              </div>

              <div className="w-full space-y-3">
                <Field className="w-full p-3 bg-[#EAEFF9]  rounded shadow outline-blue-600" as="select" name="hospital_id">
                  <option value="">---select hospital--</option>
                </Field>
                <ErrorMessage component="div" name="hospital_id" className="text-red-500" />
              </div>
            </div>
            <div className="w-full">
              <Field className="w-full p-3 rounded bg-[#EAEFF9] shadow outline-blue-600" as="textarea" name="doctor_description" rows="4" placeholder="Enter Doctor Description" />
              <ErrorMessage component="div" name="doctor_description" className="text-red-500" />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full space-y-3">
                <Field className="w-full p-3 rounded bg-[#EAEFF9] shadow outline-blue-600" as="select" name="doctor_experience" placeholder="Enter Doctor Experience">
                  <option value="">--select experience --</option>
                  <option value="3-5 yr">3-5 yr</option>
                  <option value="5-7 yr">5-7 yr</option>
                  <option value="7-9 yr">7-9 yr</option>
                  <option value="10 yr above ">10 yr above</option>
                </Field>
                <ErrorMessage component="div" name="doctor_experience" className="text-red-500" />
              </div>

              <div className="w-full space-y-3">
                <Field className="w-full p-3 bg-[#EAEFF9]  rounded shadow outline-blue-600" as="select" name="doctor_specialization" placeholder="Enter Doctor Specialization">
                  <option value="">--select specialization--</option>
                  <option value="General Practitioner">General Practitioner</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Psychiatrist">Psychiatrist</option>
                  <option value="Ophthalmologist">Ophthalmologist</option>
                  <option value="ENT Specialist">ENT Specialist</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Urologist">Urologist</option>
                  <option value="Oncologist">Oncologist</option>
                </Field>
                <ErrorMessage component="div" name="doctor_specialization" className="text-red-500" />
              </div>
            </div>
            <button className="w-full p-2 rounded bg-blue-600 text-white" type="submit">Upload Image</button>
            <p> Already have account ! <Link className="text-blue-600" to="/doctor-login">Doctor Login</Link></p>
            <button className="w-full p-3 rounded bg-blue-600 text-white" type="submit">Login</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default DoctorRegister