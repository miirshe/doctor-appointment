import { IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"
import { useGetDoctorsQuery } from "../redux/slices/DoctorSlices"
import { MdVerified } from "react-icons/md";
import { useGetSpecialitiesQuery } from "../redux/slices/SpecialitiesSlices";
import { useState } from "react";

const DoctorsPage = () => {
    const { data: doctors = [] } = useGetDoctorsQuery();
    const { data: specialities = [] } = useGetSpecialitiesQuery();
    const [searchText, setSearchText] = useState('');
    const getDoctors = doctors?.data || [];
    const getSpecialities = specialities?.data || [];
    const [showDoctorSpeciality, setShowDoctorSpeciality] = useState([]);
    const handleDoctorSpeciality = (specialityId) => {
        if (showDoctorSpeciality.includes(specialityId)) {
            setShowDoctorSpeciality(
                showDoctorSpeciality.filter((speciality) => speciality !== specialityId)
            )
        } else {
            setShowDoctorSpeciality([...showDoctorSpeciality, specialityId]);
        }
    }
    const filteredDoctor = getDoctors?.filter(doctor => {
        return showDoctorSpeciality.includes(doctor?.speciality);
    })
    return (
        <div className="w-full md:w-[95%] lg:w-[90%] mx-auto p-4 mt-20">
            <div className="w-full flex flex-row justify-start items-center gap-5">
                <Link className=" hover:text-blue-600 transition-all ease-in-out" to='/'>Home</Link>
                <IoIosArrowForward className="inline" size={15} />
                <span>About</span>
            </div>
            <div className="w-full mt-5 space-y-3">
                <input className="w-full p-3 rounded border outline-blue-600" type="text" placeholder="Search Doctor Specialities ..."
                    onChange={(e) => setSearchText(e.target.value)} />
                <hr className="w-full mt-2" />
                <div className="w-full bg-white flex flex-col lg:flex-row justify-start items-center gap-5 p-4 rounded shadow">

                    {
                        getSpecialities?.map(speciality => {
                            return (
                                <div key={speciality?.id} className="w-full flex flex-row justify-start items-center gap-3">
                                    <input type="checkbox" checked={showDoctorSpeciality.includes(speciality?.speciality)} onChange={() => handleDoctorSpeciality(speciality?.speciality)} /> <span> {speciality?.speciality}   </span>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                {
                    showDoctorSpeciality.length == [] ? getDoctors?.filter(doctor => {
                        return doctor.speciality.toLowerCase().includes(searchText.toLowerCase());
                    }).map(doctor => {
                        return (
                            <div key={doctor?.id} className="w-full p-2 rounded shadow cursor-pointer hover:scale-x-105 transition-all ease-in-out  hover:shadow-md bg-white">
                                <img className="w-28 h-28 mx-auto rounded-full object-center bg-cover" src={doctor?.image} alt="" />
                                <div className="w-full space-y-2">
                                    <hr className="w-full mt-2" />
                                    <p className="w-full font-medium text-base text-center">Dr.{`${doctor?.fname} ${doctor?.lname}`}</p>
                                    <p className="w-full font-light text-sm text-center">{doctor?.address}</p>
                                    <p className="w-full font-light text-sm text-center">exp. {doctor?.experience}</p>
                                    <p className="w-fit mx-auto font-light text-sm text-center bg-green-500 text-white p-2 rounded">{doctor?.speciality}</p>
                                    <hr className="w-full mt-4" />

                                    <div className="w-full grid grid-cols-2 p-2 justify-start items-center mt-2">
                                        <div className="w-full">
                                            <p className={`${doctor?.status == 'verified' ? 'text-green-500 w-full font-light text-sm text-center ' : 'text-red-500 w-full font-light text-sm text-center'}`}><MdVerified className="inline" /> {doctor?.status}</p>
                                        </div>
                                        <div className="w-full">
                                            <button className="w-full font-light text-sm text-center">Book Now</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                        : filteredDoctor?.map(doctor => {
                            return (
                                <div key={doctor?.id} className="w-full p-2 rounded shadow cursor-pointer hover:scale-x-105 transition-all ease-in-out hover:shadow-md bg-white space-y-2">
                                    <img className="w-28 h-28 mx-auto rounded-full object-center bg-cover" src={doctor?.image} alt="" />
                                    <div className="w-full space-y-2">
                                        <hr className="w-full mt-2" />
                                        <p className="w-full font-medium text-base text-center">Dr.{`${doctor?.fname} ${doctor?.lname}`}</p>
                                        <p className="w-full font-light text-sm text-center">{doctor?.address}</p>
                                        <p className="w-full font-light text-sm text-center">exp. {doctor?.experience}</p>
                                        <p className="w-fit mx-auto font-light text-sm text-center bg-green-500 text-white p-2 rounded">{doctor?.speciality}</p>
                                        <hr className="w-full mt-4" />

                                        <div className="w-full grid grid-cols-2 p-2 justify-start items-center mt-2">
                                            <div className="w-full">
                                                <p className={`${doctor?.status == 'verified' ? 'text-green-500 w-full font-light text-sm text-center ' : 'text-red-500 w-full font-light text-sm text-center'}`}><MdVerified className="inline" /> {doctor?.status}</p>
                                            </div>
                                            <div className="w-full">
                                                <button className="w-full font-light text-sm text-center">Book Now</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default DoctorsPage