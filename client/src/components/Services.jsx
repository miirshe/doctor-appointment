import { FaRegHospital, FaUserDoctor } from "react-icons/fa6"
import { LiaUserFriendsSolid } from "react-icons/lia"
import { MdOutlineSchedule } from "react-icons/md"

const Services = () => {
    return (
        <div className="w-full mt-56 lg:mt-10 bg-blue-600 p-5">
            <h1 className="w-full text-center text-3xl tracking-widest text-white">Our Services</h1>
            <div className="w-full mt-10 md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-1">

                <div className="w-full rounded p-2 shadow bg-white space-y-3 ">
                    <FaRegHospital size={30} className="text-blue-600 text-center w-full mt-5"/>
                    <h1 className="w-full text-center text-xl tracking-tighter">Hospital Registration</h1>
                    <p className="text-center leading-7 italic">The platform allows hospitals to register and create their accounts, providing them with a dedicated space to manage their operations and connect with other healthcare stakeholders.</p>
                </div>

                <div className="w-full rounded p-4 shadow bg-white space-y-3">
                    <FaUserDoctor size={30} className="text-blue-600 text-center w-full mt-5"/>
                    <h1 className="w-full text-center text-xl tracking-tighter">Doctor Registration</h1>
                    <p className="text-center leading-7 italic">Doctors associated with registered hospitals can create their profiles on the platform, showcasing their specialties, qualifications, and availability.</p>
                </div>

                <div className="w-full rounded p-4 shadow bg-white space-y-3">
                    <LiaUserFriendsSolid size={30} className="text-blue-600 text-center w-full mt-5"/>
                    <h1 className="w-full text-center text-xl tracking-tighter">Patient Registration</h1>
                    <p className="text-center leading-7 italic">Patients can register on the platform, gaining access to a network of hospitals and doctors. They can create their profiles, search for doctors based on specific criteria, and manage their appointments.</p>
                </div>

                <div className="w-full rounded p-4 shadow bg-white space-y-3">
                    <MdOutlineSchedule size={30} className="text-blue-600 text-center w-full mt-5"/>
                    <h1 className="w-full text-center text-xl tracking-tighter">Doctor-Patient Appointment Scheduling</h1>
                    <p className="text-center leading-7 italic">he platform facilitates real-time appointment scheduling between doctors and patients. Patients can view available time slots and book appointments based on their convenience.</p>
                </div>

                <div className="w-full rounded p-4 shadow bg-white space-y-3">
                    <FaUserDoctor size={30} className="text-blue-600 text-center w-full mt-5"/>
                    <h1 className="w-full text-center text-xl tracking-tighter">Doctor Directory</h1>
                    <p className="text-center leading-7 italic">The platform maintains a comprehensive directory of doctors, allowing patients to search for healthcare professionals based on specialization, location, and other criteria.</p>
                </div>


            </div>
        </div>
    )
}

export default Services