import { BiHealth } from "react-icons/bi"

const Footer = () => {
  return (
    <div className="my-24">
      <p className="text-center text-lg flex flex-row justify-center items-center gap-2">
        <BiHealth className="inline text-blue-500" size={20} />
        <span>MediConnect </span>
        <span>&copy; released 2023</span>
      </p>
    </div>
  )
}

export default Footer 