import { FaUser} from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaDiagnoses } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
export const data = [
    {
        "id": 1,
        "name": "Dashboard",
        "link":"dashboard",
        "icon": MdOutlineSpaceDashboard
    },
    {
        "id": 2,
        "name": "Patient",
        "link":"patient-list",
        "icon": HiOutlineUsers
    },
    {
        "id": 3,
        "name": "Appointment",
        "link":"appointment-list",
        "icon": AiOutlineSchedule
    },
    {
        "id": 4,
        "name": "Diagnoses",
        "link":"diagnoses-list",
        "icon": FaDiagnoses
    },
    {
        "id": 5,
        "name": "User",
        "link":"user-list",
        "icon": FaUser
    }
]