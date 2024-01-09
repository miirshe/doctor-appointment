import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { MdAddCircle, MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDeleteAppointmentMutation, useGetAppointmentsQuery } from "../redux/slices/AppointmentSlices";
import { useEffect, useState } from "react";
import { useGetCurrentDoctorQuery } from "../redux/slices/DoctorSlices";
import Cookies from "js-cookie";

function Appointments() {
    const { data: doctor = {} } = useGetCurrentDoctorQuery();
    const doctorData = doctor?.doctor || [];
    const doctorToken = Cookies.get('doctorToken');
    const [doctorAuth, setDoctorAuth] = useState(false);
    const userToken = Cookies.get('userToken');
    const [userAuth, setUserAuth] = useState(false);
    useEffect(() => {
        if (userToken) {
            setUserAuth(true);
        } else {
            setUserAuth(false);
        }

    }, [])

    useEffect(() => {
        if (doctorToken) {
            setDoctorAuth(true);
        } else {
            setDoctorAuth(false);
        }
    }, [])
    const [searchText, setSearchText] = useState('');
    const { data } = useGetAppointmentsQuery();
    const appointments = data?.data || [];

    const filteringData = appointments?.filter(res => {
        return res.doc_id == doctorData?.id;
    })

    const adminExists = appointments?.filter(res => {
        return res?.doc_id.toLowerCase().includes(searchText.toLowerCase());
    })
    const [deleteAppointment] = useDeleteAppointmentMutation();
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete')) {
            await deleteAppointment(id).then((res) => {
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
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'day', headerName: 'Day', width: 150 },
        { field: 'time', headerName: 'Time', width: 150 },
        { field: 'doc_id', headerName: 'DOC_ID', width: 150 },
        { field: 'pat_id', headerName: 'PAT_ID', width: 150 },
        {
            field: 'status', headerName: 'Status', width: 150,
            renderCell: (params) => (
                <span className={`${params.value == 'pending' ? 'p-2 text-white bg-red-600' : 'p-2 text-white bg-green-600'}`}>{params.value}</span>
    )
        },
        { field: 'symptom_desc', headerName: 'symptom_desc', width: 150 },
        { field: 'created_at', headerName: 'createdAt', width: 150 },
        {
            field: 'action', headerName: 'Actions', width: 150,
            renderCell: (params) => (
                <>
                    <Link to={`/dashboard/add-appointment/${params.row.id}`} state={params.row}>
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
    return (
        <div className="w-full lg:w-[95%] p-3 bg-white mt-10 mx-auto shadow rounded">
            <div className="w-full flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center gap-5">
                <div className="flex flex-row justify-start items-center gap-3 text-xs font-light lg:text-base">
                    <Link to='/'> <span className="text-blue-600">Home</span> / </Link>
                    <Link className="hover:text-blue-600" to='/dashboard'> Dashboard </Link>
                    <span> / Appoinments </span>
                </div>
            </div>

            <div className="w-full md:w-[50%] mt-4">
                <input type="text" className="w-full px-3 py-2 rounded border outline-blue-600" placeholder="search doctor name ..."
                    onChange={(e) => setSearchText(e.target.value)} />
            </div>
            {
                doctorAuth && (
                    <>
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

                    </>
                )
            }

            {
                userAuth && (

                    <>
                        <div style={{ height: 400, width: '100%' }} className="mt-10">
                            <DataGrid
                                rows={adminExists}
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

                    </>

                )
            }
        </div>
    )
}

export default Appointments