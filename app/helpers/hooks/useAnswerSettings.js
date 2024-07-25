import { useState } from "react";
import { shuffleAnswers } from "@/app/helpers";

function useAnswerSettings(quizData, questionCount) {
  const [allAnswers, setAllAnswers] = useState([]);

  const shuffleAndSetAnswers = () => {
    const answers = shuffleAnswers([
      ...quizData[questionCount].incorrect_answers,
      quizData[questionCount].correct_answer,
    ]);
    setAllAnswers((prevQuestion) => [...prevQuestion, { answers }]);
  };

  const storeSelectedAnswer = (answer) => {
    setAllAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionCount] = {
        ...updatedAnswers[questionCount],
        selectedAnswer: answer,
      };
      return updatedAnswers;
    });
  };  

  return {
    allAnswers,
    storeSelectedAnswer,
    shuffleAndSetAnswers
  };
}

export default useAnswerSettings;
