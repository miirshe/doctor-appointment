import { FaUserDoctor } from "react-icons/fa6"
import { HiOutlineUsers } from "react-icons/hi2"
import { MdOutlineStackedLineChart, MdSchedule } from "react-icons/md"
const Dashboard = () => {
  return (
    <div className="w-full p-5">
        <h1 className=" space-x-5 p-2 text-lg"> <span>Dashboard</span> <span> / </span> </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-start items-center gap-5 mt-5">

          <div className="w-full space-y-3 p-5 rounded shadow bg-white">
            <p className="w-full flex flex-row justify-start items-center gap-2"> <MdSchedule className="inline bg-blue-600 p-2 rounded text-white" size={30}/> <span>Appointments </span></p>
            <p className="w-full flex flex-row justify-between items-center gap-2 p-1"> <span> 7,890 </span> <MdOutlineStackedLineChart className="inline text-blue-600" size={60} /></p>
          </div>

          <div className="w-full space-y-3 p-5 rounded shadow bg-white">
            <p className="w-full flex flex-row justify-start items-center gap-2"> <FaUserDoctor className="inline bg-blue-600 p-2 rounded text-white" size={30}/> <span>Doctors</span></p>
            <p className="w-full flex flex-row justify-between items-center gap-2 p-1"> <span> 7,890 </span> <MdOutlineStackedLineChart className="inline text-blue-600" size={60} /></p>
          </div>

          <div className="w-full space-y-3 p-5 rounded shadow bg-white">
            <p className="w-full flex flex-row justify-start items-center gap-2"> <HiOutlineUsers className="inline bg-blue-600 p-2 rounded text-white" size={30}/> <span>Patients</span></p>
            <p className="w-full flex flex-row justify-between items-center gap-2 p-1"> <span> 7,890 </span> <MdOutlineStackedLineChart className="inline text-blue-600" size={60} /></p>
          </div>

          <div className="w-full space-y-3 p-5 rounded shadow bg-white">
            <p className="w-full flex flex-row justify-start items-center gap-2"> <MdSchedule className="inline bg-blue-600 p-2 rounded text-white" size={30}/> <span> Payments </span></p>
            <p className="w-full flex flex-row justify-between items-center gap-2 p-1"> <span> 7,890 </span> <MdOutlineStackedLineChart className="inline text-blue-600" size={60} /></p>
          </div>

        </div>
    </div>
  )
}

export default Dashboard