import { ErrorMessage, Field, Formik, Form } from "formik"
import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import * as Yup from 'yup'
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useGetHospitalsQuery } from "../redux/slices/HospitalSlices"
import { useRegisterDoctorMutation, useUpdateDoctorMutation } from "../redux/slices/DoctorSlices"
import toast from "react-hot-toast"
import { MdArrowBack } from "react-icons/md";
const AddDoctor = () => {
  const doctorsData = useLocation().state;
  console.log('doctor data',doctorsData);
  const [registerDoctor] = useRegisterDoctorMutation();
  const [updateDoctor] = useUpdateDoctorMutation();
  const { data: hospitals = [] } = useGetHospitalsQuery();
  console.log('hospitals', hospitals);
  const getHospitalNames = hospitals?.data || [];
  console.log(getHospitalNames);
  const initialValues = {
    fname: doctorsData?.fname || '',
    lname: doctorsData?.lname || '',
    email: doctorsData?.email || '',
    phone: doctorsData?.phone || '',
    address: doctorsData?.address || '',
    experience: doctorsData?.experience || '',
    gender: doctorsData?.gender || '',
    password: '',
    description: doctorsData?.description || '',
    hos_name: '',
    status: doctorsData?.status || '',
  }
  const validationSchema = Yup.object({
    fname: Yup.string().required('first name field is required'),
    lname: Yup.string().required('last name field is required'),
    email: Yup.string().email('invalid email').required('email field is required'),
    phone: Yup.number().required('phone field is required'),
    address: Yup.string().required('address field is required'),
    experience: Yup.string().required('experience field is required'),
    gender: Yup.string().required('gender field is required'),
    password: !doctorsData?.id && Yup.string().required('password field is required'),
    description: Yup.string().required('description field is required'),
    hos_name: Yup.string().required('hos_name field is required'),
  })

  const [images, setImages] = useState(null);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  console.log('my images', images);
  const setupCloudinaryWidget = () => {
    if (window.cloudinary) {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: import.meta.env.VITE_APP_CLOUD_NAME,
          uploadPreset: import.meta.env.VITE_APP_UPLOAD_PRESET,
          maxFiles: 1,
        },
        (err, result) => {
          if (err) {
            console.error(err);
          } else if (result.event === "success") {
            // setImages((prevImages) => [...prevImages, result.info.secure_url]);
            setImages(result.info.secure_url);
          }
        }
      );
    }
  };

  useEffect(() => {
    setupCloudinaryWidget();
  }, []);


  const handleImageUpload = () => {
    widgetRef.current?.open();
  };

  const handleSubmit = async (values) => {
    const image = images;
    const { fname, lname, email, gender, experience, password, address, phone, description, hos_name, status } = values;
    if (!doctorsData?.id) {
      await registerDoctor({
        fname: fname, lname: lname, email: email, gender: gender, experience: experience, password: password, address: address, phone: phone,
        description: description, hos_id: hos_name, status: status, image: image || doctorsData?.image
      }).then((res) => {
        const status = res?.data?.status;
        const message = res?.data?.data;
        if (status) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      }).catch((err) => {
        console.log(err?.message);
      });
    } else {
      await updateDoctor({
        id: doctorsData?.id,
        updateDoctor: {
          fname: fname, lname: lname, email: email, gender: gender, experience: experience, password: password, address: address, phone: phone,
          description: description, hos_id: hos_name, image: image || doctorsData?.image, status: status
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
  }
  return (
    <div className="w-full lg:w-[95%] p-2 mt-10 mx-auto shadow rounded bg-white">
      <div className="w-full flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center gap-5">
        <div className="flex flex-row justify-start items-center gap-3 text-xs font-light lg:text-base">
          <Link to='/'> <span className="text-blue-600">Home</span> / </Link>
          <Link className="hover:text-blue-600" to='/dashboard'> Dashboard </Link>
          <span> / Add Doctors </span>
        </div>
        <Link className="px-3 py-2 rounded shadow bg-blue-600 text-white" to='/dashboard/doctors'><MdArrowBack className="inline" size={20} /> <span> Back </span></Link>
      </div>
      <div className="w-full md:w-[30%] mx-auto p-3 rounded">
        <button onClick={handleImageUpload}>
          <IoCloudUploadOutline size={100} />
        </button>
        <p className="w-full text-center text-2xl"> Upload Image</p>
      </div>
      <Formik enableReinitialize onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema} >
        <Form className="w-full space-y-3 p-3 mt-5 bg-[#FFFFFF]">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="w-full space-y-3">
              <p htmlFor="" className="text-base font-medium ml-1">First Name</p>
              <Field type="text" className="w-full px-3 py-2 rounded border outline-blue-600" name='fname' placeholder="Enter First Name" />
              <ErrorMessage name="fname" component="div" className="text-red-500" />
            </div>
            <div className="w-full space-y-3">
              <label htmlFor="" className="text-base font-medium ml-1">Last Name</label>
              <Field type="text" className="w-full px-3 py-2 rounded border outline-blue-600" name='lname' placeholder="Enter Last Name" />
              <ErrorMessage name="lname" component="div" className="text-red-500" />
            </div>
            <div className="w-full space-y-3">
              <label htmlFor="" className="text-base font-medium ml-1">Phone</label>
              <Field type="email" className="w-full px-3 py-2 rounded border outline-blue-600" name='email' placeholder="Enter Email" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="w-full space-y-3">
              <label htmlFor="" className="text-base font-medium ml-1">Phone</label>
              <Field type="number" className="w-full px-3 py-2 rounded border outline-blue-600" name='phone' placeholder="Enter Phone" />
              <ErrorMessage name="phone" component="div" className="text-red-500" />
            </div>
            <div className="w-full space-y-3">
              <label htmlFor="" className="text-base font-medium ml-1">Gender</label>
              <Field as="select" className="w-full px-3 py-2 rounded border outline-blue-600" name='gender'>
                <option value="">---select gender---</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="text-red-500" />
            </div>
            <div className="w-full space-y-3">
              <label htmlFor="" className="text-base font-medium ml-1">Experience</label>
              <Field as="select" className="w-full px-3 py-2 rounded border outline-blue-600" name='experience'>
                <option value="">---select experience---</option>
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="4 years">4 years</option>
                <option value="5 years">5 years</option>
                <option value="6 years">6 years</option>
                <option value="7 years">7 years</option>
                <option value="8 years">8 years</option>
                <option value="9 years">9 years</option>
                <option value="10 years + ">10 years + </option>
              </Field>
              <ErrorMessage name="experience" component="div" className="text-red-500" />
            </div>
          </div>
          <div className={`w-full grid grid-cols-1 gap-3 ${!doctorsData?.id ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
            <div className="w-full space-y-3">
              <label htmlFor="" className="text-base font-medium ml-1">Address</label>
              <Field type="text" className="w-full px-3 py-2 rounded border outline-blue-600" name='address' placeholder="Enter Address" />
              <ErrorMessage name="address" component="div" className="text-red-500" />
            </div>
            {
              !doctorsData?.id && <div className="w-full space-y-3">
                <label htmlFor="" className="text-base font-medium ml-1">Password</label>
                <Field type="password" className="w-full px-3 py-2 rounded border outline-blue-600" name='password' placeholder="Enter Password" />
                <ErrorMessage name='password' component="div" className="text-red-500" />
              </div>
            }

          </div>

          <div className="w-full space-y-3">
            <label htmlFor="" className="text-base font-medium ml-1">Description</label>
            <Field as="textarea" rows="4" className="w-full px-3 py-2 rounded border outline-blue-600" name='description' placeholder="Enter Description" />
            <ErrorMessage name="description" component="div" className="text-red-500" />
          </div>
          <div className="w-full space-y-3">
            <label htmlFor="" className="text-base font-medium ml-1">Hospital Name</label>
            <Field as="select" className="w-full px-3 py-2 rounded border outline-blue-600" name='hos_name'>
              <option value="">-select hospital name--</option>
              {
                getHospitalNames?.map(hospitals => {
                  return (
                    <option value={hospitals?.id} key={hospitals?.id}>{hospitals?.name}</option>
                  )
                })
              }
            </Field>
            <ErrorMessage name="hos_name" component="div" className="text-red-500" />
          </div>
          <div className="w-full space-y-3">
            <label htmlFor="" className="text-base font-medium ml-1">Status</label>
            <Field as="select" className="w-full px-3 py-2 rounded border outline-blue-600" name='status'>
              <option value="">-select Status--</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </Field>
            <ErrorMessage name="status" component="div" className="text-red-500" />
          </div>
          <button className="w-full md:w-fit px-3 py-2 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600
                    transition-all ease-in-out" type="submit">{!doctorsData?.id ? 'Register Now ' : 'Update Now'}</button>
        </Form>
      </Formik>
    </div>
  )
}

export default AddDoctor