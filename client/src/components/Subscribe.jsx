const Subscribe = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center p-2 mt-20">
        <div className="space-y-5">
            <h1 className="text-xl font-medium w-full text-center">Need You Any Consult With Our Doctor</h1>
            <p className="text-base text-center font-light w-full">We are availible 24/7 for you !!</p>
            <div className="w-full p-3 rounded shadow bg-[#ffffff] md:space-x-4">
                <input className="outline-blue-600 px-5 py-2 w-full md:w-fit" type="text" placeholder="Enter email address"/>
                <button className="px-3 py-2 rounded w-full md:w-fit mt-5 md:mt-0 bg-blue-600 text-white">Subscribe</button>
            </div>
        </div>
    </div>
  )
}

export default Subscribe