import { Modal } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useState } from "react"
import toast from "react-hot-toast"
import { MdAddCircle, MdDelete, MdEdit } from "react-icons/md"
import { Link, useLocation, useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import { useCreateDiagnosesMutation, useDeleteDiagnosesMutation, useGetDiagnosesQuery, useUpdateDiagnosesMutation } from "../redux/slices/DiagnosesSlices"
const Diagnoses = () => {
    const params_row = useLocation().state;
    const { data } = useGetDiagnosesQuery();
    const [createDiagnoses] = useCreateDiagnosesMutation();
    const [updateDiagnoses] = useUpdateDiagnosesMutation();
    const [deleteDiagnoses] = useDeleteDiagnosesMutation();
    const [searchText, setSearchText] = useState('');
    const diagnoses = data?.data || [];
    const filteringData = diagnoses?.filter(res => {
        return res.name.toLowerCase().includes(searchText.toLowerCase());
    })
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();
    const initialValues = {
        name: params_row?.name || '',
        description: params_row?.description || ''
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('name is required'),
        description: Yup.string().required('description is required')
    })
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete')) {
            await deleteDiagnoses(id).then((res) => {
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
    const handleSubmit = async (values) => {
        const { name, description } = values
        if (!params_row?.id) {
            await createDiagnoses({
                name: name,
                description: description
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
            await updateDiagnoses({
                id: params_row?.id,
                updateDiagnoses: {
                    name: name,
                    description: description
                }
            }).then((res) => {
                const status = res?.data?.status;
                const message = res?.data?.data;
                if (status) {
                    toast.success(message);
                    navigate('/dashboard/diagnoses')
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
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 150, },
        { field: 'created_at', headerName: 'createdAt', width: 150 },
        {
            field: 'action', headerName: 'Actions', width: 150,
            renderCell: (params) => (
                <>
                    <Link to={`/dashboard/diagnoses/${params.row.id}`} state={params.row} onClick={handleOpen}>
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
                        <label htmlFor="" className="text-base font-medium ml-1">Add Diagnoses</label>
                        <hr className='w-full mt-3' />
                        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            <Form className='w-full space-y-2 p-4'>
                                <div className='w-full space-y-2'>
                                    <label htmlFor="" className="text-base font-medium ml-1">Diagnoses Name</label>
                                    <Field className="p-3 rounded border w-full outline-blue-600" type="text" placeholder='Diagnoses Name' name="name" />
                                    <ErrorMessage name='name' className='text-red-600' component="div" />
                                </div>
                                <div className='w-full space-y-2'>
                                    <label htmlFor="" className="text-base font-medium ml-1">Diagnoses Description</label>
                                    <Field className="p-3 rounded border w-full outline-blue-600" as="textarea" rows="4" placeholder='Diagnoses Description' name="description" />
                                    <ErrorMessage name='description' className='text-red-600' component="div" />
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
        <div className="w-full lg:w-[95%] p-3 mt-10 mx-auto bg-white shadow rounded">
            <div className="w-full flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center gap-5">
                <div className="flex flex-row justify-start items-center gap-3 text-xs font-light lg:text-base">
                    <Link to='/'> <span className="text-blue-600">Home</span> / </Link>
                    <Link className="hover:text-blue-600" to='/dashboard'> Dashboard </Link>
                    <span> / Diagnoses </span>
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

export default Diagnoses