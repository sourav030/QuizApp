import React from 'react'

const Quiz = ({ data }) => {

  return (
    <div className='bg-white p-6 flex flex-col items-center text-center gap-4 shadow-xl rounded-2xl border border-gray-100 transition-transform hover:scale-[1.02]'>

      {/* Badge */}
      <div className="bg-blue-100 text-blue-600 w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold">
        {data?.shortName || "JS"}
      </div>

      {/* Content */}
      <div className="space-y-2">
         <h1 className='text-xl font-bold text-gray-800'>
           {data?.title || "Untitled Quiz"}
         </h1>

         <h4 className='text-sm text-blue-500 uppercase'>
           Level: {data?.level || "General"}
         </h4>

         <p className='text-gray-500 text-sm'>
           {data?.description || "No description available"}
         </p>
      </div>

      {/* Button */}
      <button className='w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl'>
        Start Quiz
      </button>

      {/* Meta */}
      <div className="flex gap-4 text-xs text-gray-400">
          <span>⏱ {data?.time || 15} Mins</span>
          <span>❓ {data?.totalQuestions || 0} Questions</span>
      </div>

    </div>
  )
}

export default Quiz
