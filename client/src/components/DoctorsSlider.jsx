import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
const DoctorsSlider = () => {
  const DoctorData = [
    {
      'id': 1,
      'fname': 'John',
      'lname': 'Smith',
      'speciality': 'Nuerology',
      'experience': '5yr',
      'image': '/images/dr4.png'
    },
    {
      'id': 2,
      'fname': 'Joe',
      'lname': 'Robot',
      'speciality': 'Nuerology',
      'experience': '5yr',
      'image': '/images/dr4.png'
    },
    {
      'id': 3,
      'fname': 'abdikafi',
      'lname': 'isse',
      'speciality': 'Nuerology',
      'experience': '5yr',
      'image': '/images/dr4.png'
    },
    {
      'id': 4,
      'fname': 'Navana Tailor',
      'lname': 'isse',
      'speciality': 'Nuerology',
      'experience': '5yr',
      'image': '/images/dr3.png'
    },
    {
      'id': 5,
      'fname': 'Navana Tailor',
      'lname': 'isse',
      'speciality': 'Nuerology',
      'experience': '5yr',
      'image': '/images/dr3.png'
    }
  ]

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
        <Carousel responsive={responsive}>
          {
            DoctorData?.map(res => {
              return (
                <Link to={`doctor-detail/${res.id}`} className="w-full relative" key={res.id}>
                  <img src={res.image} className="w-40 h-40 md:w-60 md:h-60 object-center bg-cover" alt="" />
                  <div className="w-40 h-20 md:w-60 md:h-40 absolute top-20 rounded-md p-4 bg-blue-600 -z-10">
                  </div>
                  <div className="mt-2 space-y-2">
                    <p className="text-lg font-normal">Dr. <span>{res?.fname}</span> <span>{res?.lname}</span></p>
                    <p className="text-base font-light"> <span>{res?.speciality}</span> ( <span>{res?.experience} experience</span>)</p>
                  </div>
                </Link>
              )
            })
          }
        </Carousel>
      </div>
    </div>
  )
}

export default DoctorsSlider