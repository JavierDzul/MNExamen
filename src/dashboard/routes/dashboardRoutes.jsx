import { Navigate, Route, Routes } from "react-router-dom"
import { dashboardLayout } from "../layouts/dashboardLayout"
import { HomePage } from "../pages/home"

export const DashboardRoutes = () => {


  return (
    <dashboardLayout>
      <Routes>
          <Route path="home" element={ <HomePage /> }/>
        
        
          {/* TODO: Descomentar en proxima versión y redireccionar a /inicio  */}
          <Route path="/*" element={ <Navigate to="/home" /> }/>

      </Routes>
    </dashboardLayout>
  )
}