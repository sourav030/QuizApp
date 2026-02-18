import React, { useContext, useEffect } from 'react'
import Navbar from '../component/Navbar'
import Quiz from '../component/Quiz'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
  // Context se data aur function fetch karna
  const { fetchQuiz, quiz } = useContext(AuthContext);

  useEffect(() => {
    fetchQuiz();
  }, []);



  return (
    <div className="bg-gray-50 min-h-screen">

      {/* {
        !quiz? <p>Loading</p> : <p>hello</p>
      } */}
      Grid layout taaki cards acche se align hon
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(quiz) && quiz.length > 0 ? (
          quiz
            .filter(item => item && item._id)   // ⭐ KEY FIX
            .map(item => (
              <Quiz
                key={item._id}
                data={item}
              />
            ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Loading quizzes...
          </p>
        )}

      </div>
    </div>
  )
}

export default Home