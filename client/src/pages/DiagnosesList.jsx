import { Link } from "react-router-dom"

const DiagnosesList = () => {
    return (
        <div className="w-full p-5">
            <h1 className=" space-x-5 p-2 text-lg">
                <Link className=" cursor-pointer" to='/dashboard'>Dashboard</Link>
                <span> / </span>
                <span>Diagnoses </span>
                <span> / </span>
                <span className="text-blue-600">Diagnoses List</span>
            </h1>
        </div>
    )
}

export default DiagnosesList