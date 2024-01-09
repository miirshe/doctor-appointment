import { IoIosArrowForward } from "react-icons/io"
import { Link, useLocation } from "react-router-dom"
import { useGetDoctorSchedulesQuery } from "../redux/slices/DoctorScheduleSlices";
import { useGetDoctorsQuery } from "../redux/slices/DoctorSlices";
import Carousel from "react-multi-carousel";
import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import toast from "react-hot-toast";
import { useCreateAppointmentMutation } from "../redux/slices/AppointmentSlices";
import { useGetCurrentPatientQuery } from "../redux/slices/PatientSlices";
import Cookies from "js-cookie";
const DoctorDetialPage = () => {
  const [patientAuth, setPatientAuth] = useState(false);
  const patientToken = Cookies.get('patientToken');
  useEffect(() => {
    if (patientToken) {
      setPatientAuth(true);
    } else {
      setPatientAuth(false);
    }
  }, [])
  const { data: patientData } = useGetCurrentPatientQuery();
  const currentPatient = patientData?.user || [];
  const [createAppointment] = useCreateAppointmentMutation();
  const [doctorDate, setDoctorDate] = useState('');
  const params_doctor = useLocation().state;
  const { data: doctors } = useGetDoctorsQuery();
  const getDoctors = doctors?.data || [];
  const { data } = useGetDoctorSchedulesQuery();
  const doctorData = data?.data || [];
  const getDoctorSchedule = doctorData?.filter(res => {
    return res?.doc_id == params_doctor?.id
  })
  const getDoctorsSpecialities = getDoctors?.filter(res => {
    return res?.speciality == params_doctor?.speciality
  })
  const getDoctorCurrentSchedule = getDoctorSchedule?.find(res => {
    return res?.date == doctorDate
  });
  const doctor_time = `${getDoctorCurrentSchedule?.from_time} - ${getDoctorCurrentSchedule?.to_time}`
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(getDoctorCurrentSchedule?.day);
  const initialValues = {
    date: getDoctorCurrentSchedule?.date || '',
    day: getDoctorCurrentSchedule?.day || '',
    time: doctor_time || '',
    symptom_desc: ''
  }

  const validationSchema = Yup.object({
    date: Yup.string().required('date description is required'),
    day: Yup.string().required('date description is required'),
    time: Yup.string().required('time description is required'),
    symptom_desc: Yup.string().required('symptom description is required'),
  })


  const handleSubmit = (values) => {
    const doc_id = params_doctor?.id;
    const pat_id = currentPatient?.id;
    const { date, day, time, symptom_desc } = values
    createAppointment({
      date: date, day: day, time: time, symptom_desc: symptom_desc, doc_id: doc_id, pat_id: pat_id,
      status: 'pending'
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

  const ModelForm = (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="w-[90%] md:w-[45%] bg-white p-4 rounded-lg">
            <div className='w-full space-y-2 p-4'>
              <label htmlFor="" className="text-base font-medium ml-1">Appointment Form </label>
            </div>
            <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              <Form className='w-full space-y-2 p-4'>
                <div className="w-full">
                  <Field
                    as="select"
                    name="date"
                    className="w-full border outline-blue-600 px-3 py-2 shadow rounded"
                    onClick={(e) => setDoctorDate(e.target.value)}
                  >
                    <option value=" ">--- select date ---</option>
                    {getDoctorSchedule &&
                      getDoctorSchedule.map((res) => (
                        <option value={res?.date} key={res?.id}>
                          {res?.date}
                        </option>
                      ))}
                  </Field>
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
                  <Field className="w-full border outline-blue-600 px-3 py-2 shadow rounded" name='symptom_desc' rows='4' as='textarea' placeholder="Enter symptom description" />
                  <ErrorMessage name="symptom_desc" component='div' className="text-red-600" />
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
                  <button className='w-full p-3 rounded shadow border border-blue-600 text-blue-600' onClick={handleClose}>Close</button>
                  <button className='w-full p-3 rounded shadow bg-blue-600 text-white' type='submit'>save</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </Modal>
    </div>
  )

  return (
    <div className="w-full md:w-[95%] lg:w-[90%] mx-auto p-4 mt-20">
      <div className="w-full flex flex-row justify-start items-center gap-5">
        <Link className=" hover:text-blue-600 transition-all ease-in-out" to='/'>Home</Link>
        <IoIosArrowForward className="inline" size={15} />
        <span>Doctor Detail</span>
      </div>
      <div className="bg-white shadow rounded p-4 mt-10">
        <div className="w-full space-y-2">
          <div className="w-full bg-blue-600 p-14">
            <h1 className="text-3xl text-center font-medium text-white">Dr.{`${params_doctor?.fname} ${params_doctor?.lname}`}</h1>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 justify-start items-start mt-14 gap-5">
          <div className="w-full">
            <img src={params_doctor?.image} className="w-full bg-cover object-center" alt="" />
            <div className="mt-5 space-y-3">
              <h1 className="font-medium text-lg">Doctor About</h1>
              <hr className="w-full" />
              <p className="text-base font-light text-justify">{params_doctor?.description}</p>
            </div>
          </div>
          <div className="w-full space-y-3">
            <h1 className="text-lg font-medium tracking-wide">Profile details</h1>
            <div className="flex flex-row justify-between items-center font-light text-base">
              <span>Speciality</span>
              <span>{params_doctor?.speciality}</span>
            </div>
            <hr className="w-full" />
            <div className="flex flex-row justify-between items-center font-light text-base">
              <span>Address</span>
              <span>{params_doctor?.address}</span>
            </div>
            <hr className="w-full" />
            <div className="flex flex-row justify-between items-center font-light text-base">
              <span>Phone</span>
              <span>{params_doctor?.phone}</span>
            </div>
            <hr className="w-full" />
            <div className="flex flex-row justify-between items-center font-light text-base">
              <span>Email</span>
              <span>{params_doctor?.email}</span>
            </div>
            <hr className="w-full" />
            <div className="w-full space-y-3">
              <h1 className="text-lg font-medium tracking-wide">Doctor Schedule</h1>
              {
                getDoctorSchedule && getDoctorSchedule?.map(res => {
                  return (
                    <div key={res?.id} className="w-full space-y-3">
                      <div className="flex flex-row justify-between items-center font-light text-base">
                        <span>Date</span>
                        <span>{res?.date}</span>
                      </div>
                      <hr className="w-full" />
                      <div className="flex flex-row justify-between items-center font-light text-base">
                        <span>{res?.day}</span>
                        <span className="space-x-2">{`${res?.from_time} - ${res?.to_time}`}</span>
                      </div>
                      <hr className="w-full" />
                    </div>
                  )
                })
              }
            </div>
            {
              !patientAuth && <Link className="w-full mt-20 px-3 py-2 shadow rounded bg-blue-600 text-white" to='/patient-login'>Make Appointment</Link>
            }{
              patientAuth && <button className="w-full mt-20 px-3 py-2 shadow rounded bg-blue-600 text-white" onClick={handleOpen}>Make Appointment</button>
            }

          </div>
        </div>

        <div className="w-full mt-14">
          <h1 className="text-lg font-medium tracking-widest">Specialities Related</h1>
          <hr className="w-full mt-5" />
          <Carousel responsive={responsive} className="bg-white">
            {
              getDoctorsSpecialities && getDoctorsSpecialities?.map(doctor => {
                return (
                  <div className="mt-5 w-full p-2 rounded shadow cursor-pointer hover:scale-x-105 transition-all ease-in-out  hover:shadow-md" key={doctor.id}>
                    <img className="w-28 h-28 mx-auto rounded-full object-center bg-cover" src={doctor?.image} alt="" />
                    <div className="w-full space-y-3">
                      <hr className="w-full mt-2" />
                      <p className="w-full font-medium text-base text-center">Dr.{`${doctor?.fname} ${doctor?.lname}`}</p>
                      <p className="w-full font-light text-sm text-center">{doctor?.address}</p>
                      <p className="w-full font-light text-sm text-center">exp. {doctor?.experience}</p>
                      <p className="w-fit mx-auto font-light text-sm text-center bg-green-500 text-white p-2 rounded">{doctor?.speciality}</p>
                    </div>
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        {ModelForm}
      </div>
    </div>
  )
}

export default DoctorDetialPage