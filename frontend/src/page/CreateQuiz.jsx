import React, { useState } from 'react';
import { Pencil, AlignLeft, Sparkles, PlusCircle } from 'lucide-react';
import axios from 'axios';

const CreateQuiz = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const createQuiz = async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:3000/api/admin/createQuiz",
                {
                    title,
                    description: desc
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            console.log(data);

        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans">
            {/* Main Card */}
            <div className="w-full max-w-[500px] bg-white rounded-[24px] shadow-2xl shadow-indigo-100/50 p-8 border border-slate-100 transition-all">

                {/* Decorative Icon */}
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="text-indigo-600 w-7 h-7" />
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Create Quiz
                    </h1>
                    <p className="text-slate-500 mt-1 font-medium">
                        Draft your questions and challenge the world.
                    </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">

                    {/* Title Input */}
                    <div className="relative group">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 ml-1">
                            <Pencil size={14} className="text-indigo-500" />
                            Quiz Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='e.g. JavaScript Pro Challenge'
                            className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all duration-300 placeholder:text-slate-400 text-slate-700"
                        />
                    </div>

                    {/* Description Input */}
                    <div className="relative group">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 ml-1">
                            <AlignLeft size={14} className="text-indigo-500" />
                            Description
                        </label>
                        <textarea
                            rows="3"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder='What will players learn from this?'
                            className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all duration-300 placeholder:text-slate-400 text-slate-700 resize-none"
                        />
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={createQuiz}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform transition-all active:scale-95 group"
                    >
                        <span>Create quiz</span>
                        <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                </div>

                {/* Bottom Tagline */}
                <div className="mt-8 pt-6 border-t border-slate-50 text-center">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                        Step 1 of 3: General Info
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CreateQuiz;