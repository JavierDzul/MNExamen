export const Navbar = () => {
    return (
      <nav className="navbar navbar-expand fixed-top shadow-sm bg-primary " >
          <div className="container-fluid">
  
          <a className="d-lg-none" data-bs-toggle="offcanvas" href="#offcanvasExample" aria-controls="offcanvasExample">
              <i className="fa-solid fa-bars"></i>
          </a>
  
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
  
  
  
   
          <div className="collapse navbar-collapse  justify-content-between  " id="navbarSupportedContent">
            <h6 className="text-light text-end fw-bold  ">Equipo??</h6>
            <h1 id="Titulo" className=" text-center  text-light fs-1 fw-bolder  font-monospace mt-2" > Métodos Numéricos </h1>
            <h6 className="text-light text-end  fw-bold ">Grupo A</h6>
          </div>
  
  
  
          </div>
      </nav>
    )
  }