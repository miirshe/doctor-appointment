import { Outlet } from "react-router-dom"
import DashboardHeader from "./DashboardHeader"
import DashboardSideBar from "./DashboardSideBar"
import { useState } from "react"
const DashboardLayout = () => {
    const [showMenu, setShowMenu] = useState(true);
    return (
        <div className="w-full relative">
            <DashboardSideBar showMenu={showMenu} setShowMenu={setShowMenu} />
            <div className="w-full lg:w-[81.9%] absolute right-0">
                <DashboardHeader showMenu={showMenu} setShowMenu={setShowMenu} />
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout