import { Link } from "react-router-dom"

const DoctorList = () => {
    return (
        <div className="w-full p-5 space-y-5">
            <h1 className=" space-x-5 p-2 text-lg">
                <Link className=" cursor-pointer" to='/dashboard'>Dashboard</Link>
                <span> / </span>
                <span> Doctor </span>
                <span> / </span>
                <span className="text-blue-600"> Doctor List</span>
            </h1>
            <div className="w-full bg-white p-5 rounded shadow">

            </div>
        </div>
    )
}

export default DoctorList