"use client"
import { useState } from 'react';

function useCounter(initialValue = 0, updatedNumberValue = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + updatedNumberValue);
  const decrement = () => setCount(count - updatedNumberValue);

  return { count, increment, decrement };
}

export default useCounter;
