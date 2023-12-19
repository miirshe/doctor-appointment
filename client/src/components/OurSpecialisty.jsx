const OurSpecialisty = () => {
    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 justify-start items-center gap-4 mt-20">
            <div className="w-full">
                <img src="/images/onlinedoc.png" alt="" />
            </div>
            <div className="w-full space-y-8">
                <h1 className="text-2xl tracking-wider font-bold">Our Speciality</h1>
                <p className="text-base font-light leading-loose">Healthcare , Health-care , or health care is the maintena
                    improvement health via prevention , diagnoses of lines, injury or othet physical mental</p>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 space-y-3">
                    <div className="w-full p-3 rounded shadow-md space-y-2 bg-blue-600 text-white">
                        <img src="/images/dentist.jpg" className="object-center bg-center rounded-full w-20 h-20 p-2" />
                        <h1 className="text-lg font-medium">Dentist</h1>
                        <p className="text-base font-light leading-loose">Healthcare is the maintena
                            improvement health via prevention  and treatments</p>
                    </div>
                    <div className="w-full p-3 rounded shadow-md space-y-2">
                        <img src="/images/cardiology.png" className="object-center bg-center rounded-full w-20 h-20 p-2" />
                        <h1 className="text-lg font-medium">Cardiology</h1>
                        <p className="text-base font-light leading-loose">Healthcare is the maintena
                            improvement health via prevention  and treatments</p>
                    </div>
                    <div className="w-full p-3 rounded shadow-md space-y-2">
                        <img src="/images/surgery.png" className="object-center bg-center rounded-full w-20 h-20 p-2" />
                        <h1 className="text-lg font-medium">General Surgery</h1>
                        <p className="text-base font-light leading-loose">Healthcare is the maintena
                            improvement health via prevention  and treatments</p>
                    </div>
                    <div className="w-full p-3 rounded shadow-md space-y-2">
                        <img src="/images/dentist.jpg" className="object-center bg-center rounded-full w-20 h-20 p-2" />
                        <h1 className="text-lg font-medium">Nuerology </h1>
                        <p className="text-base font-light leading-loose">Healthcare is the maintena
                            improvement health via prevention  and treatments</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurSpecialisty