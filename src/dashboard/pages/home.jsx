
import { useState, useEffect } from 'react'


import Metodo from '../components/metodo'
import InputForm from "../components/inputForm"
import { StartForm } from "../components/startForm"
import DashboardLayout from "../layouts/dashboardLayout"
import { metodos } from '../../helpers/math.js'

export const HomePage = () => {

  const [func, setFunc] = useState('x^{3}-x-1')
  const [selection, setSelection] = useState(-1)
  const [params, setParams] = useState({})//useState({f: func, ai: 0, bi: 1, e: 0.05})

  useEffect(() => {
    setParams({...params, f: func})
  }, [func])
  
    return (
      
      <DashboardLayout>
        <StartForm>

            <InputForm setFunc={setFunc} />
              <div id="method">
                {selection === -1 ? metodos.map((metodos, index) => <div key={metodos.name}>
                <button type="" onClick={() => setSelection(index)}>{metodos.name}</button>
              </div>) : <div>
                <button onClick={() => setSelection(-1)}>Volver al menú</button>
                <Metodo params={params} setParams={setParams} method={metodos[selection]} func={func} />
              </div>}
            </div>
      
        </StartForm>
      </DashboardLayout>
      
      
  
  
    )
  }