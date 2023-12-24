import { Route, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import {
  About, AddDoctor, AddHospital, AddPatients, Contact, Dashboard,
  DashboardLayout, DoctorLogin,
  DoctorRegister, Doctors, Home, HospitalList, PageLayouts,
  PatientLogin, PatientRegister, Patients, Specialities
} from "./ExportFiles";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageLayouts />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/doctor-register" element={<DoctorRegister />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/patient-register" element={<PatientRegister />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="hospitals" element={<HospitalList />} />
          <Route path="add-hospital" element={<AddHospital />} />
          <Route path="add-hospital/:id" element={<AddHospital />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="add-doctor" element={<AddDoctor />} />
          <Route path="add-doctor/:id" element={<AddDoctor />} />
          <Route path="patients" element={<Patients />} />
          <Route path="add-patient" element={<AddPatients />} />
          <Route path="add-patient/:id" element={<AddPatients />} />
          <Route path="specialities" element={<Specialities/>} />
          <Route path="specialities/:id" element={<Specialities/>} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App