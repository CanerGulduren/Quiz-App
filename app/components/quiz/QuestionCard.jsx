"use client";
import React, { useState, useEffect } from "react";
import useCounter from "@/app/helpers/hooks/useCounter";
import useAnswerSettings from "@/app/helpers/hooks/useAnswerSettings";
import NavigationButtons from "./NavigationButtons";
import AnswerList from "./AnswerList";

function QuestionCard({ quizData }) {
  const {count: questionCount, increment: nextQuestion, decrement: prevQuestion} = useCounter();
  const {count: score, increment: incraseScore} = useCounter(0, 10);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const {allAnswers, shuffleAndSetAnswers, storeSelectedAnswer} = useAnswerSettings(quizData, questionCount);


  const currentQuestion = quizData[questionCount];
  const correctAnswer = currentQuestion.correct_answer;

  const setNewQuestion = () => {
    const isThisANewQuestion = questionCount > allAnswers.length - 1 || allAnswers.length === 0;
    if(!isThisANewQuestion){ return }
    shuffleAndSetAnswers();
  }
  
  const handleAnswerClick = (answer) => {
    if(isAnswerSelected)  return;
    setIsAnswerSelected(true);
    storeSelectedAnswer(answer);

    if(answer === correctAnswer) {
      incraseScore();
    }

    const isLastQuestion = questionCount === quizData.length - 1;
    endGame(isLastQuestion, 3000);
  }

  const endGame = (condition, timer) => {
    if (condition) {
      setTimeout(() => {
        setIsQuizEnded(true);
      }, timer);
    }
  };

  const checkPreselectedAnswers = () => {
    return allAnswers[questionCount] && "selectedAnswer" in allAnswers[questionCount];
  };

  useEffect(() => {
    setNewQuestion();
    setIsAnswerSelected(checkPreselectedAnswers())
  }, [questionCount, quizData]);

  if(!allAnswers[questionCount]){
    return <p>Loading...</p>
  }

  if(isQuizEnded){
    return <Results score={score} />
  }

  return (
    <div>
      <h3>{currentQuestion.question}</h3>
      <AnswerList
        answers={allAnswers[questionCount].answers}
        selectedAnswer={allAnswers[questionCount].selectedAnswer}
        correctAnswer={correctAnswer}
        handleAnswerClick={handleAnswerClick}
      />

      <NavigationButtons
        questionCount={questionCount}
        totalQuestions={quizData.length}
        nextQuestion={nextQuestion}
        prevQuestion={prevQuestion}
      />
    </div>
  );
}

export default QuestionCard;
