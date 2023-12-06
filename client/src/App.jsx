import { Route, Routes } from 'react-router-dom'
import { AddAppointment, AddDiagnoses, AddDoctor, AddDoctorSchedule, AddPatient, AppointmentList, Dashboard, DiagnosesList, DoctorList, DoctorScheduleList, Footer, Header, PatientList, Sidebar } from './ExportFiles'
import { useState } from 'react'
const App = () => {
  const [openMenu , setOpenMenu] = useState(true);
  const handDelete = () => {
    setOpenMenu(!openMenu)
  }
  return (
    <div className='relative w-full'>
      <Sidebar openMenu = {openMenu}  setOpenMenu = {setOpenMenu} handDelete={ handDelete }/>
      <div className='w-full lg:w-[80%] lg:absolute lg:right-0 space-y-4'>
        <Header openMenu = {openMenu}  setOpenMenu = {setOpenMenu} />
        <Routes>
          {/* public routes */}
          <Route path='/' element={<Dashboard />} />
          {/* private routes */}
          <Route path='/add-doctor' element={< AddDoctor/>} />
          <Route path='/doctor-list' element={< DoctorList/>} />
          <Route path='/add-dr-schedule' element={< AddDoctorSchedule/>} />
          <Route path='/dr-schedule-list' element={< DoctorScheduleList/>} />
          <Route path='/add-appointment' element={< AddAppointment/>} />
          <Route path='/appointment-list' element={< AppointmentList/>} />
          <Route path='/add-patient' element={< AddPatient/>} />
          <Route path='/patient-list' element={< PatientList/>} />
          <Route path='/add-diagnoses' element={< AddDiagnoses/>} />
          <Route path='/diagnoses-list' element={< DiagnosesList/>} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App