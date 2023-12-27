import toast from "react-hot-toast";
import { Link } from "react-router-dom"
import { MdAddCircle, MdDelete, MdEdit } from "react-icons/md"
import { DataGrid } from '@mui/x-data-grid';
import { useDeleteDoctorMutation, useGetDoctorsQuery } from "../redux/slices/DoctorSlices";
import { useState } from "react";
const Doctors = () => {
  const [deleteDoctor] = useDeleteDoctorMutation();
  const [searchText, setSearchText] = useState('');
  const { data } = useGetDoctorsQuery();
  const doctors = data?.data || [];
  const filteringData = doctors?.filter(res => {
    return res.fname.toLowerCase().concat(res.lname.toLowerCase()).includes(searchText.toLowerCase());
  })
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete')) {
      await deleteDoctor(id).then((res) => {
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
    { field: 'fname', headerName: 'First Name', width: 130 },
    { field: 'lname', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'gender', headerName: 'Gender', width: 130 },
    { field: 'experience', headerName: 'Experience', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 100 },
    { field: 'address', headerName: 'Address', width: 130 },
    {
      field: 'image', headerName: 'image', width: 130,
      renderCell: (params) => (
        <img className="w-10 h-10 object-center bg-cover rounded-full" src={params.value} alt="" />
      )
    },
    {
      field: 'status', headerName: 'Status', width: 130,
      renderCell: (params) => (
        <span
          className={`font-bold ${params.row.status == 'verified' ? 'bg-green-600 text-white px-3 py-1 rounded' : 'bg-red-600 text-white px-3 py-1 rounded'}`}
        >
          {params.row.status == 'verified' ? 'verified' : 'unverified'}
        </span>
      )
    },
    { field: 'hos_id', headerName: 'HOS_ID', width: 100 },
    { field: 'created_at', headerName: 'createdAt', width: 100 },
    {
      field: 'action', headerName: 'Actions', width: 150,
      renderCell: (params) => (
        <>
          <Link to={`/dashboard/add-doctor/${params.row.id}`} state={params.row}>
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
    <div className="w-full lg:w-[85%] p-3  bg-white mt-10 mx-auto">
      <div className="w-full flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center gap-5">
        <div className="flex flex-row justify-start items-center gap-3 text-xs font-light lg:text-base">
          <Link to='/'> <span className="text-blue-600">Home</span> / </Link>
          <Link className="hover:text-blue-600" to='/dashboard'> Dashboard </Link>
          <span> / Doctors </span>
        </div>
        <Link className="px-3 py-2 rounded shadow bg-blue-600 text-white" to='/dashboard/add-doctor'><MdAddCircle className="inline" size={20} /> <span> Add </span></Link>
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

export default Doctors