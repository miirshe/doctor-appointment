import { Link } from "react-router-dom"
import { HomeHeader } from "../ExportFiles"

const Doctors = () => {
  return (
    <div className="">
        <HomeHeader/>
        <div className="w-[90%] md:w-[80%] mx-auto mt-10 space-y-5">
            <div className="p-5 space-x-5">
                <Link to='/'>Home</Link>
                <span> / </span>
                <span>Doctors</span>
            </div>
            <div className="w-[60%] lg:ml-5 lg:w-[40%]">
                <input type="text" className="p-3 rounded shadow w-full bg-[#EAEFF9]" placeholder="search for doctor name..." />
            </div>
        </div>
    </div>
  )
}

export default Doctors