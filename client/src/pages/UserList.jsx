import { useMemo } from 'react'
import { MdAdd } from "react-icons/md"
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDeleteUserMutation, useGetUsersQuery } from "../redux/slices/UserSlices"
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';
const UserList = () => {
    const { data: users = [] } = useGetUsersQuery();
    const rows = users?.data || [];
    const [deleteUser] = useDeleteUserMutation();
    console.log(rows);
    const columns = useMemo(() =>
        [
            { field: 'id', headerName: 'ID', width: 100 },
            { field: 'name', headerName: 'Name', width: 200 },
            { field: 'email', headerName: 'Email', width: 200 },
            { field: 'created_at', headerName: 'Created_at', width: 200 },
            {
                field: 'action', headerName: 'Actions', width: 200,
                renderCell: (params) => {
                    const id = params.row.id;
                    const row = params.row;
                    const handleDelete = async () => {
                        const id = params.row.id;
                        await deleteUser(id)
                            .then(res => {
                                const status = res.data.status;
                                if (status) {
                                    toast.success(res.data.data)
                                } else {
                                    toast.error(res.data.data)
                                }
                            }).catch(err => {
                                console.log(err);
                            })
                    };

                    return (
                        <div>
                            <Link to={`/add-user/${id}`} state={row}>
                                <IconButton>
                                    <EditIcon className='text-blue-500' />
                                </IconButton>
                            </Link>
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon className='text-red-500' />
                            </IconButton>
                        </div>
                    )
                }
            },
        ]
        , [])
    return (
        <div className="w-full p-5">
            <div className=" space-x-5 p-2 w-full relative">
                <div className="w-full">
                    <Link className=" cursor-pointer text-blue-600" to='/dashboard'>Dashboard </Link>
                    <span>/ Users</span>
                </div>
                <Link className=" absolute right-3 bottom-3" to='/add-user'>
                    <MdAdd size={30} className="bg-blue-600 text-white rounded-full" />
                </Link>
            </div>
            <div className="w-full p-5 bg-white rounded shadow mt-5">
                <Box style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={row => row.id}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </Box>

            </div>
        </div>
    )
}

export default UserList