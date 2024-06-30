"use client"
import React, {createContext, useState} from 'react'

export const QuizContext = createContext(null)

const QuizProvider = ({children}) => {
    const [categoryID, setCategoryID] = useState();
    const [difficulty, setDifficulty] = useState();
  return (
    <QuizContext.Provider 
    value={{categoryID, difficulty, setCategoryID, setDifficulty}}
    >
      {children}
    </QuizContext.Provider>
  )
}

export default QuizProvider