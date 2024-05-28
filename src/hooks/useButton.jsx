import { useState, createContext, useContext } from 'react'

const ButtonContext = createContext({ selected: '', useButton: () => {}})

const ButtonProvider = ({ children }) => {
  const [selected, setSelected] = useState('')

  return (
        <ButtonContext.Provider value={{ selected, setSelected}}>
            {children}
        </ButtonContext.Provider>
  )
}

const useButton = () => {
  return useContext(ButtonContext)
}

export default useButton
export { ButtonProvider }