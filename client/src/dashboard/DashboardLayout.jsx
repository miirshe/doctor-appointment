import { Outlet } from "react-router-dom"
import DashboardHeader from "./DashboardHeader"
import DashboardSideBar from "./DashboardSideBar"

const DashboardLayout = () => {
    return (
        <div className="w-full relative">
            <DashboardSideBar />
            <div className="w-full lg:w-[85%] absolute right-0">
                <DashboardHeader />
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout