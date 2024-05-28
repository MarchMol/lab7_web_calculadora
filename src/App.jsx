import React from 'react'
import './App.css'
import Calculator from './Calculator.jsx'
import { ButtonProvider } from './hooks/useButton.jsx'


function App() {  
  return (
    <ButtonProvider>
      <Calculator />
    </ButtonProvider>
  )
}

export default App
