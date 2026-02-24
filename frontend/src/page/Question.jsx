import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Question = () => {
  const { question } = useContext(AuthContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  if (!Array.isArray(question) || question.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading questions...
      </div>
    );
  }

  const currentQuestion = question[currentIndex];
  const progress = ((currentIndex + 1) / question.length) * 100;

  // ✅ Store selected option
  const handleOptionChange = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion._id]: option,
    }));
  };

  // ✅ Submit current question answer (Reusable)
  const submitCurrentAnswer = async () => {
    return axios.post(
      "http://localhost:3000/api/user/submitAns",
      {
        quizId: currentQuestion.quizId,
        quesId: currentQuestion._id,
        submitAns: answers[currentQuestion._id],
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  // ✅ Next Question
  const handleNext = async () => {
    try {
      setLoading(true);
      await submitCurrentAnswer();
      setCurrentIndex((prev) => prev + 1);
    } catch (error) {
      alert(error.response?.data?.message || "Answer submission failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Previous Question
  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  // ✅ Finish Quiz (submit last answer first)
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // 1️⃣ Submit last answer
      await submitCurrentAnswer();

      // 2️⃣ Submit quiz
      const res = await axios.post(
        "http://localhost:3000/api/user/submit/quiz",
        { quizId: question[0].quizId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(
        `Quiz Finished 🎉\n\nScore: ${res.data.score}\nPercentage: ${res.data.percentage.toFixed(
          2
        )}%\nStatus: ${res.data.status.toUpperCase()}`
      );
    } catch (error) {
      alert(error.response?.data?.message || "Quiz submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span>
              Step {currentIndex + 1} of {question.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-blue-600 h-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <h4 className="text-xl font-bold mb-6">
            {currentQuestion.question}
          </h4>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion._id] === option;

              return (
                <label
                  key={index}
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer
                    ${isSelected ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}
                >
                  <input
                    type="radio"
                    className="hidden"
                    checked={isSelected}
                    onChange={() => handleOptionChange(option)}
                  />
                  <span className="ml-3">{option}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0 || loading}
            className="px-6 py-2 text-gray-500"
          >
            Previous
          </button>

          {currentIndex < question.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion._id] || loading}
              className="px-6 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Saving..." : "Next"}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!answers[currentQuestion._id] || loading}
              className="px-6 py-2 bg-green-600 text-white rounded"
            >
              {loading ? "Submitting..." : "Finish"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;