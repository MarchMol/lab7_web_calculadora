import { useState, createContext, useContext, useEffect } from 'react'

const operators = [
'+','-','*','+/-','/'
]
  

const CalcContext = createContext({ operation:'',selected: '', displayText: '',useButton: () => {}})

const CalcProvider = ({ children }) => {
  const [selected, setSelected] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [operation, setOperation] = useState('')

  useEffect(()=>{
    switch(selected){
      case 'CA':
        setDisplayText('')
        setOperation('')
        break;
      case 'CE':
        setDisplayText('')
        break;
      case '⌫':
        setDisplayText(displayText.substring(0, displayText.length - 1))
        break;
      default:
        if(operators.includes(selected)){
          setOperation(`${displayText}${selected}`)
        } else if(displayText.length<9){
          setDisplayText(`${displayText}${selected}`)
        }
    }

    setSelected('')
  },[selected])


  return (
        <CalcContext.Provider value={{ operation, selected, setSelected, displayText}}>
            {children}
        </CalcContext.Provider>
  )
}

const useCalc = () => {
  return useContext(CalcContext)
}

export default useCalc
export { CalcProvider }