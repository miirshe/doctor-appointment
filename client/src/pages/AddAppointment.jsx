import { Link } from "react-router-dom"

const AddAppointment = () => {
    return (
        <div className="w-full ">
            <h1 className=" space-x-5 p-2 text-lg">
                <Link className=" cursor-pointer" to='/dashboard'>Dashboard</Link>
                <span> / </span>
                <span> Appointment </span>
                <span> / </span>
                <span className="text-blue-600"> Add Appointment </span>
            </h1>
        </div>
    )
}

export default AddAppointment