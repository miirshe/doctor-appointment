import { FaAmbulance } from "react-icons/fa";
import { GiStethoscope } from "react-icons/gi";
import { BiFirstAid } from "react-icons/bi";
import { GiMedicines } from "react-icons/gi";
const WhyYouChooseUs = () => {
    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 justify-start items-center gap-4">
            <div className="w-full space-y-8">
                <h1 className="text-2xl tracking-wider font-bold">Why Choose Us</h1>
                <p className="text-base font-light leading-loose">Healthcare , Health-care , or health care is the maintena
                    improvement health via prevention , diagnoses of lines, injury or othet physical mental</p>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 space-y-3">
                    <div className="w-full p-3 rounded shadow-md space-y-2">
                        <GiStethoscope size={30} className="bg-green-300 rounded-full w-10 h-10 p-2" />
                        <h1 className="text-lg font-medium">Expert Doctors</h1>
                        <p className="text-base font-light leading-loose">Healthcare is the maintena
                            improvement health via prevention  and treatments</p>
                    </div>
                    <div className="w-full p-3 rounded shadow-md space-y-2">
                        <FaAmbulance size={30} className="bg-red-300 rounded-full w-10 h-10 p-2" />
                        <h1 className="text-lg font-medium">Emergency Car</h1>
                        <p className="text-base font-light leading-loose">Healthcare is the maintena
                            improvement health via prevention  and treatments</p>
                    </div>
                    <div className="w-full p-3 rounded shadow-md space-y-2">
                        <BiFirstAid size={30} className="bg-blue-200 rounded-full w-10 h-10 p-2" />
                        <h1 className="text-lg font-medium">24 Hours Services </h1>
                        <p className="text-base font-light leading-loose">Healthcare is the maintena
                            improvement health via prevention  and treatments</p>
                    </div>
                    <div className="w-full p-3 rounded shadow-md space-y-2">
                        <GiMedicines size={30} className="bg-orange-300 rounded-full w-10 h-10 p-2" />
                        <h1 className="text-lg font-medium">Well Medicine </h1>
                        <p className="text-base font-light leading-loose">Healthcare is the maintena
                            improvement health via prevention  and treatments</p>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <img src="/images/stethoscope.png" alt="" />
            </div>
        </div>
    )
}

export default WhyYouChooseUs