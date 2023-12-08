import { ErrorMessage, Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import * as Yup from 'yup'
const AddDoctorSchedule = () => {
    const initialValues = {
        doctor_id: '',
        doctor_name: '',
        schedule_date: '',
        from_time: '',
        to_time: '',
        range_number: ''
    }
    const validationSchema = Yup.object({
        doctor_name: Yup.string().required('doctor name is required'),
        doctor_id: Yup.number().required('doctor id is required'),
        schedule_date: Yup.date().required('schedule date is required'),
        from_time: Yup.date().required('From schedule time is required'),
        to_time: Yup.date().required('To schedule time is required'),
        range_number: Yup.number().required('Range number is required'),
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
                <span className="text-blue-600">Add Doctor Schedule</span>
            </h1>
            <div className="w-full p-5 bg-white rounded shadow">
                <Formik onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    initialValues={initialValues}>
                    <Form className="w-full space-y-3">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="w-full space-y-2">
                                <Field type='text' className="hidden" name="doctor_id" />
                                <label htmlFor="">Doctor Name</label>
                                <Field as="select" name="doctor_name" className="w-full p-3 rounded bg-slate-100 outline-blue-600">
                                    <option value="">--select doctor name --</option>
                                </Field>
                                <ErrorMessage component='div' name="doctor_name" className="text-red-500" />
                            </div>

                            <div className="w-full space-y-2">
                                <label htmlFor="">Schedule Date</label>
                                <Field type="date" name="schedule_date" className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                                <ErrorMessage component='div' name="schedule_date" className="text-red-500" />
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="w-full space-y-2">
                                <label htmlFor="">From Time</label>
                                <Field type="date" name="from_time" className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                                <ErrorMessage component='div' name="from_time" className="text-red-500" />
                            </div>
                            <div className="w-full space-y-2">
                                <label htmlFor="">To Time</label>
                                <Field type="date" name="to_time" className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                                <ErrorMessage component='div' name="to_time" className="text-red-500" />
                            </div>
                        </div>
                        <div className="w-full space-y-2">
                            <label htmlFor="">Range Number</label>
                            <Field type="number" name="rang_number" className="w-full p-3 rounded bg-slate-100 outline-blue-600" />
                            <ErrorMessage component='div' name="rang_number" className="text-red-500" />
                        </div>
                        <button className="w-full md:w-[30%] p-3 rounded shadow bg-blue-600 text-white" type="submit">submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default AddDoctorSchedule