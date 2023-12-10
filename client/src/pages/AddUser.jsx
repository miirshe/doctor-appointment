import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { MdArrowBack } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRegisterUserMutation, useUpdateUserMutation } from '../redux/slices/UserSlices';
const AddUser = () => {
    const userStateData = useLocation().state;
    const [registerUser] = useRegisterUserMutation();
    const [updateUser] = useUpdateUserMutation();
    console.log('userStateData', userStateData);
    const [showPassword, setShowPassword] = useState('password');
    const initialValues = {
        name: userStateData?.name || '',
        email: userStateData?.email || '',
        password: userStateData?.password || '',
        role: userStateData?.role || ''
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('name is required'),
        email: Yup.string().required('email is required'),
        password: Yup.string().required('password is required'),
        role: Yup.string().required('role is required')

    });
    const handleSubmit = async (values) => {

        try {
            const id = userStateData?.id;
            if (!id) {
                registerUser(values)
                    .then(res => {
                        const status = res.data.status
                        if (status) {
                            toast.success(res.data.data)
                        }
                    }).catch(err => {
                        console.log(err);
                    })
            } else {
                const {name , email , role} = values
                updateUser({ id: id, updateUser: {
                    name: name,
                    email: email,
                    role: role
                } })
                    .then(res => {
                        const status = res.data.status
                        if (status) {
                            toast.success(res.data.data)
                        }
                    }).catch(err => {
                        console.log(err);
                    })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='w-full p-5 space-y-5 mt-7'>
            <div className='bg-white'>
                <div className='w-full'>
                    <Formik enableReinitialize onSubmit={handleSubmit} validationSchema={validationSchema}
                        initialValues={initialValues}>
                        <Form className='w-full p-4 space-y-7'>
                            <Link className='bg-blue-600 px-3 py-2 rounded text-white' to='/user-list'> <MdArrowBack className='inline' size={25} /> <span>Back</span> </Link>
                            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div className='w-full space-y-2'>
                                    <label htmlFor="">Name : </label>
                                    <Field className="w-full p-3 bg-[#EAEFF9] rounded outline-blue-600" type="text" name="name" placeholder="Enter Name" />
                                    <ErrorMessage name='name' />
                                </div>
                                <div className='w-full space-y-2'>
                                    <label htmlFor="">Email : </label>
                                    <Field className="w-full p-3 rounded bg-[#EAEFF9]  outline-blue-600" type="text" name="email" placeholder="Enter Email" />
                                    <ErrorMessage name='email' />
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
                                {
                                    !userStateData?.id && <div className="w-full space-y-2 relative">
                                    <label htmlFor="">Password : </label>
                                    <Field className="w-full p-3 bg-[#EAEFF9]  rounded shadow outline-blue-600" type={showPassword} name="password" />
                                    {
                                        showPassword == 'password' ? <BiHide className=" absolute right-3 top-10 cursor-pointer" size={25} onClick={() => setShowPassword('text')} />
                                            : <BiShow size={25} className=" absolute right-3 top-10 cursor-pointer" onClick={() => setShowPassword('password')} />
                                    }
                                    <ErrorMessage component="div" name="password" className="text-red-500" />
                                </div> 
                                }
                                <div className='w-full space-y-2'>
                                    <label htmlFor="">Role : </label>
                                    <Field className="w-full p-3 rounded bg-[#EAEFF9]  outline-blue-600" as="select" name='role'>
                                        <option value="">--select role--</option>
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                        <option value="doctor">doctor</option>
                                    </Field>
                                    <ErrorMessage name='role' />
                                </div>
                            </div>
                            <button className='w-full md:w-[30%] px-3 py-2 rounded bg-blue-600 text-white' type='submit'>submit</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default AddUser