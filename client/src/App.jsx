import { Route, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import {
  About, AddAppointment, AddDoctor, AddDoctorSchedule, AddHospital, AddPatients, AddUser, Appointments, Contact, Dashboard,
  DashboardLayout, Diagnoses, DoctorDetialPage, DoctorLogin,
  DoctorRegister, DoctorSchedule, Doctors, DoctorsPage, Home, HospitalList, PageLayouts,
  PatientAppointment,
  PatientLogin, PatientRegister, Patients, ProtectedRoutes, Specialities, UserLogin, Users
} from "./ExportFiles";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const App = () => {
  const userToken = Cookies.get('userToken');
  const doctorToken = Cookies.get('doctorToken');
  const [doctorAuth, setDoctorAuth] = useState(false);

  const [userAuth, setUserAuth] = useState(false);
  useEffect(() => {
    if (userToken) {
      setUserAuth(true);
    } else {
      setUserAuth(false);
    }
  }, [])


  useEffect(() => {
    if (doctorToken) {
      setDoctorAuth(true);
    } else {
      setDoctorAuth(false);
    }
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<PageLayouts />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/doctors-page" element={<DoctorsPage />} />
          <Route path="/doctor-detail-page/:id" element={<DoctorDetialPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/patient-appointment" element={<PatientAppointment />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/doctor-register" element={<DoctorRegister />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/patient-register" element={<PatientRegister />} />
          <Route path="user-login" element={<UserLogin />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            {
              userAuth && (
                <>
                  <Route path="hospitals" element={<HospitalList />} />
                  <Route path="add-hospital" element={<AddHospital />} />
                  <Route path="add-hospital/:id" element={<AddHospital />} />
                  <Route path="doctors" element={<Doctors />} />
                  <Route path="add-doctor" element={<AddDoctor />} />
                  <Route path="add-doctor/:id" element={<AddDoctor />} />
                  <Route path="patients" element={<Patients />} />
                  <Route path="add-patient" element={<AddPatients />} />
                  <Route path="add-patient/:id" element={<AddPatients />} />
                  <Route path="specialities" element={<Specialities />} />
                  <Route path="specialities/:id" element={<Specialities />} />
                  <Route path="users" element={<Users />} />
                  <Route path="add-user" element={<AddUser />} />
                  <Route path="diagnoses" element={<Diagnoses />} />
                  <Route path="diagnoses/:id" element={<Diagnoses />} />
                  <Route path="doctor-schedule" element={<DoctorSchedule />} />
                  <Route path="add-doctor-schedule" element={<AddDoctorSchedule />} />
                  <Route path="add-doctor-schedule/:id" element={<AddDoctorSchedule />} />
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="add-appointment" element={<AddAppointment />} />
                  <Route path="add-appointment/:id" element={<AddAppointment />} />

                </>
              )
            }
            {
              doctorAuth && (
                <>
                  <Route path="doctor-schedule" element={<DoctorSchedule />} />
                  <Route path="add-doctor-schedule" element={<AddDoctorSchedule />} />
                  <Route path="add-doctor-schedule/:id" element={<AddDoctorSchedule />} />
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="add-appointment" element={<AddAppointment />} />
                  <Route path="add-appointment/:id" element={<AddAppointment />} />

                </>
              )
            }
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App