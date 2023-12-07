const Navbar = () => {
  return (
    <div className='w-full lg:w-[80%] mx-auto h-[90vh] mt-10 p-5'>
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 justify-start items-center gap-5'>
            <div className='w-full space-y-4'>
                <h1 className=' text-xl md:text-3xl tracking-widest leading-10'>You Must trusted <span className='text-blue-600'>Free Online</span></h1>
                <h3 className="text-lg md:text-2xl tracking-widest leading-10">Doctor Appointment 24/7</h3>
                <p className=" leading-10">Mediconnect is a comprehensive medical connector platform that facilitates seamless communication and collaboration between hospitals, doctors, and patients</p>
                <button className='px-3 py-2 rounded shadow bg-blue-600 text-white'>Booking Now</button>
            </div>
            <img src="/images/online.png" alt="" />
        </div>
    </div>
  )
}

export default Navbar