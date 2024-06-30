"use client"
import { QuizContext } from '@/app/helpers/context/QuizProvider'
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

const difficultyButtons = ["Easy", "Medium", "Hard"]

function Difficulty() {
  const {setDifficulty} = useContext(QuizContext);
  const router = useRouter();

  const changeDifficulty = (button) => {
    const difficulty = button.charAt(0).toLowerCase() + button.slice(1);
    setDifficulty(difficulty);
    router.push("/pages/quiz")
  }

  return (
    <>
    <ul>
      {difficultyButtons.map((button, index) => {
        return <li key={index} onClick={ () => changeDifficulty(button)}> {button} </li>
      })}
    </ul>
    </>
  )
}

export default Difficulty