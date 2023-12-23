import { IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"

const About = () => {
    return (
        <div className="w-full md:w-[95%] lg:w-[90%] mx-auto p-4 mt-20">
            <div className="w-full flex flex-row justify-start items-center gap-5">
                <Link className=" hover:text-blue-600 transition-all ease-in-out" to='/'>Home</Link>
                <IoIosArrowForward className="inline" size={15} />
                <span>About</span>
            </div>

            <div className="w-full space-y-8 mt-10">
                <div className="p-2">
                    <p className="text-base font-light text-justify"> <span className="text-blue-600 font-bold">Medi Hub </span>
                         Our doctor appointment platform serves as a comprehensive solution for patients seeking medical consultations and treatments.
                        We have collaborated with numerous hospitals, ensuring a wide range of specialties and healthcare services are available to patients. Through our platform, patients can easily search for doctors based on their area of expertise, location, availability, and patient reviews. By providing detailed profiles for each doctor and hospital, we enable patients to make informed decisions when selecting their healthcare providers.
                    </p>
                </div>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="w-full p-2 space-y-4">
                        <h1 className="text-2xl tracking-widest text-blue-600 font-bold">Vission</h1>
                        <p className="text-base font-light text-justify">
                            Our vision is to create a seamless healthcare ecosystem where patients can easily connect with doctors and hospitals,
                            regardless of geographical barriers. We envision a future where healthcare is easily accessible,
                            efficient, and patient-centric. By harnessing the power of technology,
                            we strive to empower individuals to take control of their health and well-being,
                            while enabling healthcare providers to deliver exceptional care with ease.
                            We aim to become the go-to platform for patients and doctors alike,
                            revolutionizing the way healthcare services are accessed and delivered.
                        </p>
                    </div>
                    <div className="w-full p-2 space-y-4">
                        <h1 className="text-2xl tracking-widest text-blue-600 font-bold">Mission</h1>
                        <p className="text-base font-light text-justify">
                            Our mission is to bridge the gap between patients and doctors, making quality healthcare accessible to all.
                            We are committed to simplifying the process of booking doctor appointments,
                            eliminating the need for long waiting times and cumbersome paperwork.
                            By leveraging technology, we aim to revolutionize the healthcare
                            industry by enhancing the overall patient experience,
                            ensuring timely access to medical professionals,
                            and fostering a sense of trust and transparency.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About