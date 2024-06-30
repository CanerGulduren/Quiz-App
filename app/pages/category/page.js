import React from 'react'
import quizData from "@/app/data/quizData.json"
import CategoryCard from './CategoryCard';

function Category() {
  const categories = quizData.categories;
  
  return (
    <div>
    {categories.map((category) => {
      return(
        <CategoryCard 
        href={`/CategoryIcons/${category.name}.png`}
        title={category.name}
        key={category.id} 
        id={category.id} 
        />
      )
    })}
</div>
  )
}

export default Category