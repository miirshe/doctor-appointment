import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
const DashboardLayouts = () => {
    const [openMenu, setOpenMenu] = useState(true);
    const handDelete = () => {
        setOpenMenu(!openMenu)
    }
    return (
        <div className='relative w-full'>
            <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} handDelete={handDelete} />
            <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </div>
    )
}

export default DashboardLayouts