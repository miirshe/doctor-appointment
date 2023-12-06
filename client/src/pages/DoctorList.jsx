import { Link } from "react-router-dom"

const DoctorList = () => {
    return (
        <div className="w-full p-5">
            <h1 className=" space-x-5 p-2 text-lg">
                <Link to='/dashboard'>Dashboard</Link>
                <span> / </span>
                <span> Doctor </span>
                <span> / </span>
                <span className="text-blue-600"> Doctor List</span>
            </h1>
        </div>
    )
}

export default DoctorList