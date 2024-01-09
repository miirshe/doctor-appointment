import { ErrorMessage, Field, Form, Formik } from "formik"
import { MdArrowBack } from "react-icons/md"
import { Link, useLocation } from "react-router-dom"
import * as Yup from 'yup';
import { useUpdateAppointmentMutation } from "../redux/slices/AppointmentSlices";
import toast from "react-hot-toast";
const AddAppointment = () => {
    const [updateAppointment] = useUpdateAppointmentMutation();
    const params_doctor = useLocation().state;
    const initialValues = {
        date: params_doctor?.date || '',
        day: params_doctor?.day || '',
        time: params_doctor?.time || '',
        symptom_desc: params_doctor?.symptom_desc || '',
        status: params_doctor?.status || ''
    }

    const validationSchema = Yup.object({
        date: Yup.string().required('date description is required'),
        day: Yup.string().required('date description is required'),
        time: Yup.string().required('time description is required'),
        status: Yup.string().required('status is required'),
        symptom_desc: Yup.string().required('symptom description is required'),
    })


    const handleSubmit = async (values) => {
        const { date, day, time, symptom_desc, status } = values
        await updateAppointment({
            id: params_doctor?.id,
            updateAppointment: {
                date: date, day: day, time: time, symptom_desc: symptom_desc, doc_id: params_doctor?.doc_id, pat_id: params_doctor?.pat_id,
                status: status
            }
        }).then((res) => {
            const status = res?.data?.status;
            const message = res?.data?.data;
            if (status) {
                toast.success(message)
            }
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <div className="w-full lg:w-[95%] p-2 mt-10 mx-auto shadow rounded bg-white">
            <div className="w-full flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center gap-5">
                <div className="flex flex-row justify-start items-center gap-3 text-xs font-light lg:text-base">
                    <Link to='/'> <span className="text-blue-600">Home</span> / </Link>
                    <Link className="hover:text-blue-600" to='/dashboard'> Dashboard </Link>
                    <span> / Add Appointment </span>
                </div>
                <Link className="px-3 py-2 rounded shadow bg-blue-600 text-white" to='/dashboard/appointments'><MdArrowBack className="inline" size={20} /> <span> Back </span></Link>
            </div>
            <div className="w-[95%] bg-white p-4 rounded-lg">
                <div className='w-full space-y-2 p-4'>
                    <label htmlFor="" className="text-base font-medium ml-1">Appointment Form </label>
                </div>
                <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className='w-full space-y-2 p-4'>
                        <div className="w-full">
                            <Field
                                type="text" name="date" className="w-full border outline-blue-600 px-3 py-2 shadow rounded" readOnly />
                            <ErrorMessage name="date" className="text-red-600" />
                        </div>
                        <div className="w-full">
                            <Field className="w-full border outline-blue-600 px-3 py-2 shadow rounded" name='day' type='text' readOnly />
                            <ErrorMessage name="date" className="text-red-600" />
                        </div>

                        <div className="w-full">
                            <Field className="w-full border outline-blue-600 px-3 py-2 shadow rounded" name='time' type='text' readOnly />
                            <ErrorMessage name="time" className="text-red-600" />
                        </div>
                        <div className="w-full">
                            <Field className="w-full border outline-blue-600 px-3 py-2 shadow rounded" name='status' as='select' >
                                <option value="">-select status --</option>
                                <option value="pending">pending</option>
                                <option value="completed">completed</option>
                                <option value="cancelled">cancelled</option>
                            </Field>
                            <ErrorMessage name="status" className="text-red-600" />
                        </div>

                        <div className="w-full">
                            <Field className="w-full border outline-blue-600 px-3 py-2 shadow rounded" name='symptom_desc' rows='4' as='textarea' placeholder="Enter symptom description" readOnly />
                            <ErrorMessage name="symptom_desc" component='div' className="text-red-600" />
                        </div>
                        <button className='w-full p-3 rounded shadow bg-blue-600 text-white' type='submit'>save</button>

                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default AddAppointment