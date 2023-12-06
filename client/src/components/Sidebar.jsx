import { BiHealth, BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { data } from "./SidebarButtons";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const Sidebar = ({ openMenu, handDelete }) => {
    console.log(data);
    const [selectedMenu, setSelectedMenu] = useState(null);

    const handleShowLinksBtn = (id) => {
        setSelectedMenu((prevSelectedMenu) =>
            prevSelectedMenu === id ? null : id
        );
    }
    return (
        <div
            className={`w-full lg:w-[20%] fixed left-0 bottom-0 top-20 lg:top-0 bg-white shadow p-2  space-y-7 overflow-y-auto ${openMenu ? "hidden lg:block" : "block"
                }`}
        >
            <div className="flex flex-row justify-center items-center gap-3 mt-5">
                <BiHealth className="inline text-blue-500" size={30} />
                <span className="text-xl italic tracking-normal">MediConnect</span>
            </div>
            <hr className="w-[80%] mx-auto" />
            <div className="space-y-5 w-full p-5">
                <div className="w-full">
                    <Link to='/' className=" flex flex-row justify-start items-center gap-3">
                        <MdOutlineSpaceDashboard size={20} />
                        <span className="text-lg">Dashboard</span>
                    </Link>
                </div>
                {data.map((res) => {
                    const isMenuOpen = selectedMenu === res.id;

                    return (
                        <div key={res.id} className="w-full flex flex-col justify-start items-start space-y-2">
                            <button
                                className="w-full flex flex-row justify-start items-center gap-3 relative"
                                onClick={() => handleShowLinksBtn(res.id)}
                            >
                                <res.icon size={20} />
                                <span className="text-lg">{res.name}</span>
                                {isMenuOpen ? (
                                    <IoIosArrowUp size={13} className="inline absolute right-3" />
                                ) : (
                                    <IoIosArrowDown size={13} className="inline absolute right-3" />
                                )}
                            </button>
                            {isMenuOpen && (
                                <div className="w-full ml-5 bg-[#EAEFF9] p-2 rounded space-y-2" onClick={handDelete}>
                                    <Link
                                        className="hover:text-blue-600 transition-all ease-in-out block text-base tracking-wide"
                                        to={res.addLink}
                                        onClick={() => setSelectedMenu(null)}
                                    >
                                        {res.btnAdd}
                                    </Link>
                                    <Link
                                        className="hover:text-blue-600 transition-all ease-in-out block text-base tracking-wide"
                                        to={res.listLink}
                                        onClick={() => setSelectedMenu(null)}
                                    >
                                        {res.btnList}
                                    </Link>

                                    {
                                        res.addDrScheduleLink && <Link
                                        className="hover:text-blue-600 transition-all ease-in-out block text-base tracking-wide" 
                                        to={res.addDrScheduleLink} onClick={() => setSelectedMenu(null)}>{res.btnAddSchedule}</Link>
                                    }
                                    {
                                        res.listDrScheduleLink && <Link
                                        className="hover:text-blue-600 transition-all ease-in-out block text-base tracking-wide" 
                                        to={res.listDrScheduleLink} onClick={() => setSelectedMenu(null)}>{res.btnListSchedule}</Link>
                                    }
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <hr className="w-[80%] mx-auto" />
            <div className="w-full p-3">
                <button
                    className="w-full flex flex-row justify-start items-center gap-3 hover:rounded hover:p-3 hover:shadow hover:text-white hover:bg-blue-500 transition-all ease-in-out"
                    type="button"
                >
                    <BiLogOut className="inline" size={24} />{" "}
                    <span className="text-lg tracking-widest">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;