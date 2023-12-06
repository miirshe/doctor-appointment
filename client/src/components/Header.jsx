import { CiSettings } from "react-icons/ci";
import { MdOutlineClose, MdOutlineMenu } from "react-icons/md";
const Header = ({ openMenu , setOpenMenu}) => {
  return (
    <div className="w-full shadow bg-white p-6">
      <div className="w-full lg:w-[95%] flex flex-row justify-start lg:justify-end items-center gap-5">
        {
          openMenu ? <MdOutlineMenu className="block lg:hidden" size={25} onClick={ () => setOpenMenu(!openMenu)} /> 
          : <MdOutlineClose className="block lg:hidden" size={25} onClick={() => setOpenMenu(!openMenu)} />
        }
        <CiSettings className=" cursor-pointer inline" size={25}/>
        <img className="w-10 h-10 rounded-full" src="/images/miirshe.jpg" alt="" />
      </div>
    </div>
  )
}

export default Header