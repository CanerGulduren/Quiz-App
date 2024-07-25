import React from 'react';
import styles from "@/style/components/quiz/card.module.scss";

function AnswerList({ answers, selectedAnswer, correctAnswer, handleAnswerClick }) {
  return (
    <ol type="A">
      {answers.map((answer, index) => (
        <li
          onClick={() => handleAnswerClick(answer)}
          key={index}
          className={
            selectedAnswer && answer === selectedAnswer
              ? selectedAnswer === correctAnswer ? styles.correctAnswer : styles.falseAnswer
              : ""
          }
        >
          {answer}
        </li>
      ))}
    </ol>
  );
}

export default AnswerList;
