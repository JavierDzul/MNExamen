import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardRoutes } from "../dashboard/routes/dashboardRoutes"

export const AppRouter = () => {

  
    return (
      <Routes>
        
       
        <Route path="/*" element={ <DashboardRoutes /> } />

      </Routes>
    )
  }