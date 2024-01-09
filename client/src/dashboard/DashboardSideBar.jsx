import { MdClose, MdOutlineCategory, MdOutlineMonitorHeart, MdSchedule } from "react-icons/md"
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaHospital } from "react-icons/lia";
import { Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi";
import { GrSchedules } from "react-icons/gr";
import { PiUsersFourThin } from "react-icons/pi";
import { LiaDiagnosesSolid } from "react-icons/lia";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const DashboardSideBar = ({ showMenu, setShowMenu }) => {
    const doctorToken = Cookies.get('doctorToken');
    const [doctorAuth, setDoctorAuth] = useState(false);
    const [userAuth, setUserAuth] = useState(false);
    const userToken = Cookies.get('userToken');
    useEffect(() => {
        if (doctorToken) {
            setDoctorAuth(true);
        } else {
            setDoctorAuth(false);
        }
    }, [])
    useEffect(() => {
        if (userToken) {
            setUserAuth(true);
        } else {
            setUserAuth(false);
        }
    }, [])
    return (
        <div className={`w-full lg:w-[18%] bg-blue-600 fixed left-0 top-0 bottom-0 p-4 shadow-md z-10 ${showMenu ? 'hidden lg:flex' : 'block lg:flex'}`}>
            <div className="w-full flex flex-col justify-start items-start gap-5">
                <div className="w-full flex flex-row justify-between items-center gap-3 relative">
                    <div className="w-full flex flex-row justify-start items-center gap-3 relative">
                        <MdOutlineMonitorHeart className=" text-white" size={30} />
                        <p className="w-full text-xl"> <span>Medi</span> <span className="text-white">Hub</span></p>
                    </div>
                    <MdClose className="block lg:hidden" size={30} onClick={() => setShowMenu(!showMenu)} />
                </div>

                {
                    userAuth && (
                        <>
                            <div className="mt-3">
                                <h1 className="p-2 font-light tracking-widest text-white">Main</h1>
                                <div className="w-full text-white mt-5 space-y-2 text-base font-medium">
                                    <Link className="w-full hover:text-slate-100 transition-all ease-in-out flex flex-row justify-start items-center gap-3 p-2" to='/dashboard'>
                                        <LuLayoutDashboard size={20} />
                                        <span>Overview</span>
                                    </Link>
                                    <Link className="w-full hover:text-slate-100 transition-all ease-in-out flex flex-row justify-start items-center gap-3 p-2" to='/dashboard/hospitals'>
                                        <LiaHospital size={20} />
                                        <span>Hospitals</span>
                                    </Link>
                                    <Link className="w-full hover:text-slate-100 transition-all ease-in-out flex flex-row justify-start items-center gap-3 p-2" to='/dashboard/doctors'>
                                        <FaUserDoctor size={20} />
                                        <span>Doctors</span>
                                    </Link>
                                    <Link className="w-full hover:text-slate-100 transition-all ease-in-out flex flex-row justify-start items-center gap-3 p-2" to='/dashboard/patients'>
                                        <HiOutlineUsers size={20} />
                                        <span>Patients</span>
                                    </Link>
                                    <Link className="w-full hover:text-slate-100 transition-all ease-in-out flex flex-row justify-start items-center gap-3 p-2" to='/dashboard/appointments'>
                                        <GrSchedules size={20} />
                                        <span>Appointments</span>
                                    </Link>
                                    <Link className="w-full hover:text-slate-100 transition-all ease-in-out flex flex-row justify-start items-center gap-3 p-2" to='/dashboard/diagnoses'>
                                        <LiaDiagnosesSolid size={20} />
                                        <span>Diagnoses</span>
                                    </Link>
                                    <Link className="w-full hover:text-slate-100 transition-all ease-in-out flex flex-row justify-start items-center gap-3 p-2" to='/dashboard/specialities'>
                                        <MdOutlineCategory size={20} />
                                        <span>Specialities</span>
                                    </Link>
                                    <Link className="w-full hover:text-slate-100 transition-all ease-in-out flex flex-row justify-start items-center gap-3 p-2" to='/dashboard/users'>
                                        <PiUsersFourThin size={20} />
                                        <span>Users</span>
                                    </Link>
                                    <Link className="w-full hover:text-slate-100 transition-all ease-in-out flex flex-row justify-start items-center gap-3 p-2" to='/dashboard/doctor-schedule'>
                                        <MdSchedule size={20} />
                                        <span>Doctor Schedule</span>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )
                }

                {
                    doctorAuth && (
                        <>

                            <div className="mt-3">
                                <h1 className="p-2 font-light tracking-widest text-white">Main</h1>
                                <div className="w-full text-white mt-5 space-y-2 text-base font-medium">
                                    <Link className="w-full hover:text-slate-100 transition-all ease-in-out flex flex-row justify-start items-center gap-3 p-2" to='/dashboard'>
                                        <LuLayoutDashboard size={20} />
                                        <span>Overview</span>
                                    </Link>
                                    <Link className="w-full hover:text-slate-100 transition-all ease-in-out flex flex-row justify-start items-center gap-3 p-2" to='/dashboard/appointments'>
                                        <GrSchedules size={20} />
                                        <span>Appointments</span>
                                    </Link>
                                    <Link className="w-full hover:text-slate-100 transition-all ease-in-out flex flex-row justify-start items-center gap-3 p-2" to='/dashboard/doctor-schedule'>
                                        <MdSchedule size={20} />
                                        <span>Doctor Schedule</span>
                                    </Link>
                                </div>
                            </div>

                        </>
                    )
                }
            </div>
        </div>
    )
}

export default DashboardSideBar