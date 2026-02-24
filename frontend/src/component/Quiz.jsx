import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Quiz = ({ data }) => {

  const { question, setQuestion } = useContext(AuthContext)

  const getQuestion = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/user/getquestion/${data._id}`
      );
      console.log(res.data)
      setQuestion(res.data.allQuestion); // adjust based on backend response
    } catch (error) {
      console.error("Failed to fetch questions", error);
    }
  }

  return (
    <div className='group relative bg-white p-6 flex flex-col items-center text-center shadow-sm hover:shadow-2xl rounded-3xl border border-gray-100 transition-all duration-300 ease-in-out hover:-translate-y-2 overflow-hidden'>

      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300"></div>

      {/* Badge / Icon Section */}
      <div className="relative mb-4">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-20 h-20 flex items-center justify-center rounded-2xl shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300 text-2xl font-black tracking-wider">
          {data?.shortName || "JS"}
        </div>
        {/* Level Tag Floating */}
        <div className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-lg shadow-md border border-gray-50">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">
            {data?.level || "Beginner"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4 space-y-3 flex-grow">
        <h3 className='text-xl font-extrabold text-gray-800 group-hover:text-blue-600 transition-colors'>
          {data?.title || "Untitled Quiz"}
        </h3>

        <p className='text-gray-500 text-sm line-clamp-2 leading-relaxed px-2'>
          {data?.description || "Master your skills with this comprehensive quiz module designed for experts."}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-100 my-5"></div>

      {/* Meta Stats Section */}
      <div className="flex w-full justify-between items-center mb-6 px-2">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 uppercase font-semibold tracking-widest">Time</span>
          <span className="text-sm font-bold text-gray-700">⏱ {data?.time || 15}m</span>
        </div>
        <div className="h-8 w-[1px] bg-gray-100"></div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 uppercase font-semibold tracking-widest">Questions</span>
          <span className="text-sm font-bold text-gray-700">❓ {data?.totalQuestions || 0} Qs</span>
        </div>
      </div>

      {/* Action Button */}
      <Link to={`/question/${data._id}`} className="w-full">
        <button
          onClick={getQuestion}
          className='w-full py-3.5 bg-gray-900 hover:bg-blue-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-2 group/btn'>
          Start Quiz
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transform group-hover/btn:translate-x-1 transition-transform"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default Quiz;