"use client";
import { QuizContext } from "@/app/helpers/context/QuizProvider";
import React, { useContext, useEffect, useState } from "react";
import QuestionCard from "@/app/components/quiz/QuestionCard";
import { newTokenRequest, fetchRequest } from "@/app/helpers/api/request";
import Loading from "./loading";
import Error from "./error";

function Quiz() {
  const { categoryID, difficulty } = useContext(QuizContext);
  
  const [quizData, setQuizData] = useState();
  const [error, setError] = useState(false);
  
  const getQuizData = async () => {
    let token = localStorage.getItem("triviaToken");
    const quizURL = `https://opentdb.com/api.php?amount=10&category=${categoryID}&difficulty=${difficulty}&type=multiple&token=${token}`;
    const getQuizData = await fetchRequest(quizURL);
    await UrlResponse(getQuizData);
  };

  const UrlResponse = async (url) => {
    switch (url.response_code) {
      case 0:
        console.log("Success. Returned results successfully.");
        setQuizData(url.results);
        break;
      case 1:
      case 2:
        console.log("The API doesn't have enough questions for your query or arguements passed in aren't valid");
        setError(true);
        break;
      case 3: 
      case 4:
        console.log("Token is Empty or Not Found.");
        const newToken = await newTokenRequest();
        localStorage.setItem("triviaToken", newToken);  
        setTimeout(() => {
          getQuizData();
        }, 5000);
        break;
      case 5:
        console.log("Too Many Request.");
        setError(true);
        break;
      default:
        console.log("Something went wrong.");
        setError(true);
        break;
    }
  };
  
  useEffect(() => {
    getQuizData();
  }, []);


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
