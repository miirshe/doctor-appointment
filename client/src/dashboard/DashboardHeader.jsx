import { CiSettings } from "react-icons/ci";
const DashboardHeader = () => {
  return (
    <div className="p-3 shadow bg-white">
        <div className="flex flex-row justify-end items-center gap-4">
        <CiSettings className="cursor-pointer" size={30}/>
        <div className="flex flex-row justify-start items-center gap-5 mr-8">
            <img className="w-8 h-8 rounded-full" src="/images/miirshe.jpg" alt="" />
            <div className="flex flex-col justify-start items-start">
                <h1 className="text-sm font-medium">Dr.Abdikafi Isse Isak</h1>
                <h5 className="font-extralight text-xs">Doctor</h5>
            </div>
        </div>
        </div>
    </div>
  )
}

export default DashboardHeader