

export const StartForm = ({children}) => {
  return (
    <div className=" justify-content-center ">
        <div className="card">
          <div className=" card-body ">
            <div className=" row">
              <h1 id="Titulo" className="  fs-1 fw-bold  font-monospace  mb-3 " >Métodos Numéricos</h1>
            </div>
            <h2>UNIDAD 2</h2>
            <h4 className=" m-3 ">Bisección - Regla Falsa - Newton Raphson - Secante</h4>
            <div className="row">
              
              <div className="col">
                <div className="card p-4 ">
                  <div className="card-body justify-content-center  p-2  m-4">
                  {children}
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>


  )
}
