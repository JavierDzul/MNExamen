import { NavLink } from "react-router-dom"

export const Sidebar = () => {
  return (
    <div className="offcanvas offcanvas-start sidebarNav border-0 shadow-sm" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header">
        {
          
        }
        <h5 className="offcanvas-title ms-2" id="offcanvasExampleLabel">Métodos Disponibles</h5>
      </div>

      <div className="offcanvas-body p-0">

        <ul className="navbar-nav p-3">
          <li className="border border-3 border-light bg-opacity-25 border-start-0 border-end-0 rounded-end">
            <button className="nav-link d-flex text-white align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              
              <span className="ms-2" style={{ fontSize: '17px' }}>Unidad 2</span>
            </button>

            <div className="collapse" id="collapseExample">
              <div className="card card-body">

                <NavLink
                  className="nav-link text-black d-flex flex-column align-items-center" to="/home">
                  
                  <span className='ms-2'>Bisección</span>
                </NavLink>


                <NavLink
                  className="nav-link border-top d-flex text-black flex-column align-items-center" to="/home">
                  
                  <span className='ms-2'>Regla Falsa</span>
                </NavLink>

                <NavLink
                    className="nav-link border-top text-black d-flex flex-column align-items-center" to="/home">
                  
                    <span className='ms-2'>Newton Raphson</span>
                </NavLink>

                <NavLink
                    className="nav-link border-top text-black d-flex flex-column align-items-center" to="/home">
                  
                    <span className='ms-2'>Secante</span>
                </NavLink>

              </div>
            </div>
          </li>

          <li className="border mt-2 border-3 border-light bg-opacity-25 border-start-0 border-end-0 rounded-end">
            <button className="nav-link d-flex text-white align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapsetwo" aria-expanded="false" aria-controls="collapsetwo">
                <span className='ms-2' style={{ fontSize: '17px' }}>Unidad 3</span>
            </button>

            <div className="collapse" id="collapsetwo">
              <div className="card card-body">

                <NavLink
                  className="nav-link text-black d-flex flex-column align-items-center" to="/gauss-seidel">
                  
                  <span className='ms-2'>Gauss Seidel</span>
                </NavLink>


                <NavLink
                  className="nav-link border-top d-flex text-black flex-column align-items-center" to="/jacobi">
                  
                  <span className='ms-2'>Jacobi</span>
                </NavLink>

                <NavLink
                    className="nav-link border-top text-black d-flex flex-column align-items-center" to="/newton-raphson">
                  
                    <span className='ms-2'>Newton Raphson</span>
                </NavLink>

              </div>
            </div>


          </li>

          <li className="border mt-2 border-3 border-light bg-opacity-25 border-start-0 border-end-0 rounded-end">
            <button className="nav-link d-flex text-white align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapsethree" aria-expanded="false" aria-controls="collapsetwo">
                <span className='ms-2' style={{ fontSize: '17px' }}>Unidad 4</span>
            </button>

            <div className="collapse" id="collapsethree">
              <div className="card card-body text-center ">

                <NavLink
                  className="nav-link text-black d-flex flex-column align-items-center" to="/trapezoid">
                  
                  <span className='ms-2'>Regla de Trapecio de Aplicación Múltiple</span>
                </NavLink>


                <NavLink
                  className="nav-link border-top d-flex text-black flex-column align-items-center" to="/simpson1-3">
                  
                  <span className='ms-2'>Regla de Simpson 1/3 de Aplicación Múltiple</span>
                </NavLink>

                <NavLink
                    className="nav-link border-top text-black d-flex flex-column align-items-center" to="/simpson1-8">
                  
                    <span className='ms-2'>Regla de Simpson 3/8</span>
                </NavLink>

                <NavLink
                    className="nav-link border-top text-black d-flex flex-column align-items-center" to="/segmentIntegrals">
                  
                    <span className='ms-2'>Regla de Boole</span>
                </NavLink>

                <NavLink
                    className="nav-link border-top text-black d-flex flex-column align-items-center" to="/segment">
                  
                    <span className='ms-2'>Regla de Integrales de Segmentos Impares</span>
                </NavLink>

              </div>
            </div>


          </li>

        </ul>


      </div>

      <div className="offcanvas-footer p-0">

      </div>


    </div >
  )
}