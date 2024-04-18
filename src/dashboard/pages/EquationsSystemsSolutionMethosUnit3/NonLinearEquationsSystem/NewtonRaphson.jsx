import { Children, useEffect, useState } from "react";
import InputForm from "../../../components/inputForm";
import NewtonRaphsonSystem from "../../../components/NewtonRaphsonSystem";


export const NewtonRaphson = ({method}) => {

    const [func, setFunc] = useState('(e^(-x))-x,x^2')
    const [params, setParams] = useState({})

    useEffect(() => {
    setParams({...params, f: func})
    }, [func])


    return (
        <div className=" text-center ">
            
            <div className="row align-content-start ">
              <h1 id="Titulo" className="  fs-1 fw-bolder  font-monospace  mb-3" >Newton - Raphson</h1>
            </div>
            
            <div className="contianer fluid">
                <div className="card">
                    <div className="card-body">
                        <div className=" p-3 ">
                            <InputForm setFunc={setFunc}></InputForm>
                        </div>
                        <NewtonRaphsonSystem params={params} setParams={setParams} method={method} func={func}/>
                    </div>
                </div>
            </div>

        </div>
    );
}