"use client"
import React, {useContext} from 'react'
import Image from 'next/image'
import { QuizContext } from '@/app/helpers/context/QuizProvider';
import { useRouter } from 'next/navigation';

function CategoryCard({href, title, id}) {
  const {setCategoryID} = useContext(QuizContext);
  const router = useRouter();

  const changeCategory = () => {
    const categoryID = id.toString();
    setCategoryID(categoryID);
    router.push("/pages/difficulty")
  }

  return (
    <div onClick={changeCategory}>
        <Image 
        src={href} 
        alt={`${title} icon`}
        width={100} 
        height={100} 
        />
        <h5>{title}</h5>
    </div>
  )
}

export default CategoryCard