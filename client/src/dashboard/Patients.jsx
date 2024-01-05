import { DataGrid } from "@mui/x-data-grid"
import toast from "react-hot-toast"
import { MdAddCircle, MdDelete, MdEdit } from "react-icons/md"
import { Link } from "react-router-dom"
import { useDeletePatientMutation, useGetPatientsQuery } from "../redux/slices/PatientSlices"
import { useState } from "react"

const Patients = () => {
    const [searchText, setSearchText] = useState('');
    const { data } = useGetPatientsQuery();
    const patients = data?.data || [];
    const filteringData = patients?.filter(res => {
        return res.name.toLowerCase().includes(searchText.toLowerCase());
    })
    const [deletePatient] = useDeletePatientMutation();
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete')) {
            await deletePatient(id).then((res) => {
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
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'phone', headerName: 'Phone', width: 100 },
        { field: 'address', headerName: 'Address', width: 130 },
        {
            field: 'image', headerName: 'image', width: 130,
            renderCell: (params) => (
                <img className="w-10 h-10 object-center bg-cover rounded-full" src={params.value} alt="" />
            )
        },
        { field: 'created_at', headerName: 'createdAt', width: 100 },
        {
            field: 'action', headerName: 'Actions', width: 150,
            renderCell: (params) => (
                <>
                    <Link to={`/dashboard/add-patient/${params.row.id}`} state={params.row}>
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
        <div className="w-full lg:w-[95%] mt-10 mx-auto p-3 bg-white shadow rounded">
            <div className="w-full flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center gap-5">
                <div className="flex flex-row justify-start items-center gap-3 text-xs font-light lg:text-base">
                    <Link to='/'> <span className="text-blue-600">Home</span> / </Link>
                    <Link className="hover:text-blue-600" to='/dashboard'> Dashboard </Link>
                    <span> / Patients </span>
                </div>
                <Link className="px-3 py-2 rounded shadow bg-blue-600 text-white" to='/dashboard/add-patient'><MdAddCircle className="inline" size={20} /> <span> Add </span></Link>
            </div>

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

export default Patients