import { Route, Routes } from "react-router-dom"
import {
  AddAppointment, AddDiagnoses, AddDoctorSchedule, 
  AddPatient, AddUser, AppointmentList, Dashboard, DashboardLayouts, 
  DiagnosesList, DoctorScheduleList, PatientList, PatientLogin, PatientRegister, UserList, UserLogin} from './ExportFiles'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/user-login" element={<UserLogin/>} />
      <Route path="/patient-login" element={<PatientLogin/>} />
      <Route path="/patient-register" element={<PatientRegister/>} />

      <Route path="/" element={<DashboardLayouts/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="add-dr-schedule" element={<AddDoctorSchedule/>}/>
        <Route path="dr-schedule-list" element={<DoctorScheduleList/>}/>
        <Route path="add-patient" element={<AddPatient/>}/>
        <Route path="patient-list" element={<PatientList/>}/>
        <Route path="add-appointment" element={<AddAppointment/>}/>
        <Route path="appointment-list" element={<AppointmentList/>}/>
        <Route path="add-diagnoses" element={<AddDiagnoses/>}/>
        <Route path="diagnoses-list" element={<DiagnosesList/>}/>
        <Route path="user-list" element={<UserList/>}/>
        <Route path="add-user" element={<AddUser/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App