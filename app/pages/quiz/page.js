"use client";
import { QuizContext } from "@/app/helpers/context/QuizProvider";
import React, { useContext, useEffect, useState } from "react";
import { fetchRequest, newTokenRequest, decodeQuizData } from "@/app/helpers";
import QuestionCard from "@/app/components/quiz/QuestionCard";
import Loading from "./loading";
import Error from "./error";

function Quiz() {
  const { categoryID, difficulty } = useContext(QuizContext);
  
  const [quizData, setQuizData] = useState();
  const [error, setError] = useState(false);
  
  const fetchQuizData = async () => {
    let token = localStorage.getItem("triviaToken");
    const quizURL = `https://opentdb.com/api.php?amount=10&category=${categoryID}&difficulty=${difficulty}&token=${token}`;
    const getQuizData = await fetchRequest(quizURL);
    await handleApiResponse(getQuizData);
  };

  const handleApiResponse = async (data) => {
    switch (data.response_code) {
      case 0:
        console.log("Success. Returned results successfully.");
        const decodedQuizData = await decodeQuizData(data);
        setQuizData(decodedQuizData);
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
          fetchQuizData();
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
    fetchQuizData();
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
