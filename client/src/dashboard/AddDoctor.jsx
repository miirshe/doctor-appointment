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
  const [registerDoctor] = useRegisterDoctorMutation();
  const [updateDoctor] = useUpdateDoctorMutation();
  const { data: hospitals = [] } = useGetHospitalsQuery();
  console.log('hospitals', hospitals);
  const getHospitalNames = hospitals?.data || [];
  console.log(getHospitalNames);
  const initialRegister = {
    name: doctorsData?.name || '',
    email: doctorsData?.email || '',
    phone: doctorsData?.phone || '',
    address: doctorsData?.address || '',
    description: doctorsData?.description || '',
    hos_name: '',
    status : doctorsData?.status || '',
  }
  const validationSchema = Yup.object({
    name: Yup.string().required('name field is required'),
    email: Yup.string().required('email field is required'),
    phone: Yup.number().required('phone field is required'),
    address: Yup.string().required('address field is required'),
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

  const handleSubmit = (values) => {
    const image = images;
    const { name, email, password, address, phone, description, hos_name, status } = values;
    if (!doctorsData?.id) {
      registerDoctor({
        name: name, email: email, password: password, address: address, phone: phone,
        description: description, hos_id: hos_name, status: status ,image: image
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
      updateDoctor({
        id: doctorsData?.id,
        updateDoctor: {
          name: name, email: email, password: password, address: address, phone: phone,
          description: description, hos_id: hos_name, image: image,status: status
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
    <div className="w-full lg:w-[85%] p-2 mt-10 mx-auto">
      <div className="w-full flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center gap-5">
        <div className="flex flex-row justify-start items-center gap-3 text-xs font-light lg:text-base">
          <Link to='/'> <span className="text-blue-600">Home</span> / </Link>
          <Link className="hover:text-blue-600" to='/dashboard'> Dashboard </Link>
          <span> / Doctors </span>
        </div>
        <Link className="px-3 py-2 rounded shadow bg-blue-600 text-white" to='/dashboard/doctors'><MdArrowBack className="inline" size={20} /> <span> Back </span></Link>
      </div>
      <div className="w-full md:w-[30%] mx-auto p-3 rounded">
        <button onClick={handleImageUpload}>
          <IoCloudUploadOutline size={100} />
        </button>
        <p className="w-full text-center text-2xl"> Upload Image</p>
      </div>
      <Formik enableReinitialize onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialRegister}>
        <Form className="w-full space-y-3 p-3 rounded shadow mt-5 bg-[#FFFFFF]">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="w-full space-y-3">
              <label htmlFor="" className="text-base font-medium ml-1">Name</label>
              <Field type="text" className="w-full px-3 py-2 rounded border outline-blue-600" name='name' placeholder="Enter Name" />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>
            <div className="w-full space-y-3">
              <label htmlFor="" className="text-base font-medium ml-1">Email</label>
              <Field type="text" className="w-full px-3 py-2 rounded border outline-blue-600" name='email' placeholder="Enter Email" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div className="w-full space-y-3">
              <label htmlFor="" className="text-base font-medium ml-1">Phone</label>
              <Field type="number" className="w-full px-3 py-2 rounded border outline-blue-600" name='phone' placeholder="Enter Phone" />
              <ErrorMessage name="phone" component="div" className="text-red-500" />
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
            <Field as="select" rows="4" className="w-full px-3 py-2 rounded border outline-blue-600" name='hos_name'>
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
            <Field as="select" rows="4" className="w-full px-3 py-2 rounded border outline-blue-600" name='status'>
              <option value="">-select Status--</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </Field>
            <ErrorMessage name="status" component="div" className="text-red-500" />
          </div>
          <button className="w-full md:w-fit px-3 py-2 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600
                    transition-all ease-in-out" type="submit">{ !doctorsData?.id ? 'Register Now ': 'Update Now'}</button>
        </Form>
      </Formik>
    </div>
  )
}

export default AddDoctor