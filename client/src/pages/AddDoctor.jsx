import { ErrorMessage, Field, Form, Formik } from "formik"
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom"
import * as Yup from 'yup'
const AddDoctor = () => {
  const [showPassword, setShowPassword] = useState('password');
  const initialValues = {
    doctor_name : '',
    doctor_email : '',
    doctor_phone : '',
    doctor_location : '',
    doctor_password : '',
    hospital_id : '',
    doctor_experience : '',
    doctor_specialization : '',
    doctor_description : ''
  }
  const validationSchema = Yup.object({
    doctor_name : Yup.string().required('doctor name is required'),
    doctor_email : Yup.string().required('doctor email is required'),
    doctor_phone : Yup.number().required('doctor phone is required'),
    doctor_location : Yup.number().required('doctor location is required'),
    doctor_password : Yup.string().required('doctor password is required'),
    hospital_id : Yup.number().required('hospital name is required'),
    doctor_experience : Yup.string().required('doctor experience is required'),
    doctor_specialization : Yup.string().required('doctor specialization is required'),
  })
  const handleSubmit = (values) => {
    console.log(values);
  }
  return (
    <div className="w-full p-5 space-y-5">
      <h1 className=" space-x-5 p-2 text-lg">
        <Link className=" cursor-pointer" to='/dashboard'>Dashboard</Link>
        <span> / </span>
        <span> Doctor </span>
        <span> / </span>
        <span className="text-blue-600"> Add Doctor</span>
      </h1>
      <div className="bg-white p-5 rounded shadow">
        <Formik onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}>
          <Form className="w-full space-y-5">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="w-full space-y-2">
                <Field type="text" name="doctor_name" placeholder="Enter Doctor Name"
                className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                <ErrorMessage component='div' name="doctor_name" className="text-red-500"/>
              </div>
              <div className="w-full space-y-2">
                <Field type="text" name="doctor_email" placeholder="Enter Doctor Email"
                className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                <ErrorMessage component='div' name="doctor_email" className="text-red-500"/>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="w-full space-y-2">
                <Field type="number" name="doctor_phone" placeholder="Enter Doctor Phone"
                className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                <ErrorMessage component='div' name="doctor_phone" className="text-red-500"/>
              </div>
              <div className="w-full space-y-2">
                <Field type="text" name="doctor_location" placeholder="Enter Doctor Location"
                className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                <ErrorMessage component='div' name="doctor_location" className="text-red-500"/>
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
            <div className="w-full">
              <Field className="w-full p-3 rounded bg-[#EAEFF9] shadow outline-blue-600" as="textarea" name="doctor_description" rows="4" placeholder="Enter Doctor Description" />
              <ErrorMessage component="div" name="doctor_description" className="text-red-500" />
            </div>
            <button className="w-full p-3 text-red-500 font-bold" type="button">Upload Doctor Image</button>
            <button className="w-full md:w-[30%] p-3 rounded shadow bg-blue-600 text-white" type="submit">submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default AddDoctor