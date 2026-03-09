import React, { useContext, useState } from 'react';
import { Pencil, AlignLeft, Sparkles, PlusCircle } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Add this
const CreateQuiz = () => {
 
    const navigate = useNavigate();
    const {totalQuestions, setTotalQuestions, quizId,setQuizId}=useContext(AuthContext)
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [shortName, setShortName] = useState('');
    const [level, setLevel] = useState('');
    const [time, setTime] = useState('');
   

    const createQuiz = async () => {
        try {

            const { data } = await axios.post(
                "http://localhost:3000/api/admin/createQuiz",
                {
                    title,
                    description: desc,
                    shortName,
                    level,
                    time,
                    totalQuestions
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            console.log(data);
            setQuizId(data.quiz._id);
           navigate('/addquestion')
            setTitle('');
            setDesc('');
            setShortName('');
            setLevel('');
            setTime('');
            setTotalQuestions('');


        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans">

            <div className="w-full max-w-[520px] bg-white rounded-[24px] shadow-2xl shadow-indigo-100/50 p-8 border border-slate-100">

                {/* Icon */}
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="text-indigo-600 w-7 h-7" />
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900">
                        Create Quiz
                    </h1>
                    <p className="text-slate-500 mt-1 font-medium">
                        Draft your quiz and challenge the world.
                    </p>
                </div>

                <div className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                            <Pencil size={14} className="text-indigo-500" />
                            Quiz Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="JavaScript Pro Challenge"
                            className="w-full px-5 py-4 bg-slate-50 rounded-2xl focus:border-indigo-500 border-2 border-transparent outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                            <AlignLeft size={14} className="text-indigo-500" />
                            Description
                        </label>

                        <textarea
                            rows="3"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="What will players learn?"
                            className="w-full px-5 py-4 bg-slate-50 rounded-2xl focus:border-indigo-500 border-2 border-transparent outline-none resize-none"
                        />
                    </div>

                    {/* Short Name */}
                    <div>
                        <label className="text-sm font-bold text-slate-700 mb-2">
                            Short Name
                        </label>

                        <input
                            type="text"
                            value={shortName}
                            onChange={(e) => setShortName(e.target.value)}
                            placeholder="JS"
                            className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-500 outline-none"
                        />
                    </div>

                    {/* Level */}
                    <div>
                        <label className="text-sm font-bold text-slate-700 mb-2">
                            Difficulty Level
                        </label>

                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-500 outline-none"
                        >
                            <option value="">Select Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    {/* Time */}
                    <div>
                        <label className="text-sm font-bold text-slate-700 mb-2">
                            Quiz Time (minutes)
                        </label>

                        <input
                            type="number"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            placeholder="15"
                            className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-500 outline-none"
                        />
                    </div>

                    {/* Total Questions */}
                    <div>
                        <label className="text-sm font-bold text-slate-700 mb-2">
                            Total Questions
                        </label>

                        <input
                            type="number"
                            value={totalQuestions}
                            onChange={(e) => setTotalQuestions(e.target.value)}
                            placeholder="10"
                            className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-500 outline-none"
                        />
                    </div>

                    {/* Button */}
                    <button
                        onClick={createQuiz}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition active:scale-95"
                    >
                        Create Quiz
                        <PlusCircle size={20} />
                    </button>

                </div>

                <div className="mt-8 pt-6 border-t text-center">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                        Step 1 of 3 : Quiz Info
                    </span>
                </div>

            </div>
        </div>
    );
};

export default CreateQuiz;