import { Route, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import { About, Contact, DoctorLogin, DoctorRegister, Home, PageLayouts, PatientLogin, PatientRegister } from "./ExportFiles";
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
          <Route path="/patient-login" element={<PatientLogin/>} />
          <Route path="/patient-register" element={<PatientRegister/>} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App