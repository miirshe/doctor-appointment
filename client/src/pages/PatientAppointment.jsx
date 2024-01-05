import { DataGrid } from "@mui/x-data-grid"
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"
import { useGetAppointmentDetailsQuery } from "../redux/slices/AppointmentSlices";
import { useGetCurrentPatientQuery } from "../redux/slices/PatientSlices";
const PatientAppointment = () => {
    const { data: getPatient = [] } = useGetCurrentPatientQuery();
    const getCurrentPatient = getPatient?.user || [];
    const [searchText, setSearchText] = useState('');
    const { data } = useGetAppointmentDetailsQuery();
    const users = data?.data || [];
    const currentPatient = users?.filter(user => {
        return user?.patient_id == getCurrentPatient?.id;
    })
    const filteringData = currentPatient?.filter(res => {
        return res.doctor_fname.toLowerCase().includes(searchText.toLowerCase());
    })
    console.log(filteringData);
    const columns = [
        { field: 'appointment_id', headerName: 'ID', width: 100 },
        { field: 'doctor_fname', headerName: 'First Name', width: 150 },
        { field: 'doctor_lname', headerName: 'Last Name', width: 150 },
        { field: 'doctor_phone', headerName: 'Doctor Phone', width: 150 },
        {
            field: 'doctor_image', headerName: 'Doctor Image', width: 150,
            renderCell: (params) => (
                <img className="w-10 h-10 object-center bg-cover rounded-full" src={params.value} alt="" />
            )
        },
        {
            field: 'appointment_status', headerName: 'Appointment Status', width: 150,
            renderCell: (params) => (
                <span className={`${params?.value == 'completed' ? 'p-2 bg-green-600 text-white' : 'p-2 bg-red-600 text-white'}`}>{params?.value}</span>
            )
        },
        { field: 'patient_name', headerName: 'Patient Name', width: 150 },
        { field: 'date', headerName: 'date', width: 150 },
        { field: 'day', headerName: 'Day', width: 150 },
        { field: 'time', headerName: 'time', width: 150 },

    ];
    return (
        <>
            {
                filteringData.length != [] && <div className="w-full md:w-[95%] lg:w-[90%] mx-auto p-4 mt-20">
                    <div className="w-full flex flex-row justify-start items-center gap-5">
                        <Link className=" hover:text-blue-600 transition-all ease-in-out" to='/'>Home</Link>
                        <IoIosArrowForward className="inline" size={15} />
                        <span>Patient Appointments</span>
                    </div>
                    <div className="w-full md:w-[50%] mt-4">
                        <input type="text" className="w-full px-3 py-2 rounded border outline-blue-600" placeholder="search First Name ..."
                            onChange={(e) => setSearchText(e.target.value)} />
                    </div>
                    <div style={{ height: 400, width: '100%' }} className="mt-10 bg-white">
                        <DataGrid
                            rows={filteringData}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            getRowId={(row) => row.appointment_id}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    </div>
                </div>
            }

            {
                filteringData.length == [] && <div className="w-full md:w-[95%] lg:w-[90%] mx-auto p-4 mt-20">
                    <img src="../../public/images/oops.png" className="w-60 h-60 mx-auto bg-cover object-center" alt="" />
                </div>
            }

        </>
    )
}

export default PatientAppointment