import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const DashboardLayouts = () => {
    const [openMenu, setOpenMenu] = useState(true);
    const handDelete = () => {
        setOpenMenu(!openMenu)
    }
    return (
        <div className='relative w-full'>
            <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} handDelete={handDelete} />
            <div className="w-full lg:w-[80%] absolute right-0">
                <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayouts