import mathApp from "../../helpers/math"

export const StartForm = ({children}) => {
  return (
    <div className="">
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
                  <div className="card-body  p-2  m-4">
                  {children}
                  <h3>Métodos</h3>
                  <div className="row row-cols-4 ">
                    <div className="col">
                        <button className=" btn-outline-primary ">Bisección</button>
                    </div>
                    <div className="col">
                      <button className=" btn-outline-primary ">Regla Falsa</button>
                    </div>
                    <div className="col">
                    <button className=" btn-outline-primary ">Newton Graphson</button>
                    </div>
                    <div className="col">

                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>


  )
}
