import { Route, Routes } from "react-router-dom"
import {DoctorLogin, DoctorRegister, Home, HospitalLogin, HospitalRegister, PatientLogin, PatientRegister} from './ExportFiles'

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
    </Routes>
    </>
  )
}

export default App