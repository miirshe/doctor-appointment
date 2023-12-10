import { BiHealth, BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { data } from "./SidebarButtons";

const Sidebar = ({ openMenu, handDelete }) => {

    return (
        <div
            className={`w-full lg:w-[20%] fixed left-0 bottom-0 top-20 lg:top-0 bg-white shadow p-2 z-30 space-y-7 overflow-y-auto ${openMenu ? "hidden lg:block" : "block"}`}>
            <div className="flex flex-row justify-center items-center gap-3 mt-5">
                <BiHealth className="inline text-blue-500" size={30} />
                <span className="text-2xl italic tracking-normal">MediConnect</span>
            </div>
            <hr className="w-[80%] mx-auto" />
            <div className="space-y-5 w-full p-4">
                <div className="w-full space-y-4">
                    {
                        data?.map(res => {
                            return (
                                <NavLink to={`${res.link}`} className="hover:bg-slate-300 transition-all ease-in-out p-2 flex flex-row justify-start items-center gap-2" key={res.id}>
                                    <res.icon size={20} />
                                    <span>{res.name}</span>
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>
            <hr className="w-[80%] mx-auto" />
            <div className="w-full p-3">
                <button className="w-full flex flex-row justify-start items-center gap-3
                hover:bg-slate-300 p-2 transition-all ease-in-out" type="button">
                    <BiLogOut className="inline" size={24} />{" "}
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;