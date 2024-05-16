import { useState, useEffect } from 'react'
import Graficador from './Graph'


export default function TrapezoidMethod({ method, func, params }) {
  const [handleParams, setHandleParams] = useState({n: 2 , x0:0, xn:4  })
  const [results, setResults] = useState(0)
  const [valorVerdadero, setValorVerdadero] = useState(0);
  const [error, setError] = useState(0)
  

  useEffect(() => {
    console.log(params)
    console.log(func)
    console.log(handleParams)
    
  }, [params])

  const calculate = () => {
    if(valorVerdadero == 0){
      
    }
    else{
      setResults(method.func({f: func,...handleParams}));
      console.log("resultados")
      console.log(results)
      setError(((valorVerdadero-results)/valorVerdadero)*100)
    }
    
  }

  const change = (e) => {
    setValorVerdadero(e.target.value)
  }

  const handleChange = (e) => {
    const { value } = e.target
    setHandleParams({...handleParams, [e.target.id]: parseFloat(value) || value})
    console.log(value)
    
  }

  

  return(
    <>
      <div className='row'>
        {method.params.map(param => param !== "f" ? <div className='col' key={param}>
            <div className="row" id={param}>
              <div className=" input-group " id={param}>
                <span className=" input-group-text " htmlFor={param}>{param}</span>
                <input className=" form-control " onChange={handleChange} id={param} type="text" name="" value={handleParams[param]?.toString() || ""} />
                {console.log(handleParams[param])}
              </div>
            </div>
          </div> : null)}
          <div className="col">
              <div className=" input-group ">
                <span className=" input-group-text "> Valor Verdadero</span>
                <input className=" form-control " onChange={change}  />
                {console.log(valorVerdadero)}
              </div>
      </div>
      </div>
      
      <button className="m-3 btn btn-primary   " type="" onClick={ e => calculate() }> Calcular </button>
      {results ? 
        <div className=" row" >
          <div className='col'>
            <div className='input-group'>
              <span className=' input-group-text'>Resultado</span>
              <input className=' form-control' readOnly={true} contentEditable={false} value={results} ></input>
            </div>
          </div>
          {valorVerdadero != -1 ?
          <div className='col'>
          <div className='input-group'>
            <span className=' input-group-text'>Error</span>
            <input className=' form-control' readOnly={true} contentEditable={false} value={error} ></input>
          </div>
        </div>
        :
        <></>
        } 
          
      </div>
      :
      <></>

      }

    </>
  )
}