import { Route, Routes } from "react-router-dom"
import {AddAppointment, AddDiagnoses, AddDoctor, AddDoctorSchedule, AddPatient, AppointmentList, Dashboard, DashboardLayouts, DiagnosesList, DoctorList, DoctorLogin, DoctorRegister, DoctorScheduleList, Doctors, Home, HospitalLogin, HospitalRegister, PatientList, PatientLogin, PatientRegister} from './ExportFiles'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hospital-login" element={<HospitalLogin />} />
      <Route path="/hospital-register" element={<HospitalRegister />} />
      <Route path="/doctor-login" element={<DoctorLogin />} />
      <Route path="/doctor-register" element={<DoctorRegister />} />
      <Route path="/patient-login" element={<PatientLogin />} />
      <Route path="/patient-register" element={<PatientRegister />} />
      <Route path="/doctors" element={<Doctors />} />

      <Route path="/dashboard" element={<DashboardLayouts/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="add-doctor" element={<AddDoctor/>}/>
        <Route path="doctor-list" element={<DoctorList/>}/>
        <Route path="add-dr-schedule" element={<AddDoctorSchedule/>}/>
        <Route path="dr-schedule-list" element={<DoctorScheduleList/>}/>
        <Route path="add-patient" element={<AddPatient/>}/>
        <Route path="patient-list" element={<PatientList/>}/>
        <Route path="add-appointment" element={<AddAppointment/>}/>
        <Route path="appointment-list" element={<AppointmentList/>}/>
        <Route path="add-diagnoses" element={<AddDiagnoses/>}/>
        <Route path="diagnoses-list" element={<DiagnosesList/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App