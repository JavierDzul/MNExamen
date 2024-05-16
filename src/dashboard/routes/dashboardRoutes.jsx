import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardLayout } from "../layouts/dashboardLayout"
import { HomePage } from "../pages/home"
import { GaussSeidel } from "../pages/EquationsSystemsSolutionMethosUnit3/GaussSeidel"
import SystemMethod from "../components/SystemMethod"
import Metodo from "../components/Method"
import { metodos } from "../../helpers/math"
import { useState } from "react"
import { Jacobi } from "../pages/EquationsSystemsSolutionMethosUnit3/Jacobi"
import { NewtonRaphson } from "../pages/EquationsSystemsSolutionMethosUnit3/NonLinearEquationsSystem/NewtonRaphson"
import SystemMethodJacobi from "../components/SystemMethodJacobi"
import NewtonRaphsonSystem from "../components/NewtonRaphsonSystem"
import { MultipleTrapezoid } from "../pages/MultipleTrapezoid"
import { MultipleSimpsonOneThird } from "../pages/MultipleSimpsonOneThird"
import { SimpsonOneEightd } from "../pages/SimpsonOneEightd"
import { SegmentIntegrals } from "../pages/SegmentIntegrals"


export const DashboardRoutes = () => {

  const [selection, setSelection] = useState(-1)
  const [params, setParams] = useState({})
  
  return (
    <DashboardLayout>

      <Routes>
          <Route path="home" element={ <HomePage /> }/>
          
          <Route path="gauss-seidel" element={ <GaussSeidel  Children={<SystemMethod params={params} setParams={setParams} method={metodos[4]}/>}/> }/>
          <Route path="jacobi" element={ <Jacobi  Children={<SystemMethodJacobi params={params} setParams={setParams} method={metodos[5]}/>}/> }/>
          <Route path="newton-raphson" element={ <NewtonRaphson params={params} setParams={setParams} method={metodos[6]} /> }/>
          
          <Route path="trapezoid" element={ <MultipleTrapezoid method={metodos[7]} /> }/>
          <Route path="simpson1-3" element={ <MultipleSimpsonOneThird method={metodos[8]} /> }/>
          <Route path="simpson1-8" element={ <SimpsonOneEightd method={metodos[9]} /> }/>
          <Route path="segmentIntegrals" element={ <SegmentIntegrals method={metodos[10]} /> }/>
          <Route path="segment" element={ <SegmentIntegrals method={metodos[12]} /> }/>
        
        
          {/* TODO: Descomentar en proxima versión y redireccionar a /inicio  */}
          <Route path="/*" element={ <Navigate to="/home" /> }/>

      </Routes>
    
    </DashboardLayout>
  )
}