import { Outlet } from "react-router-dom"
import { Footer, Header } from "../ExportFiles"

const PageLayouts = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default PageLayouts