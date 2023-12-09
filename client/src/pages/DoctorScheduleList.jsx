import { MdAdd } from "react-icons/md"
import { Link } from "react-router-dom"

const DoctorScheduleList = () => {
    return (
        <div className="w-full p-5">
        <div className=" space-x-5 p-2 w-full relative">
            <div className="w-full">
                <Link className=" cursor-pointer text-blue-600" to='/dashboard'>Dashboard </Link>
                <span>/ Schedule </span>
            </div>
            <Link className=" absolute right-3 bottom-3" to='/add-dr-schedule'>
                <MdAdd size={30} className="bg-blue-600 text-white rounded-full" />
            </Link>
        </div>
        <div className="w-full p-5 bg-white rounded shadow mt-5">

        </div>
    </div>
    )
}

export default DoctorScheduleList