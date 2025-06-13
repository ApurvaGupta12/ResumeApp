import Footer from "@/components/ui/Footer"
import Navbar from "@/components/ui/Navbar"
import { Outlet } from "react-router-dom"

const Root = () => {
  return (
    <div>
       {/* navbar */}
        <Navbar />
       
        <Outlet/>
        <Footer/>   
    </div>
  )
}

export default Root