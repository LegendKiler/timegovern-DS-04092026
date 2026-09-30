import { createContext, useContext, useState, useCallback } from 'react'

const CalculationContext = createContext()

export function CalculationProvider({ children }) {
  const [currentCalc, setCurrentCalc] = useState(null)

  const registerCalculation = useCallback((calc) => {
    setCurrentCalc(calc)
  }, [])

  const clearCalculation = useCallback(() => {
    setCurrentCalc(null)
  }, [])

  return (
    <CalculationContext.Provider value={{ currentCalc, registerCalculation, clearCalculation }}>
      {children}
    </CalculationContext.Provider>
  )
}

export const useCalculation = () => useContext(CalculationContext)