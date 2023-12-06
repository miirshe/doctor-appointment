import { FaUserDoctor } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaDiagnoses } from "react-icons/fa";
export const data = [
    {
        "id": 1,
        "name": "Doctor",
        "addLink": "add-doctor",
        "listLink": "doctor-list",
        "btnAdd":"Add Doctor",
        "btnList":"Doctor List",
        "addDrScheduleLink" : "add-dr-schedule",
        "listDrScheduleLink" : "dr-schedule-list",
        "btnAddSchedule": "Add Doctor Schedule",
        "btnListSchedule": "Doctor Schedule List",
        "icon": FaUserDoctor
    },
    {
        "id": 2,
        "name": "Patient",
        "btnAdd":"Add Patient",
        "btnList":"Patient List",
        "addLink": "add-patient",
        "listLink": "patient-list",
        "icon": HiOutlineUsers
    },
    {
        "id": 3,
        "name": "Appointment",
        "btnAdd":"Add Appointment",
        "btnList":"Appointment List",
        "addLink": "add-appointment",
        "listLink": "appointment-list",
        "icon": AiOutlineSchedule
    },
    {
        "id": 4,
        "name": "Diagnoses",
        "btnAdd":"Add Diagnoses",
        "btnList":"Diagnoses List",
        "addLink": "add-diagnoses",
        "listLink": "diagnoses-list",
        "icon": FaDiagnoses
    }
]