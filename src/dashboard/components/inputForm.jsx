import React, { useEffect, useState } from 'react'
import PrettyInput from './PrettyInput';
import Result from './Result';
import { ErrorMessage } from 'formik';

const InputForm = () => {

    
    let inicial;
//    MathJax.typesetClear();
    let lat;
    let parenthesis = 'keep'
    let implicit = 'hide'
    
    //'sqrt(75 / 3) + det([[-1, 2], [3, 1]]) - sin(pi / 4)^2'
    
    const [node, setNode] = useState(math.parse('sqrt(75 / 3) + det([[-1, 2], [3, 1]]) - sin(pi / 4)^2'))
    const [latex, setLatex] = useState(node ? node.toTex({parenthesis: parenthesis, implicit: implicit}) : '')
    const [inputExpressionText, setInputExpressionText, ] = useState(initial);
    
    function initial(){
      //setNode(math.parse('sqrt(75 / 3) + det([[-1, 2], [3, 1]]) - sin(pi / 4)^2'))
      setLatex(node ? node.toTex({parenthesis: parenthesis, implicit: implicit}) : '') ;
      console.log('Node en estado inicial:', node)
      console.log('LaTeX en estado inicial:', latex)
      
      return 'sqrt(75 / 3) + det([[-1, 2], [3, 1]]) - sin(pi / 4)^2';
    }

    useEffect(() => {
      //OnInput();
    },[inputExpressionText,])

    
  
  
  

    

const OnInput = function () {
  
  console.log(inputExpressionText);
  inicial = document.getElementById("input")

  try {
    console.log("antes de node initial", inicial.value);
    console.log("antes de node", node);
    setNode(math.parse(inicial.value));
    console.log("después de node", node);
    
  }
  catch (err) {
    console.log("No entro a node = math",   )
    console.log(err.toString())
  }

  try {
    console.log("node previo al latexx",node)
    // export the expression to LaTeX
    setLatex(node ? node.toTex({parenthesis: parenthesis, implicit: implicit}) : '') ;
    console.log('LaTeX expression dentro de funcion:', latex)

    // display and re-render the expression
    
  }
  catch (err) {
  }
  console.log("lates en fuera del try-catch",latex)
}
  console.log("lates xfinal",latex)
  console.log("inputExpressionText ", inputExpressionText)
    return (
        <table className=' table  justify-content-between  '>
          <tbody>
              <tr>
                  <th>Expresión a Resolver</th>
                  <td><input type="text"  onInput={(e) =>{
                          setInputExpressionText(e.target.value);
                          OnInput()
                        }} id="input" value={inputExpressionText}/></td>
              </tr>
              <tr>
                  <th>Como se ve la Expresión</th>
                  {console.log("latex previo a prettyInput",latex)}
                  <td><PrettyInput latex={latex}/></td>
              </tr>
              <tr>
                  <th>Result</th>
                  {console.log("node previo a result",node)}
                  <td><Result input={node} /></td>
              </tr>
          </tbody>
        </table>
        
    )
}

export default InputForm