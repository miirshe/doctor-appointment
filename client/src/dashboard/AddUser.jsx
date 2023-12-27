import { ErrorMessage, Field, Form, Formik } from "formik"
import { MdArrowBack } from "react-icons/md"
import { Link } from "react-router-dom"
import * as Yup from 'yup'
import { useRegisterUserMutation } from "../redux/slices/UserSlices"
import toast from "react-hot-toast"
const AddUser = () => {
    const [registerUser] = useRegisterUserMutation();
    const initialValues = {
        name: '',
        email: '',
        password: '',
        role: ''
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('name is required'),
        email: Yup.string().required('email is required'),
        password: Yup.string().required('password is required'),
        role: Yup.string().required('role is required')
    })

    const handleSubmit = async (values) => {
        try {
            const { name, email, password, role } = values;
            registerUser({
                name: name, email: email,
                password: password, role: role
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

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="w-full lg:w-[85%] p-2 mt-10 mx-auto">
            <div className="w-full flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center gap-5">
                <div className="flex flex-row justify-start items-center gap-3 text-xs font-light lg:text-base">
                    <Link to='/'> <span className="text-blue-600">Home</span> / </Link>
                    <Link className="hover:text-blue-600" to='/dashboard'> Dashboard </Link>
                    <span> / Add User </span>
                </div>
                <Link className="px-3 py-2 rounded shadow bg-blue-600 text-white" to='/dashboard/users'><MdArrowBack className="inline" size={20} /> <span> Back </span></Link>
            </div>
            <Formik enableReinitialize onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
                <Form className="w-full space-y-4 p-3 rounded shadow mt-5 bg-[#FFFFFF]">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
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
                    </div>
                    <div className="w-full space-y-3">
                        <label htmlFor="" className="text-base font-medium ml-1">Password</label>
                        <Field type="password" className="w-full px-3 py-2 rounded border outline-blue-600" name='password' placeholder="*****************" />
                        <ErrorMessage name="password" component="div" className="text-red-500" />
                    </div>
                    <div className="w-full space-y-3">
                        <label htmlFor="" className="text-base font-medium ml-1">Role</label>
                        <Field as="select" className="w-full px-3 py-2 rounded border outline-blue-600" name='role'>
                            <option value="">---select role---</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </Field>
                        <ErrorMessage name="role" component="div" className="text-red-500" />
                    </div>
                    <button className="w-full md:w-fit px-3 py-2 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600
                    transition-all ease-in-out" type="submit">Save Change</button>
                </Form>
            </Formik>
        </div>
    )
}

export default AddUser