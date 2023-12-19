import { DoctorsSlider, Navbar, OurSpecialisty, Subscribe, WhyYouChooseUs } from "../ExportFiles"

const Home = () => {
  return (
    <div className="w-full md:w-[95%] lg:w-[90%] mx-auto p-4 mt-20">
        <Navbar/>
        <WhyYouChooseUs/>
        <OurSpecialisty/>
        <DoctorsSlider/>
        <Subscribe/>
    </div>
  )
}

export default Home