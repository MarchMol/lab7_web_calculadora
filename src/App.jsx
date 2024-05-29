import React from 'react'
import './App.css'
import Calculator from '@calculator/Calculator.jsx'
import { CalcProvider } from '@hooks/useCalc.jsx'


function App() {  
  return (
    <CalcProvider>
      <Calculator />
    </CalcProvider>
  )
}

export default App
