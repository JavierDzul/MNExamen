import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import MathJax from 'react-mathjax'


ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <MathJax.Provider>
    <HashRouter>
      <App />
    </HashRouter>
  </MathJax.Provider>
  
  //</React.StrictMode>,
)
