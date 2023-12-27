import { Modal } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { MdAddCircle, MdDelete, MdEdit } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { useCreateSpecialityMutation, useDeleteSpecialitiesMutation, useGetSpecialitiesQuery, useUpdateSpecialitiesMutation } from '../redux/slices/SpecialitiesSlices';
import toast from 'react-hot-toast';
import { useGetDoctorsQuery } from '../redux/slices/DoctorSlices';
const Specialities = () => {
    const { data: doctors = [] } = useGetDoctorsQuery();
    const DoctorsInfo = doctors?.data || [];
    const navigate = useNavigate();
    const params_row = useLocation().state;
    const [createSpeciality] = useCreateSpecialityMutation();
    const [deleteSpecialities] = useDeleteSpecialitiesMutation();
    const [updateSpecialities] = useUpdateSpecialitiesMutation();
    const [searchText, setSearchText] = useState('');
    const { data } = useGetSpecialitiesQuery();
    const specialities = data?.data || [];
    const filteringData = specialities?.filter(res => {
        return res.speciality.toLowerCase().includes(searchText.toLowerCase());
    })
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const initialValues = {
        speciality: params_row?.speciality || '',
        doc_name: ''
    }

    const validationSchema = Yup.object({
        speciality: Yup.string().required('specialities is required'),
        doc_name: Yup.string().required('doctor name is required'),
    })

    const [images, setImages] = useState(null);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
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
        const { speciality, doc_name } = values
        if (!params_row?.id) {
            createSpeciality({
                speciality: speciality,
                doc_id: doc_name,
                image: image || params_row?.image
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
        } else {
            updateSpecialities({
                id: params_row?.id,
                updateSpecialities: {
                    speciality: speciality,
                    doc_id: doc_name,
                    image: image || params_row?.image
                }
            }).then((res) => {
                const status = res?.data?.status;
                const message = res?.data?.data;
                if (status) {
                    toast.success(message);
                    navigate('/dashboard/specialities')
                } else {
                    toast.error(message);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }


    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete')) {
            await deleteSpecialities(id).then((res) => {
                const status = res.data.status;
                const message = res.data.data;
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
    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'speciality', headerName: 'Speciality', width: 150 },
        { field: 'doc_id', headerName: 'DOC_ID', width: 150 },
        {
            field: 'image', headerName: 'image', width: 150,
            renderCell: (params) => (
                <img className="w-10 h-10 object-center bg-cover rounded-full" src={params.value} alt="" />
            )
        },
        { field: 'created_at', headerName: 'createdAt', width: 150 },
        {
            field: 'action', headerName: 'Actions', width: 150,
            renderCell: (params) => (
                <>
                    <Link to={`/dashboard/specialities/${params.row.id}`} state={params.row} onClick={handleOpen}>
                        <MdEdit size={20} className="cursor-pointer" />
                    </Link>
                    <MdDelete
                        size={20}
                        className="cursor-pointer ml-2"
                        onClick={() => handleDelete(params.row.id)}
                    />
                </>
            ),
        },
    ];
    const ModelForm = (
        <div>
            <Modal open={open} onClose={handleClose}>
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="w-[90%] md:w-[45%] bg-white p-4 rounded-lg">
                        <label htmlFor="" className="text-base font-medium ml-1">Add Specialisties</label>
                        <hr className='w-full mt-3' />
                        <div className='w-full space-y-2 p-4'>
                            <label htmlFor="" className="text-base font-medium ml-1">Image</label>
                            <div className="p-3 cursor-pointer rounded border w-full outline-blue-600" onClick={handleImageUpload}>Upload Image</div>
                        </div>
                        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            <Form className='w-full space-y-2 p-4'>
                                <div className='w-full space-y-2'>
                                    <label htmlFor="" className="text-base font-medium ml-1">Speciality</label>
                                    <Field className="p-3 rounded border w-full outline-blue-600" as="select" placeholder='Speciality Name' name="speciality">
                                        <option value="">--select doctor specialities</option>
                                        <option value="Cardiology">Cardiology</option>
                                        <option value="Oncology">Oncology</option>
                                        <option value="Neurology">Neurology</option>
                                        <option value="Orthopedic Surgery">Orthopedic Surgery</option>
                                        <option value="Gastroenterology">Gastroenterology</option>
                                        <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
                                        <option value="Pediatrics">Pediatrics</option>
                                        <option value="Obstetrics">Obstetrics</option>
                                        <option value="Psychiatry">Psychiatry</option>
                                        <option value="Dermatology">Dermatology</option>
                                    </Field>
                                    <ErrorMessage name='speciality' className='text-red-600' component="div" />
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

                                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <button className='w-full p-3 rounded shadow border border-blue-600 text-blue-600' onClick={handleClose}>Close</button>
                                    <button className='w-full p-3 rounded shadow bg-blue-600 text-white' type='submit'>{!params_row?.id ? 'Save Change' : 'Update Change'}</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </Modal>
        </div>
    )
    return (
        <div className="w-full lg:w-[85%] p-3 mt-10 mx-auto bg-white">
            <div className="w-full flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center gap-5">
                <div className="flex flex-row justify-start items-center gap-3 text-xs font-light lg:text-base">
                    <Link to='/'> <span className="text-blue-600">Home</span> / </Link>
                    <Link className="hover:text-blue-600" to='/dashboard'> Dashboard </Link>
                    <span> / Specialities </span>
                </div>
                <button className="px-3 py-2 rounded shadow bg-blue-600 text-white" onClick={handleOpen}><MdAddCircle className="inline" size={20} /> <span> Add </span></button>
            </div>
            {
                ModelForm
            }
            <div className="w-full md:w-[50%] mt-4">
                <input type="text" className="w-full px-3 py-2 rounded border outline-blue-600" placeholder="search doctor name ..."
                    onChange={(e) => setSearchText(e.target.value)} />
            </div>
            <div style={{ height: 400, width: '100%' }} className="mt-10">
                <DataGrid
                    rows={filteringData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    getRowId={(row) => row.id}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    )
}

export default Specialities