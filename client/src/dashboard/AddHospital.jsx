import { Link, useLocation } from "react-router-dom"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { useCreateHospitalMutation, useUpdateHospitalMutation } from "../redux/slices/HospitalSlices"
import toast from "react-hot-toast"
import { MdArrowBack } from "react-icons/md"
const AddHospital = () => {
    const params_row = useLocation().state;
    console.log(params_row);
    const [createHospital] = useCreateHospitalMutation();
    const [updateHospital] = useUpdateHospitalMutation();
    const initialValues = {
        name: params_row?.name || '',
        email: params_row?.email || '',
        phone: params_row?.phone || '',
        location: params_row?.location || '',
        description: params_row?.description || ''
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('name is required'),
        email: Yup.string().email().required('email is required'),
        phone: Yup.number().required('phone is required'),
        location: Yup.string().required('location is required'),
        description: Yup.string().required('description is required'),
    })

    const handleSubmit = async (values, { resetForm }) => {
        const { name, email, phone, location, description } = values;
        if (!params_row?.id) {
            await createHospital({
                name: name, email: email, phone: phone, location: location, description: description
            }).then((res) => {
                const status = res.data.status;
                const message = res.data.data;
                if (status) {
                    toast.success(message);
                    resetForm();
                } else {
                    toast.error(message);
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            await updateHospital({
                id: params_row?.id,
                updateHospital: {
                    name: name, email: email, phone: phone, location: location, description: description
                }
            }).then((res) => {
                const status = res.data.status;
                const message = res.data.data;
                if (status) {
                    toast.success(message);
                    resetForm();
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
            <div className="w-full">
                <div className="w-full flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center gap-5">
                    <div className="flex flex-row justify-start items-center gap-3 text-xs font-light lg:text-base">
                        <Link to='/'> <span className="text-blue-600">Home</span> / </Link>
                        <Link className="hover:text-blue-600" to='/dashboard'> Dashboard </Link>
                        <span> / Add Hospitals </span>
                    </div>
                    <Link className="px-3 py-2 rounded shadow bg-blue-600 text-white" to='/dashboard/hospitals'><MdArrowBack className="inline" size={20} /> <span> Back </span></Link>
                </div>
                <div className="w-full p-1">
                    <Formik enableReinitialize onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
                        <Form className="w-full space-y-3 p-3 rounded shadow mt-5 bg-[#FFFFFF]">
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="w-full space-y-2">
                                    <label htmlFor="" className="text-base font-medium ml-1">Name</label>
                                    <Field className="p-3 w-full rounded  outline-blue-600 border" type="text" placeholder="Hospital Name" name="name" />
                                    <ErrorMessage name="name" component="diiv" className="text-red-600" />
                                </div>
                                <div className="w-full space-y-2">
                                    <label htmlFor="" className="text-base font-medium ml-1">Email Address</label>
                                    <Field className="p-3 w-full rounded outline-blue-600 border" type="text" placeholder="Email Address" name="email" />
                                    <ErrorMessage name="email" component="diiv" className="text-red-600" />
                                </div>
                            </div>
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="w-full space-y-2">
                                    <label htmlFor="" className="text-base font-medium ml-1">Phone</label>
                                    <Field className="p-3 w-full rounded  outline-blue-600 border" type="number" placeholder="Hospital Phone" name="phone" />
                                    <ErrorMessage name="phone" component="diiv" className="text-red-600" />
                                </div>
                                <div className="w-full space-y-2">
                                    <label htmlFor="" className="text-base font-medium ml-1">Location</label>
                                    <Field className="p-3 w-full rounded outline-blue-600 border" type="text" placeholder="Hospital Location" name="location" />
                                    <ErrorMessage name="location" component="diiv" className="text-red-600" />
                                </div>
                            </div>
                            <div className="w-full space-y-2">
                                <label htmlFor="" className="text-base font-medium ml-1">Description</label>
                                <Field className="p-3 w-full rounded  outline-blue-600 border" as="textarea" rows='4' placeholder="Hospital Description" name="description" />
                                <ErrorMessage name="description" component="diiv" className="text-red-600" />
                            </div>
                            <button className="w-full lg:w-[40%] p-3 rounded shadow bg-blue-600 text-white hover:text-blue-600 hover:bg-white transition-all ease-in-out" type="submit">Save Changes</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default AddHospital