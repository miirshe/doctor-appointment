import { AiOutlineLogout } from "react-icons/ai";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import Cookies, { } from 'js-cookie';
import toast from "react-hot-toast";
import { useGetCurrentDoctorQuery } from "../redux/slices/DoctorSlices";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "../redux/slices/UserSlices";

const DashboardHeader = ({ showMenu, setShowMenu }) => {
  const doctorToken = Cookies.get('doctorToken');
  const userToken = Cookies.get('userToken');
  const [doctorAuth, setDoctorAuth] = useState(false);
  const [userAuth, setUserAuth] = useState(false);
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
  const { data : user = [] } = useGetUserQuery();
  const userData = user?.user || [];
  const { data: doctor = [] } = useGetCurrentDoctorQuery();
  const doctorData = doctor?.doctor;
  const handleLogout = () => {
    Cookies.remove('patientToken');
    Cookies.remove('doctorToken');
    Cookies.remove('userToken');
    setTimeout(() => {
      toast.success('successfully logout');
      window.location.replace('/');
    }, 1500)
  }
  return (
    <div className="p-3 bg-white shadow">
      <div className="flex flex-row justify-start md:justify-end items-center gap-2 md:gap-4">
        {
          showMenu ?
            <MdOutlineMenu className="block lg:hidden" onClick={() => setShowMenu(!showMenu)} size={30} />
            : <MdClose className="block lg:hidden" size={30} onClick={() => setShowMenu(!showMenu)} />
        }
        <AiOutlineLogout className="cursor-pointer" size={30} onClick={handleLogout}/>
        {
          doctorAuth && doctorData && <div className="flex flex-row justify-start items-center gap-3 md:mr-8">
            <img className="w-8 h-8 rounded-full cursor-pointer" onClick={() => handleLogout()} src={doctorData?.image} alt="" />
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-sm font-light md:font-medium">{`${doctorData?.fname} ${doctorData?.lname}`}</h1>
              <h5 className="font-extralight text-xs">Doctor</h5>
            </div>
          </div>
        }
        {
          userAuth && userData && <div className="flex flex-row justify-start items-center gap-3 md:mr-8">
            <img className="w-8 h-8 rounded-full cursor-pointer" src="/images/user.png" alt="" />
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-sm font-light md:font-medium">{userData?.name}</h1>
              <h5 className="font-extralight text-xs">User</h5>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default DashboardHeader