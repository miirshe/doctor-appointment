import { CiSettings } from "react-icons/ci";
import { MdClose, MdOutlineMenu } from "react-icons/md";
const DashboardHeader = ({ showMenu, setShowMenu }) => {
  return (
    <div className="p-3 shadow bg-white">
      <div className="flex flex-row justify-start md:justify-end items-center gap-2 md:gap-4">
        {
          showMenu ?
            <MdOutlineMenu className="block lg:hidden" onClick={() => setShowMenu(!showMenu)} size={30} />
            : <MdClose className="block lg:hidden" size={30} onClick={() => setShowMenu(!showMenu)} />
        }
        <CiSettings className="cursor-pointer" size={30} />
        <div className="flex flex-row justify-start items-center gap-3 md:mr-8">
          <img className="w-8 h-8 rounded-full" src="/images/miirshe.jpg" alt="" />
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-sm font-light md:font-medium">Dr.Abdikafi Isse Isak</h1>
            <h5 className="font-extralight text-xs">Doctor</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader