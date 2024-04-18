import { Children } from "react";


export const Jacobi = ({Children}) => {


    return (
        <div className=" text-center ">
            <div className="row align-content-start ">
              <h1 id="Titulo" className="  fs-1 fw-bolder  font-monospace  mb-3" >JACOBI</h1>
            </div>
            
            <div className="contianer fluid">
                <div className="card">
                    <div className="card-body">
                        {Children}
                    </div>
                </div>
            </div>

        </div>
    );
}