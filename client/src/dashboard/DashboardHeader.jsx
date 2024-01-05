import { CiSettings } from "react-icons/ci";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { useGetCurrentPatientQuery } from "../redux/slices/PatientSlices";
import Cookies, { } from 'js-cookie';
import toast from "react-hot-toast";

const DashboardHeader = ({ showMenu, setShowMenu }) => {
  const {data : patient = []} = useGetCurrentPatientQuery();
  const patientData = patient?.user || [];
  const handleLogout = () => {
    Cookies.remove('patientToken');
    setTimeout(() => {
      toast.success('successfully logout');
    window.location.replace('/');
    },1500)
  }
  return (
    <div className="p-3 bg-white shadow">
      <div className="flex flex-row justify-start md:justify-end items-center gap-2 md:gap-4">
        {
          showMenu ?
            <MdOutlineMenu className="block lg:hidden" onClick={() => setShowMenu(!showMenu)} size={30} />
            : <MdClose className="block lg:hidden" size={30} onClick={() => setShowMenu(!showMenu)} />
        }
        <CiSettings className="cursor-pointer" size={30} />
        <div className="flex flex-row justify-start items-center gap-3 md:mr-8">
          <img className="w-8 h-8 rounded-full cursor-pointer" onClick={() => handleLogout()} src={patientData?.image} alt="" />
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-sm font-light md:font-medium">{patientData?.name}</h1>
            <h5 className="font-extralight text-xs">Doctor</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader