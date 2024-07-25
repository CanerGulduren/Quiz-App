"use client";
import { QuizContext } from "@/app/helpers/context/QuizProvider";
import React, { useContext } from "react";
import useQuizFetch from "@/app/helpers/hooks/useQuizFetch"
import QuestionCard from "@/app/components/quiz/QuestionCard";
import Loading from "./loading";
import Error from "./error";

function Quiz() {
  const { categoryID, difficulty } = useContext(QuizContext);
  let token = localStorage.getItem("triviaToken");
  const { quizData, error } = useQuizFetch(`https://opentdb.com/api.php?amount=10&category=${categoryID}&difficulty=${difficulty}&token=${token}`);

  if(error){
    return <Error />
  }

  if(!quizData){
    return <Loading />
  } 
  
  return (
    <div>
      <QuestionCard quizData={quizData} />
    </div>
  );
  }


export default Quiz;
