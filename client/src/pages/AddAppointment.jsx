import { ErrorMessage, Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import * as Yup from 'yup'
const AddAppointment = () => {
    const initialValues = {
        appointment_date : '',
        appointment_time : '',
        diagnoses_id : '',
        diagnoses_name : '',
        doctor_id : '',
        doctor_name : '',
        patient_id : '',
        patient_name : '',
        appointment_status : ''

    }
    const validationSchema = Yup.object({
        appointment_date : Yup.date().required('Appointment Date is required'),
        appointment_time : Yup.date().required('Appointment Time is required'),
        diagnoses_name : Yup.string().required('Diagnoses Name is required'),
        doctor_name : Yup.string().required('Doctor Name is required'),
        patient_name : Yup.string().required('Patient Name is required'),
        appointment_status : Yup.string().required('Appointment Status is required')
    })
    const handleSubmit = (values) => {
        console.log(values);
    }
    return (
        <div className="w-full p-5 space-y-5">
            <h1 className=" space-x-5 p-2 text-lg">
                <Link className=" cursor-pointer" to='/dashboard'>Dashboard</Link>
                <span> / </span>
                <span> Appointment </span>
                <span> / </span>
                <span className="text-blue-600"> Add Appointment </span>
            </h1>

            <div className="w-full p-5 shadow bg-white">
                <Formik onSubmit={handleSubmit}
                validationSchema={validationSchema}
                initialValues={initialValues}>
                    <Form className="w-full space-y-3">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="w-full space-y-2">
                                <label htmlFor="">Appointment Date</label>
                                <Field
                                    type="date" name="appointment_date" className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                                <ErrorMessage component='div' name="appointment_date" className="text-red-500" />
                            </div>
                            <div className="w-full space-y-2">
                                <label htmlFor="">Appointment Time</label>
                                <Field type="date" name="appointment_time" className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                                <ErrorMessage component='div' name="appointment_time" className="text-red-500" />
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="w-full space-y-2">
                                <Field type="text" className="hidden" name="diagnoses_id" />
                                <Field
                                    as="select" name="diagnoses_name" className="w-full p-3 rounded bg-slate-100 outline-blue-600">
                                        <option value="">--select diagnoses name --</option>
                                    </Field>
                                <ErrorMessage component='div' name="diagnoses_name" className="text-red-500" />
                            </div>
                            <div className="w-full space-y-2">
                                <Field type="text" className="hidden" name="doctor_id" />
                                <Field
                                    as="select" name="doctor_name" className="w-full p-3 rounded bg-slate-100 outline-blue-600">
                                        <option value="">--select doctor name --</option>
                                    </Field>
                                <ErrorMessage component='div' name="doctor_name" className="text-red-500" />
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="w-full space-y-2">
                                <Field type="text" className="hidden" name="patient_id" />
                                <Field
                                    as="select" name="patient_name" className="w-full p-3 rounded bg-slate-100 outline-blue-600"
                                    placeholder="Enter Patient Name">
                                        <option value="">--select patient name --</option>
                                    </Field>
                                <ErrorMessage component='div' name="patient_name" className="text-red-500" />
                            </div>
                            <div className="w-full space-y-2">
                                <Field type="text" className="hidden" name="doctor_id" />
                                <Field as="select" name="appointment_status" className="w-full p-3 rounded bg-slate-100 outline-blue-600">
                                    <option value="">--select status ---</option>
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="cancelled">Cancelled</option>
                                </Field>
                                <ErrorMessage component='div' name="appointment_status" className="text-red-500" />
                            </div>
                        </div>

                        <div className="w-full space-y-2">
                            <Field as="textarea" className="w-full rounded outline-blue-600 shadow p-3" rows="4" name="symptom_description" placeholder="Enter symptom description"/>
                            <ErrorMessage name="symptom_description" className="text-red-500"/>
                        </div>
                        <button className="w-full md:w-[30%] p-3 rounded shadow bg-blue-600 text-white" type="submit">submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default AddAppointment