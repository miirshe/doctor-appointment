import { Link } from "react-router-dom"

const AddDoctor = () => {
  return (
    <div className="w-full p-5">
      <h1 className=" space-x-5 p-2 text-lg">
        <Link className=" cursor-pointer" to='/dashboard'>Dashboard</Link>
        <span> / </span>
        <span> Doctor </span>
        <span> / </span>
        <span className="text-blue-600"> Add Doctor</span>
      </h1>
    </div>
  )
}

export default AddDoctor