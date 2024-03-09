import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardRoutes } from "../dashboard/routes/dashboardRoutes"
import { useDispatch, useSelector } from "react-redux"

export const AppRouter = () => {



  
    return (
      <Routes>
        
        <Route path="/*" element={ <DashboardRoutes /> } />
        
        <Route path="/*" element={ <Navigate to='/*' replace />} />

      </Routes>
    )
  }