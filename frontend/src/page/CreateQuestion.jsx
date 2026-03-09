import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { HelpCircle, PlusCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateQuestion = () => {
  const navigate = useNavigate();
  
  
  const { totalQuestions, setTotalQuestions, quizId, quizLimit } = useContext(AuthContext);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const createQuestion = async () => {
 
    if (!question.trim()) return alert("Please enter a question.");
    if (options.some(opt => !opt.trim())) return alert("All 4 options must be filled.");
    if (correctAnswerIndex === null) return alert("Please select the correct answer.");

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/createQuestion",
        {
          question,
          options,
          correctAnswer: options[correctAnswerIndex],
          quizId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

     
      const newCount = totalQuestions + 1;
      setTotalQuestions(newCount);

     
      if (newCount >= quizLimit) {
        alert("🎉 All questions added! Returning to Dashboard.");
        navigate("/dashboard"); 
      } else {
      
        alert(`Question ${newCount} added successfully!`);
        setQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectAnswerIndex(null);
      }

    } catch (err) {
      alert(err.response?.data?.message || "Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="w-full max-w-[650px] bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
        
       
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <HelpCircle className="text-indigo-600" size={28} />
            <h2 className="text-2xl font-extrabold text-slate-800">
              Question {totalQuestions + 1}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase">Progress</p>
            <p className="text-sm font-black text-indigo-600">
              {totalQuestions} / {quizLimit || "∞"}
            </p>
          </div>
        </div>

       
        <div className="mb-6">
          <label className="text-sm font-bold text-slate-700 ml-1">Question Text</label>
          <textarea
            rows="3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter question here..."
            className="w-full mt-2 px-4 py-3 bg-slate-50 rounded-xl border-2 border-transparent focus:border-indigo-500 outline-none resize-none transition-all"
          />
        </div>

        
        <div className="space-y-4">
          {options.map((opt, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-3 p-2 rounded-2xl border-2 transition-all ${
                correctAnswerIndex === index ? "border-indigo-500 bg-indigo-50/30" : "border-transparent bg-slate-50"
              }`}
            >
              <button
                onClick={() => setCorrectAnswerIndex(index)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  correctAnswerIndex === index ? "bg-indigo-600 border-indigo-600" : "border-slate-300 bg-white"
                }`}
              >
                {correctAnswerIndex === index && <CheckCircle2 size={14} className="text-white" />}
              </button>
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(e.target.value, index)}
                placeholder={`Option ${index + 1}`}
                className="w-full bg-transparent py-2 outline-none text-slate-700 font-medium"
              />
            </div>
          ))}
        </div>

       
        <button
          onClick={createQuestion}
          disabled={loading}
          className={`w-full mt-8 flex items-center justify-center gap-2 text-white font-bold py-4 rounded-2xl shadow-lg transition active:scale-95 ${
            loading ? "bg-slate-400" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
          }`}
        >
          {loading ? "Saving..." : totalQuestions + 1 >= quizLimit ? "Finish Quiz" : "Add Next Question"}
          {!loading && <PlusCircle size={20} />}
        </button>

      </div>
    </div>
  );
};

export default CreateQuestion;