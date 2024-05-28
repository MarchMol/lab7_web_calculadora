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
  if(Number.isInteger(rslt)){
    if(rslt.toString().length>9){
      return true
    }
  } else{
    let [intP, decP] = rslt.toString().split('.')
    if(intP.length+decP.length>9 && intP.length>7){
      return true
    }
  }
  if(rslt<0){
    return true
  } else{
    return false
  }
}
const formatDecimal = (rslt) =>{
  let tem = ''
  let [intP, decP] = rslt.toString().split('.')
  if(intP.length+decP.length<=8){
    tem = rslt
  } else if(intP.length<=7){
    tem = `${intP}.${decP.substring(0,8-intP.length)}`
    console.log(intP, decP.substring(0,8-intP.length))
  } 
  console.log(intP, decP)
  return tem.toString()
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
          if(!errorCatcher(parseFloat(`1${displayText}`))){
            if((-tem).toString().length>9){
              setDisplayText(formatDecimal(-tem))
            } else{
              setDisplayText((-tem).toString())
            }
          } else {
            setDisplayText('Error')
          }

        }
        break;
      case '=':
        let rslt = calculate(
          operation.substring(0, operation.length - 1),
          operation.substring(operation.length - 1, operation.length),
          displayText
        )
        if(!errorCatcher(rslt)){
          if(rslt.toString().length>9){
            setDisplayText(formatDecimal(rslt))
          } else{
            setDisplayText(rslt.toString())
          }
        } else {
          setDisplayText('Error')
        }
        setOperation('')
        setRewrite(true)
        break;
      default:
        if(!['Error','NaN'].includes(displayText)){
          if(operators.includes(selected)){
            if(displayText===''){
              setOperation(`0${selected}`)
            }else if(operation===''){
              setOperation(`${displayText}${selected}`)
            }else{
              let rslt = calculate(
                operation.substring(0, operation.length - 1),
                operation.substring(operation.length - 1, operation.length),
                displayText
              )
              if(!errorCatcher(rslt)){
                if(rslt.toString().length>9){
                  setOperation(`${formatDecimal(rslt)}${selected}`)
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
export { CalcProvider }