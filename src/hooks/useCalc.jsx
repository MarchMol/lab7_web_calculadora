import { useState, createContext, useContext, useEffect } from 'react'
import * as logic from './calcLogic.js'
const operators = [
'+','-','*','/'
]

const CalcContext = createContext({ operation:'',selected: '', setSelected:()=>{}, displayText:''})

const CalcProvider = ({ children }) => {
  const [selected, setSelected] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [operation, setOperation] = useState('')
  const [rewrite, setRewrite] = useState(false)

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
        if(!['Error','','NaN'].includes(displayText)){
          setDisplayText(displayText.substring(0, displayText.length - 1))
        }
        break;
      case '+/-':
        if(!['Error','','NaN'].includes(displayText)){
          var tem = parseFloat(displayText);
          if(!logic.errorCatcher(parseFloat(`1${displayText}`))){
            if((-tem).toString().length>9){
              setDisplayText(logic.formatDecimal(-tem))
            } else{
              setDisplayText((-tem).toString())
            }
          } else {
            setDisplayText('Error')
          }

        }
        break;
      case '=':
        if(operation.length!=0){
          let rslt = logic.calculate(
            operation.substring(0, operation.length - 1),
            operation.substring(operation.length - 1, operation.length),
            displayText
          )
          if(!logic.errorCatcher(rslt)){
            if(rslt.toString().length>9){
              setDisplayText(logic.formatDecimal(rslt))
            } else{
              setDisplayText(rslt.toString())
            }
          } else {
            setDisplayText('Error')
          }
          setOperation('')
          setRewrite(true)
        }

        break;
      default:
        if(!['Error','NaN'].includes(displayText)){
          if(operators.includes(selected)){
            if(displayText===''){
              setOperation(`0${selected}`)
            
            }else if(operation===''){
              setOperation(`${displayText}${selected}`)
            }else{
              let rslt = logic.calculate(
                operation.substring(0, operation.length - 1),
                operation.substring(operation.length - 1, operation.length),
                displayText
              )
              if(!logic.errorCatcher(rslt)){
                if(rslt.toString().length>9){
                  setOperation(`${logic.formatDecimal(rslt)}${selected}`)
                } else{
                  setOperation(`${rslt.toString()}${selected}`)
                }
              } else {
                setDisplayText('Error')
              }
            }
            setRewrite(true)
          } else if(rewrite || displayText.length<9){
            if(rewrite && selected!=''){
              setDisplayText(selected)
              setRewrite(false)
            } else{
              setDisplayText(`${displayText}${selected}`)
            }
          }
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
export { CalcProvider, CalcContext }

