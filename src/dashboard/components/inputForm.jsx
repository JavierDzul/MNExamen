import React, { useState } from 'react'
import { addStyles, EditableMathField } from 'react-mathquill'
import { fromLatex, calculateFromText } from '../../helpers/math'
import { StaticMathField } from 'react-mathquill';

addStyles();

const InputForm = ({setFunc}) => {

    
  const [latex, setLatex] = useState('x^{2}+xy-10,y+3xy^{2}-57')
  const [result, setResult] = useState(0)
    
  const calculate = () => {
    const text = fromLatex(latex)
    const result = calculateFromText(text, 2)
    setResult(result)
  }

    return (
      <>
        <div className=' card '>
            <div className=' card-body '>
              <EditableMathField latex={latex} onChange={(mathField) => {setLatex(mathField.latex())}}/>
            </div>
            
            <button className=' btn-primary ' onClick={() => setFunc(fromLatex(latex))}>Enter</button>
        </div>
       </>
    )
}

export default InputForm