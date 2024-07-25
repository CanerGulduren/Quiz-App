import React from 'react';

function NavigationButtons({ questionCount, totalQuestions, nextQuestion, prevQuestion }) {
  return (
    <div>
      <button
        onClick={prevQuestion}
        disabled={questionCount === 0}
      >
        Backward
      </button>
      <button
        onClick={nextQuestion}
        disabled={questionCount === totalQuestions - 1}
      >
        Forward
      </button>
    </div>
  );
}

export default NavigationButtons;
