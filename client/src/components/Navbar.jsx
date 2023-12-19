const Navbar = () => {
    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 justify-start items-center mt-10">
            <div className="w-full space-y-5 lg:mt-[-50px]">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold w-full lg:w-[70%]" style={{lineHeight:"1.7em"}}>Keep Your Family More Healthy</h1>
                <div className="w-full mt-5 space-y-3">
                    <p className="text-base font-light leading-loose">Healthcare , Health-care , or health care is the maintena
                    improvement health via prevention , diagnoses of lines, injury or othet physical mental</p>
                    <div className="w-full flex flex-row justify-start items-start gap-5 mt-3">
                        <button className="bg-blue-600 text-white px-5 py-2 rounded">Get Started</button>
                        <button className="border-blue-600 border text-blue-600 px-5 py-2 rounded">Contact Us</button>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <img src="/images/onlinedoc.png" alt="" />
            </div>
        </div>
    )
}

export default Navbar