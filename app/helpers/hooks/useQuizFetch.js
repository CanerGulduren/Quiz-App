"use client"
import {useState, useEffect} from "react";
import { fetchRequest, decodeQuizData, newTokenRequest } from "@/app/helpers";

const useQuizFetch = (url) => {
    const [quizData, setQuizData] = useState(null);
    const [error, setError] = useState(false);

    const fetchQuizData = async () => {
        const getQuizData = await fetchRequest(url);
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

      return { quizData, error };
}

export default useQuizFetch;
