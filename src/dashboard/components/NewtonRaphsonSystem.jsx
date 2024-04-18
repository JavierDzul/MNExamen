import { useEffect, useState } from "react";
import { fromLatex } from '../../helpers/math'
import { create, all } from 'mathjs';

const math = create(all)
math.import({ln: math.log})

export default function NewtonRaphsonSystem({ method, func, params, setParams }) {
  const [handleParams, setHandleParams] = useState(params)
  const [parsedFunc, setParsedFunc] = useState([])
  const [results, setResults] = useState([])
  const [finalResult, setFinalResult] = useState(false)

  let rows = []

  useEffect(() => {
    let all = true
    method.params.map(param => all = all ? (handleParams[param] ? true : false) : false)
    if(all) calculate()
  }, [params])

  useEffect(() => {
    console.log(func)
    const newFunc = func.split(',')
    setParsedFunc(newFunc)
    console.log(parsedFunc)
  }, [func])

  function calculate() {
    if (rows.length == 0) {
      console.log(params)
      const first = {...methodFunc(params), i: 0}
      rows.push(first)
      setResults(rows)
      return calculate()
    }
    if(rows.length > 100) return
    const last = rows[rows.length-1]
    if(Math.abs(last.ex) > Math.abs(handleParams.e) || Math.abs(last.ey) > Math.abs(handleParams.e)) {
      const newData = {...methodFunc({...last, e:handleParams.e, f: handleParams.f}), i: rows.length}
      rows.push(newData)
      return calculate()
    }
    else {
      setResults(rows)
      setFinalResult(rows[rows.length-1].result)
    }
  }

  function methodFunc({ x0, y0 }) {
    const params = { x: x0, y: y0 }

    const dux = math.derivative(parsedFunc[0], 'x').evaluate(params)
    const dvx = math.derivative(parsedFunc[1], 'x').evaluate(params)

    const duy = math.derivative(parsedFunc[0], 'y').evaluate(params)
    const dvy = math.derivative(parsedFunc[1], 'y').evaluate(params)

    const jacob = (dux*dvy)-(dvx*duy)

    const u = math.evaluate(parsedFunc[0], { x: x0, y: y0 })
    const v = math.evaluate(parsedFunc[1], { x: x0, y: y0 })
    console.log(u, v)

    const x11 = x0 - (u*dvy - v*duy)/jacob
    const y11 = y0 - (v*dux - u*dvx)/jacob

    const ex = (x11-x0)/x11 * 100
    const ey = (y11-y0)/y11 * 100

    return { ex, ey, xi: x0, yi: y0, x0: x11, y0: y11 }
  }

  const handleChange = (e) => {
    const { value } = e.target
    console.log(value)
    console.log("-----")
    setHandleParams( {...handleParams, [e.target.id]: value})
    //setHandleParams({...handleParams, [e.target.id]: Number(value) || value})
    console.log("target id : " + e.target.id)
    console.log("handle params : " + handleParams)
    console.log(handleParams)
    console.log(value)
  }

  return(
    <>
      <p>{ parsedFunc[0] }, { parsedFunc[1] }</p>
      <div>
        {method.params.map(param => param !== "f" ? <div key={param}>
            <div className="row" id={param}>
              <div className=" input-group " id={param}>
                <span className=" input-group-text " htmlFor={param}>{param}</span>
                <input className=" form-control " onChange={handleChange} id={param} type="text" name="" value={handleParams[param]?.toString() || ""} />
                {console.log(handleParams[param])}
              </div>
            </div>
          </div> : null)}
      </div>
      <button className=" btn  btn-primary m-3  " type="button" onClick={() => {
        let all = true
        method.params.map(param => all = all ? (handleParams[param] ? true : false) : false)
        if(all) setParams({...handleParams, f: func})
        else alert('Se deben ingresar todos los parámetros')
      }}>Calcular</button>
      <div className=" container-fluid " id="table-container">
        <table className=" table ">
          <thead>
            <tr>
              {method.columns.map(column => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {results.map(result => <tr key={Math.random()}>
                { method.columns.map(column => <td key={Math.random()}>{result[column]}</td>) }
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </>
  )
}