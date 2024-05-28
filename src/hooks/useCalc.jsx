import { useState, createContext, useContext, useEffect } from 'react'

const operators = [
'+','-','*','/'
]
  
const calculate = (a,operation, b ) => {

  switch(operation){
    case '+':
      return (parseFloat(a)+parseFloat(b))
    case '-':
      return parseFloat(a)-parseFloat(b)
    case '*':
      return parseFloat(a)*parseFloat(b)
    case '/':
      return parseFloat(a)/parseFloat(b)
    default:
      return a
  }
}

const errorCatcher = (rslt) =>{
  if(rslt.toString().length>9){
    return true
  } else if(rslt<0){
    return true
  } else{
    return false
  }
}


const CalcContext = createContext({ operation:'',selected: '', displayText: '',useButton: () => {}})

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
          setDisplayText((-tem).toString())
        }
        break;
      case '=':
        var rslt = calculate(
          operation.substring(0, operation.length - 1),
          operation.substring(operation.length - 1, operation.length),
          displayText
        )
        if(!errorCatcher(rslt)){
          setDisplayText(rslt.toString())
        } else{
          setDisplayText('Error')
        }
        setOperation('')
        setRewrite(true)
        break;
      default:
        if(!['Error','NaN'].includes(displayText)){
          if(operators.includes(selected)){
            setOperation(`${displayText}${selected}`)
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
export { CalcProvider }