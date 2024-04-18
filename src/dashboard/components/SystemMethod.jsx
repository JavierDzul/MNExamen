import { useState } from 'react'
import { create, all } from 'mathjs';
const math = create(all)
math.import({ln: math.log})

export const SystemMethod = ( {method, params, setParams}) => {
  const [handleParams, setHandleParams] = useState(params)

  const [matrix1, setMatrix1] = useState([[],[],[]])

  const [results, setResults] = useState([])
  const [finalResult, setFinalResult] = useState(false)
  
  let rows = []
  
  function onChange(e, matrix, index) {
    matrix[index] = Number(e.target.value)
  }

  function order() {
    let ordered = matrix1.sort((a, b) => Math.abs(a[0]) < Math.abs(b[0]) ? 1 : -1)
    const row1 = ordered[0]
    ordered = ordered.slice(1).sort((a, b) => Math.abs(a[1]) < Math.abs(b[1]) ? 1 : -1)
    const row2 = ordered[0]
    const row3 = ordered[1]

    return [row1, row2, row3]
  }


  function calculate() {
    const ordered = order()
    console.log(ordered)
    const x1 = `(${ordered[0][3]} + (${ordered[0][1]*-1}x2) + (${ordered[0][2]*-1}x3))/${ordered[0][0]}`
    const x2 = `(${ordered[1][3]} + (${ordered[1][0]*-1}x1) + (${ordered[1][2]*-1}x3))/${ordered[1][1]}`
    const x3 = `(${ordered[2][3]} + (${ordered[2][0]*-1}x1) + (${ordered[2][1]*-1}x2))/${ordered[2][2]}`
    //console.log(math.derivative('2x+2x*y', 'x').toString())
    //params = {...params, x1, x2, x3}
    params.x1 = x1
    params.x2 = x2
    params.x3 = x3

    

    if (rows.length == 0) {
      console.log(params)
      const first = {...method.func(params), i: 0}
      rows.push(first)
      setResults(rows)
      return calculate()
    }
    if(rows.length > 100) return
    const last = rows[rows.length-1]
    if(Math.abs(last.ex1) > Math.abs(handleParams.e) || Math.abs(last.ex2) > Math.abs(handleParams.e) || Math.abs(last.ex3) > Math.abs(handleParams.e)) {
      const newData = {...method.func({...last, e:params.e, f: params.f}), i: rows.length}
      rows.push(newData)
      return calculate()
    }
    else {
      setResults(rows)
      setFinalResult(rows[rows.length-1].result)
    }
  }

    

  const handleChange = (e) => {
    const { value } = e.target
    setHandleParams({...handleParams, [e.target.id]: Number(value) || value})
    console.log(handleParams)
    console.log(handleParams.e)
    console.log("error : "+value)
    console.log(params.e)
  }

  return(
    <>
    
      <div className=' container-fluid '>
        <div className=" row ">
          <div className=" input-group  mb-3">
            <input type="number" className=" form-control" step="1" name="" value={matrix1[0][0]} onChange={ e => onChange(e, matrix1[0], 0) } />
            <span className=' input-group-text '>x1</span>
            <span className=' input-group-text '>+</span>
          
          
            <input className=' form-control' type="number" step="1" name="" value={matrix1[0][1]} onChange={ e => onChange(e, matrix1[0], 1) } />
            <span className=' input-group-text '>x2</span>
            <span className=' input-group-text '>+</span>
          
          
            <input className=' form-control' type="number" step="1" name="" value={matrix1[0][2]} onChange={ e => onChange(e, matrix1[0], 2) } />
            <span className=' input-group-text '>x3</span>
            <span className=' input-group-text '>=</span>
          
          
            <input className='form-control' type="number" step="1" name="" value={matrix1[0][3]} onChange={ e => onChange(e, matrix1[0], 3) } />
          </div>
        </div>
        <div className="row">
          <div className=' input-group mb-3'>
            <input className=' form-control'  type="number" step="1" name="" value={matrix1[1][0]} onChange={ e => onChange(e, matrix1[1], 0) } />
            <span className=' input-group-text '>x1</span>
            <span className=' input-group-text '>+</span>

            <input className=' form-control'  type="number" step="1" name="" value={matrix1[1][1]} onChange={ e => onChange(e, matrix1[1], 1) } />
            <span className=' input-group-text '>x2</span>
            <span className=' input-group-text '>+</span>
         
            <input className=' form-control'  type="number" step="1" name="" value={matrix1[1][2]} onChange={ e => onChange(e, matrix1[1], 2) } />
            <span className=' input-group-text '>x3</span>
            <span className=' input-group-text '>=</span>
          
            <input className=' form-control'  type="number" step="1" name="" value={matrix1[1][3]} onChange={ e => onChange(e, matrix1[1], 3) } />
          </div>
        </div>
        <div className="row">
          <div className=' input-group mb-3'>
            <input className=' form-control' type="number" step="1" name="" value={matrix1[2][0]} onChange={ e => onChange(e, matrix1[2], 0) } />
            <span className=' input-group-text '>x1</span>
            <span className=' input-group-text '>+</span>
          
            <input className=' form-control'  type="number" step="1" name="" value={matrix1[2][1]} onChange={ e => onChange(e, matrix1[2], 1) } />
            <span className=' input-group-text '>x2</span>
            <span className=' input-group-text '>+</span>
          
            <input className=' form-control'  type="number" step="1" name="" value={matrix1[2][2]} onChange={ e => onChange(e, matrix1[2], 2) } />
            <span className=' input-group-text '>x3</span>
            <span className=' input-group-text '>=</span>
          
            <input className=' form-control'  type="number" step="1" name="" value={matrix1[2][3]} onChange={ e => onChange(e, matrix1[2], 3) } />
          </div>
        </div>
        <div className="row">
          <div className=' input-group mb-3'>
            <span className=' input-group-text '>error</span>
            <input className=' form-control' id={'e'} type="text" value={handleParams['e']?.toString() || ""} onChange={handleChange} />
            
          
          </div>
        </div>
      </div>
      <button className="btn btn-primary   " type="" onClick={ e => calculate() }> Calcular </button>
      <div className='container-fluid'>
      <table className=' table '>
          <thead>
            <tr>
              {method.columns.map(column => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {results.map(result => <tr key={Math.random()}>
            { method.columns.map(column => <td key={result[column]+Math.random()}>{result[column]}</td>) }
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default SystemMethod