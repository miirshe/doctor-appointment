import { useState } from "react";
import { BiHealth } from "react-icons/bi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { Link } from "react-router-dom";

const HomeHeader = () => {
    const [showAccount, setShowAccount] = useState(false);
    const handleAccountLinks = (
        <div className="w-[40%] md:w-[30%] lg:w-[20%] p-4 rounded bg-white 
        text-lg tracking-widest absolute right-0 top-14 shadow-xl">
            <div className="flex flex-col justify-start items-start gap-5">
                <Link to='/hospital-login'>Hospital Login</Link>
                <Link to='/doctor-login'>Doctor Login</Link>
                <Link to='/patient-login'>Patient Login</Link>
            </div>
        </div>
    )
    return (
        <div className="relative">
            <div className="w-full md:w-[80%] p-4 mx-auto sticky top-0 bg-white">
                <div className="w-full flex flex-row justify-between items-center gap-5">
                    <div className="flex flex-row justify-start items-center gap-3">
                        <BiHealth className="inline text-blue-500" size={30} />
                        <span className="text-xl italic tracking-normal">MediConnect</span>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-10 text-lg tracking-widest">
                        <Link to='/'>Home</Link>
                        <button className="flex flex-row justify-between items-center gap-3" onClick={() => setShowAccount((prev) => !prev)}>
                            <span>Accounts</span>
                            {
                                !showAccount ? <MdArrowDropDown size={20} /> : <MdArrowDropUp size={20} />
                            }
                        </button>
                        {
                            showAccount && handleAccountLinks
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HomeHeader