const calculate = (a,operation, b ) => {

    switch(operation){
      case '+':
        return (parseFloat(a)+parseFloat(b))
      case '-':
        return parseFloat(a)-parseFloat(b)
      case '*':
        return parseFloat(a)*parseFloat(b)
      case '/':
        if(parseFloat(b)!=0){
            return parseFloat(a)/parseFloat(b)
        } else{
            return 'Error'
        }

      default:
        return a
    }
  }

  const errorCatcher = (rslt) =>{
    if(rslt!='Error'){
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
    } else{
        return true
    }

  }

  const formatDecimal = (rslt) =>{
    try{
        let [intP, decP] = rslt.toString().split('.')
        if(intP.length+decP.length<=8){
          return(rslt.toString())
        } else if(intP.length<=7){
          return `${intP}.${decP.substring(0,8-intP.length)}`
        } else{
            return intP.toString()
        }
    } catch{
        return rslt
    }
  }

export {calculate, errorCatcher, formatDecimal}