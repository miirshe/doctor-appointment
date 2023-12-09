import { FaUserDoctor } from "react-icons/fa6"
import { HiOutlineUsers } from "react-icons/hi2"
import { MdSchedule } from "react-icons/md"
import { SiCashapp } from "react-icons/si";
const Dashboard = () => {
  return (
    <div className="w-full p-5">
      <h1 className=" space-x-5 p-2 text-lg"> <span>Dashboard</span> <span> / </span> </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-start items-center gap-5 mt-5">

        <div className="w-full space-y-3 p-5 rounded shadow bg-white">
          <div className="w-full grid grid-cols-2 justify-start items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 relative border-blue-600 ">
              <FaUserDoctor className="text-blue-600 absolute top-3 left-3" size={30} />
            </div>
            <span className="w-full text-end">168</span>
          </div>
          <p>Doctor</p>
          <p className="w-[70%] bg-slate-300 rounded-md">
            <hr className="w-[60%] border-blue-600 border-4"/>
          </p>
        </div>

        <div className="w-full space-y-3 p-5 rounded shadow bg-white">
          <div className="w-full grid grid-cols-2 justify-start items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 relative border-green-700 ">
              <HiOutlineUsers className="text-green-700 absolute top-3 left-3" size={30} />
            </div>
            <span className="w-full text-end">168</span>
          </div>
          <p>Patient</p>
          <p className="w-[70%] bg-slate-300 rounded-md">
            <hr className="w-[60%] border-green-700 border-4"/>
          </p>
        </div>

        <div className="w-full space-y-3 p-5 rounded shadow bg-white">
          <div className="w-full grid grid-cols-2 justify-start items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 relative border-red-500 ">
              <MdSchedule className="text-red-500 absolute top-3 left-3" size={30} />
            </div>
            <span className="w-full text-end">168</span>
          </div>
          <p>Appointment</p>
          <p className="w-[70%] bg-slate-300 rounded-md">
            <hr className="w-[60%] border-red-500 border-4"/>
          </p>
        </div>

        <div className="w-full space-y-3 p-5 rounded shadow bg-white">
          <div className="w-full grid grid-cols-2 justify-start items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 relative border-yellow-600 ">
              <SiCashapp className="text-yellow-600 absolute top-3 left-3" size={30} />
            </div>
            <span className="w-full text-end">168</span>
          </div>
          <p>Revenue</p>
          <p className="w-[70%] bg-slate-300 rounded-md">
            <hr className="w-[60%] border-yellow-600 border-4"/>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Dashboard