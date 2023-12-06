import { Route, Routes } from 'react-router-dom'
import { Dashboard, Doctors, Footer, Header, Sidebar } from './ExportFiles'
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
          <Route path='/' element={< Doctors/>} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App