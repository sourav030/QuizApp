import React, { useContext, useEffect } from 'react';
import Navbar from '../component/Navbar';
import Quiz from '../component/Quiz';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { fetchQuiz, quiz } = useContext(AuthContext);

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      

      {/* --- Hero Section --- */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Ready to test your <span className="text-blue-600">Skills?</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from a variety of quizzes and challenge yourself. 
            Improve your knowledge one question at a time.
          </p>
        </div>
      </div>

      {/* --- Quiz Grid Section --- */}
      <main className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Available Quizzes</h2>
          <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
            {quiz?.length || 0} Quizzes Found
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.isArray(quiz) && quiz.length > 0 ? (
            quiz
              .filter(item => item && item._id)
              .map(item => (
                <div key={item._id} className="transform transition duration-300 hover:-translate-y-2">
                   <Quiz data={item} />
                </div>
              ))
          ) : (
            /* --- Loading State Skeleton --- */
            <div className="col-span-full flex flex-col items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-500 text-lg font-medium italic">
                Fetching the best quizzes for you...
              </p>
            </div>
          )}
        </div>
      </main>
      
    </div>
  );
};

export default Home;