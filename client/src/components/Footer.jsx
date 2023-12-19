import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { MdOutlineMonitorHeart } from "react-icons/md"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="bg-blue-600 w-full p-5 mt-20 text-white">
            <div className=" w-full md:w-[95%] lg:w-[90%] mx-auto">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-4">
                    <div className="w-full space-y-3">
                        <div className="w-full flex flex-row justify-start items-center gap-3">
                            <MdOutlineMonitorHeart className="text-black" size={30} />
                            <p className="w-full text-xl"> <span>Medi</span> <span className="text-black">Hub</span></p>
                        </div>
                        <p className="text-lg font-light">Contact us +252 618302314 </p>
                        <p className="text-lg font-light">Info medihub@gmail.com </p>
                    </div>
                    <div className="w-full space-y-3">
                        <h1 className="text-xl font-medium text-slate-800">General</h1>
                        <div className="w-full space-y-3 text-base font-light flex flex-col justify-center">
                            <Link className="hover:text-slate-800" to='/'>Home</Link>
                            <Link className="hover:text-slate-800" to='/doctors'>Doctors</Link>
                            <Link className="hover:text-slate-800" to='/about'>About Us</Link>
                            <Link className="hover:text-slate-800" to='/contact'>Contact Us</Link>
                        </div>
                    </div>
                    <div className="w-full space-y-3">
                        <h1 className="text-xl font-medium text-slate-800">Social Media Links</h1>
                        <div className="w-full space-x-5">
                            <Link className="hover:text-slate-800" to='/'><FaFacebook className="inline hover:text-slate-800 text-white transition-all ease-in-out" size={20}/></Link>
                            <Link className="hover:text-slate-800" to='/'><FaInstagram className="inline hover:text-slate-800 text-white transition-all ease-in-out" size={20}/></Link>
                            <Link className="hover:text-slate-800" to='/'><FaTwitter className="inline hover:text-slate-800 text-white transition-all ease-in-out" size={20}/></Link>
                            <Link className="hover:text-slate-800" to='/'><FaLinkedin className="inline hover:text-slate-800 text-white transition-all ease-in-out" size={20}/></Link>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="w-full mt-10"/>
            <div className="mt-10 w-full">
                <p className="w-full text-center">&copy; Copyright ©2023 medihub.com</p>
            </div>
        </div>
    )
}

export default Footer