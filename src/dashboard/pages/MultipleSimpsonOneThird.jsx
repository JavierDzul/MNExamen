import { Children, useEffect, useState } from "react";
import InputForm from "../components/inputForm";
import TrapezoidMethod from "../components/TrapezoidMethod";
import Graficador from "../components/Graph";
import Graphs from "../components/Design/Graphs";
import { math } from "../../helpers/math";


export const MultipleSimpsonOneThird = ({method}) => {


    const [func, setFunc] = useState('.2 + 25*x - 200*x^2 + 675*x^3 - 900*x^4 + 400*x^5');
    const [params, setParams] = useState({})
    
  
    
    useEffect(() => {
        console.log(method);
        console.log(method.params);
        setParams({...method.params})
        console.log("Parameters: ");
        console.log(params);
        }, [func])

    return (
        <div className=" text-center ">
            
            <div className="row align-content-start ">
              <h1 id="Titulo" className="  fs-1 fw-bolder  font-monospace  mb-3" >Método de Simpson 1/3 Aplicación Multiple</h1>
            </div>
            
            <div className="contianer fluid">
                <div className="card">
                    <div className="card-body">
                        <div className="p-3"> <InputForm setFunc={setFunc}></InputForm> </div>
                        <TrapezoidMethod method={method} func={func} params={params}/>
                    </div>
                </div>
            </div>
            <div className=" justify-content-center ">
                <Graficador func={func}></Graficador>
                <Graphs func={math.compile(func)}></Graphs>
            </div>
        </div>
    );
}