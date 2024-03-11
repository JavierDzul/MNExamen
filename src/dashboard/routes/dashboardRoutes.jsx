import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardLayout } from "../layouts/dashboardLayout"
import { HomePage } from "../pages/home"

export const DashboardRoutes = () => {


  return (
    
      <Routes>
          <Route path="home" element={ <HomePage /> }/>
        
        
          {/* TODO: Descomentar en proxima versión y redireccionar a /inicio  */}
          <Route path="/*" element={ <Navigate to="/home" /> }/>

      </Routes>
    
  )
}