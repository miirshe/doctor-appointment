import { FaUserDoctor } from "react-icons/fa6"
import { GrSchedules } from "react-icons/gr"
import { HiOutlineUsers } from "react-icons/hi"
import { LiaHospital } from "react-icons/lia"
import { Link } from "react-router-dom"
import { useGetHospitalsQuery } from "../redux/slices/HospitalSlices"
import { useGetPatientsQuery } from "../redux/slices/PatientSlices"
import { useGetDoctorsQuery } from "../redux/slices/DoctorSlices"

const Dashboard = () => {
    const { data : hospitals = [] } = useGetHospitalsQuery();
    const { data : patients = [] } = useGetPatientsQuery();
    const { data : doctors = [] } = useGetDoctorsQuery();
    return (
        <div className="w-full lg:w-[85%] p-2 mt-10 mx-auto">
            <div className="w-full">
                <Link to='/'> <span className="hover:text-blue-600">Home</span> / <span> Dashboard </span></Link>
                <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="shadow rounded w-full p-5">
                        <div className="flex flex-row justify-between items-start gap-3">
                            <div className="w-full space-y-2">
                                <p className="w-10 h-10 rounded-full p-2 border border-red-600 relative"><LiaHospital className="inline text-red-600 absolute top-2 left-2" size={20} /></p>
                                <p className="text-base font-medium tracking-widest">Hospitals</p>
                            </div>
                            <p className="text-base font-medium tracking-widest">{hospitals?.data?.length}</p>
                        </div>
                        <input type="range" color='red'  className="mt-3 overflow-hidden appearance-none bg-red-600 h-1 w-full focus:bg-red-600" />
                    </div>
                    <div className="shadow rounded w-full p-5">
                        <div className="flex flex-row justify-between items-start gap-3">
                            <div className="w-full space-y-2">
                                <p className="w-10 h-10 rounded-full p-2 border border-blue-600 relative"><FaUserDoctor className="inline text-blue-600 absolute top-2 left-2" size={20} /></p>
                                <p className="text-base font-medium tracking-widest">Doctors</p>
                            </div>
                            <p className="text-base font-medium tracking-widest">{doctors?.data?.length}</p>
                        </div>
                        <input type="range" color='blue'  className="mt-3 overflow-hidden appearance-none bg-blue-600 h-1 w-full focus:bg-blue-600" />
                    </div>
                    <div className="shadow rounded w-full p-5">
                        <div className="flex flex-row justify-between items-start gap-3">
                            <div className="w-full space-y-2">
                                <p className="w-10 h-10 rounded-full p-2 border border-yellow-600 relative"><HiOutlineUsers className="inline text-yellow-600 absolute top-2 left-2" size={20} /></p>
                                <p className="text-base font-medium tracking-widest">Patients</p>
                            </div>
                            <p className="text-base font-medium tracking-widest">{patients?.data?.length}</p>
                        </div>
                        <input type="range" color='yellow'  className="mt-3 overflow-hidden appearance-none bg-yellow-600 h-1 w-full focus:bg-yellow-600" />
                    </div>
                    <div className="shadow rounded w-full p-5">
                        <div className="flex flex-row justify-between items-start gap-3">
                            <div className="w-full space-y-2">
                                <p className="w-10 h-10 rounded-full p-2 border border-[#699834] relative"><GrSchedules className="inline text-[#699834] absolute top-2 left-2" size={20} /></p>
                                <p className="text-base font-medium tracking-widest">Appoinment</p>
                            </div>
                            <p className="text-base font-medium tracking-widest">300</p>
                        </div>
                        <input type="range" color='[#699834]'  className="overflow-hidden mt-3 appearance-none bg-[#699834] h-1 w-full focus:bg-[#699834]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard