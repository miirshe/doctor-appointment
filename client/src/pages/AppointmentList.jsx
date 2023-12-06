import { Link } from "react-router-dom"

const AppointmentList = () => {
    return (
        <div className="w-full p-5">
            <h1 className=" space-x-5 p-2 text-lg">
                <Link className=" cursor-pointer" to='/dashboard'>Dashboard</Link>
                <span> / </span>
                <span> Appointment </span>
                <span> / </span>
                <span className="text-blue-600">Appointment List</span>
            </h1>
        </div>
    )
}

export default AppointmentList