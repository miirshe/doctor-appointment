import { ErrorMessage, Field, Form, Formik } from "formik"
import { MdArrowBack } from "react-icons/md"
import { Link, useLocation } from "react-router-dom"
import { useGetDoctorsQuery } from "../redux/slices/DoctorSlices"
import * as Yup from 'yup';
import { useCreateDoctorSchedulesMutation, useUpdateDoctorSchedulesMutation } from "../redux/slices/DoctorScheduleSlices";
import toast from "react-hot-toast";
const AddDoctorSchedule = () => {
    const params_row = useLocation().state;
    const { data } = useGetDoctorsQuery();
    const [createDoctorSchedules] = useCreateDoctorSchedulesMutation();
    const [updateDoctorSchedules] = useUpdateDoctorSchedulesMutation();
    const DoctorsInfo = data?.data || [];
    const initialValues = {
        date: params_row?.date || '',
        day: params_row?.day || '',
        from_time: params_row?.from_time || '',
        to_time: params_row?.to_time || '',
        appointment_limit: params_row?.appointment_limit || '',
        status: params_row?.status || '',
        doc_name: params_row?.doc_id || ''
    }

    const validationSchema = Yup.object({
        date: Yup.date().required('date is required'),
        day: Yup.string().required('day is required'),
        from_time: Yup.string().required('from_time is required'),
        to_time: Yup.string().required('end_time is required'),
        appointment_limit: Yup.number().required('appointment_limit is required'),
        status: Yup.string().required('status is required'),
        doc_name: Yup.string().required('doc_name is required')
    })
    const handleSubmit = async (values, { resetFrom }) => {
        console.log(values);

        try {
            const { date, day, from_time, to_time, appointment_limit, status, doc_name } = values
            if (!params_row?.id) {
                await createDoctorSchedules({
                    date: date, day: day, from_time: from_time,
                    to_time: to_time, appointment_limit, status: status, doc_id: doc_name
                }).then((res) => {
                    const status = res?.data?.status;
                    const message = res?.data?.data;
                    if (status) {
                        toast.success(message);
                        resetFrom();
                    } else {
                        toast.error(message);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                await updateDoctorSchedules({
                    id: params_row?.id,
                    updateDoctorSchedules: {
                        date: date, day: day, from_time: from_time,
                        to_time: to_time, appointment_limit: appointment_limit, status: status, doc_id: doc_name
                    }
                }).then((res) => {
                    const status = res?.data?.status;
                    const message = res?.data?.data;
                    if (status) {
                        toast.success(message);
                    } else {
                        toast.error(message);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (

        <div className="w-full lg:w-[95%] p-2 mt-10 mx-auto shadow rounded bg-white">
            <div className="w-full flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center gap-5">
                <div className="flex flex-row justify-start items-center gap-3 text-xs font-light lg:text-base">
                    <Link to='/'> <span className="text-blue-600">Home</span> / </Link>
                    <Link className="hover:text-blue-600" to='/dashboard'> Dashboard </Link>
                    <span> / Add Doctor Schedule </span>
                </div>
                <Link className="px-3 py-2 rounded shadow bg-blue-600 text-white" to='/dashboard/doctor-schedule'><MdArrowBack className="inline" size={20} /> <span> Back </span></Link>
            </div>
            <Formik enableReinitialize onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
                <Form className="w-full space-y-4 p-3 mt-5 bg-[#FFFFFF]">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="w-full space-y-3">
                            <label htmlFor="" className="text-base font-medium ml-1">Date</label>
                            <Field type="date" className="w-full px-3 py-2 rounded border outline-blue-600" name='date' />
                            <ErrorMessage name="date" component="div" className="text-red-500" />
                        </div>
                        <div className="w-full space-y-3">
                            <label htmlFor="" className="text-base font-medium ml-1">Day</label>
                            <Field as="select" className="w-full px-3 py-2 rounded border outline-blue-600" name='day'>
                                <option value="">---select day---</option>
                                <option value="Sat">Saturday</option>
                                <option value="Sun">Sunday</option>
                                <option value="Mon">monday</option>
                                <option value="Tues">Tuesday</option>
                                <option value="Wed">Wednesday</option>
                            </Field>
                            <ErrorMessage name="day" component="div" className="text-red-500" />
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="w-full space-y-3">
                            <label htmlFor="" className="text-base font-medium ml-1">Start Time</label>
                            <Field type="time" className="w-full px-3 py-2 rounded border outline-blue-600" name='from_time' placeholder="Enter Start Time" />
                            <ErrorMessage name="from_time" component="div" className="text-red-500" />
                        </div>
                        <div className="w-full space-y-3">
                            <label htmlFor="" className="text-base font-medium ml-1">End Time</label>
                            <Field type="time" className="w-full px-3 py-2 rounded border outline-blue-600" name='to_time' placeholder="Enter End Time" />
                            <ErrorMessage name="to_time" component="div" className="text-red-500" />
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="w-full space-y-3">
                            <label htmlFor="" className="text-base font-medium ml-1">Appointment Limit</label>
                            <Field type="number" className="w-full px-3 py-2 rounded border outline-blue-600" name='appointment_limit' placeholder="Enter Appointment Limit Range" />
                            <ErrorMessage name="appointment_limit" component="div" className="text-red-500" />
                        </div>
                        <div className="w-full space-y-3">
                            <label htmlFor="" className="text-base font-medium ml-1">Status</label>
                            <Field as="select" className="w-full px-3 py-2 rounded border outline-blue-600" name='status'>
                                <option value="">---select doctor status---</option>
                                <option value="active">active</option>
                                <option value="unactive">unactive</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="text-red-500" />
                        </div>
                    </div>
                    <div className="w-full space-y-3">
                        <label htmlFor="" className="text-base font-medium ml-1">Status</label>
                        <Field as="select" className="w-full px-3 py-2 rounded border outline-blue-600" name='doc_name'>
                            <option value="">---select doctor name---</option>
                            {
                                DoctorsInfo?.map(doctor => {
                                    return (
                                        <option key={doctor?.id} value={doctor?.id}>{doctor?.fname + ' ' + doctor?.lname}</option>
                                    )
                                })
                            }
                        </Field>
                        <ErrorMessage name="doc_name" component="div" className="text-red-500" />
                    </div>
                    <button className="w-full mt-5 md:w-fit px-3 py-2 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600
                    transition-all ease-in-out" type="submit">Save Changes</button>
                </Form>
            </Formik>
        </div>
    )
}

export default AddDoctorSchedule