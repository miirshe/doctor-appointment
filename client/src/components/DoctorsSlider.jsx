import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useGetDoctorsQuery, useGetDoctorsWithScheduleQuery } from "../redux/slices/DoctorSlices";
import { MdVerified } from "react-icons/md";
const DoctorsSlider = () => {
  const { data } = useGetDoctorsQuery();
  const DoctorData = data?.data || [];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className="w-full mt-20">
      <h1 className="w-full text-center text-xl font-semibold">Meet With Doctor</h1>
      <div className="w-full mt-10">
        <Carousel responsive={responsive} className="bg-white">
          {
            DoctorData?.map(doctor => {
              return (
                <Link to={`doctor-detail/${doctor?.id}`} className="w-full p-2 rounded shadow cursor-pointer hover:scale-x-105 transition-all ease-in-out  hover:shadow-md" key={doctor.id}>
                  <img className="w-28 h-28 mx-auto rounded-full object-center bg-cover" src={doctor?.image} alt="" />
                  <div className="w-full space-y-3">
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
                </Link>
              )
            })
          }
        </Carousel>
      </div>
    </div >
  )
}

export default DoctorsSlider