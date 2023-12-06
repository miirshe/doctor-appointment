import { FaUserDoctor } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlinePayment } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
export const data = [
    {
        "id": 1,
        "name": "Doctor",
        "AddLink": "add-doctor",
        "ListLink": "doctor-list",
        "icon": FaUserDoctor
    },
    {
        "id": 2,
        "name": "Patient",
        "AddLink": "add-patient",
        "ListLink": "patient-list",
        "icon": HiOutlineUsers
    },
    {
        "id": 3,
        "name": "Appointment",
        "AddLink": "add-appointment",
        "ListLink": "appointment-list",
        "icon": AiOutlineSchedule
    },
    {
        "id": 4,
        "name": "Payment",
        "AddLink": "add-payment",
        "ListLink": "payment-list",
        "icon": MdOutlinePayment
    }
]