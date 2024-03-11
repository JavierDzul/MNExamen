import React, { useCallback, useEffect, useState } from 'react'



const PrettyInput = ({latex}) => {
    const mj = function (tex) {
        return MathJax.tex2svg(tex, {em: 16, ex: 6, display: false});
    }

    console.log("latex previo al try", latex)

    

    const pretty = document.getElementById("pretty")

    useEffect(()=>{console.log("sdasd",latex)},[latex])

    

    try {
        MathJax.typesetClear();
        
        console.log("latex previo al mj", latex)
        
        
        
        pretty.innerHTML = ''

        pretty.appendChild(mj(latex))
        
        console.log("latex previo al mj", latex)
        //pretty = mj(latex);
        
    } catch (error) {
        
    }


  return (
    <div id="pretty">
    </div>
  )
}

export default PrettyInput