import axios from "axios";
import React, { useEffect, useState } from "react";
import StatCard from "./../component/StatCard";

import { User, Award, BookOpen, BarChart3, Calendar, CheckCircle, XCircle } from "lucide-react";
import StateCard from './../component/StatCard';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/user/getresult", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setProfile(data.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!profile) return <div className="text-center mt-20 text-gray-500 text-xl">No profile data found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
       
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8 border border-gray-100 flex flex-col md:flex-row items-center gap-6">
          <div className="h-24 w-24 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
            <User size={48} />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{profile.username}</h1>
            <p className="text-gray-500">{profile.email}</p>
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
              Active Learner
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard icon={<BookOpen className="text-blue-500" />} label="Total Quizzes" value={profile.totalQuiz} />
          <StatCard icon={<Award className="text-amber-500" />} label="Passed" value={profile.passedQuiz} />
          <StatCard icon={<BarChart3 className="text-indigo-500" />} label="Avg. Score" value={`${profile.averageScore}%`} />
        </div>

        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Recent Quiz Results</h2>
          </div>

          <div className="p-4 md:p-8">
            {profile.quizzes.length === 0 ? (
              <div className="text-center py-10 text-gray-400">No quiz attempts yet. Start learning!</div>
            ) : (
              <div className="space-y-4">
                {profile.quizzes.map((quiz, index) => (
                  <div key={index} className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-200">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${quiz.status === 'pass' ? 'bg-green-50' : 'bg-red-50'}`}>
                        {quiz.status === 'pass' ? <CheckCircle className="text-green-600" size={24} /> : <XCircle className="text-red-600" size={24} />}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{quiz.quizTitle}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(quiz.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Score: {quiz.score}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-8">
                      <div className="text-right">
                        <div className="text-2xl font-black text-gray-900">{quiz.percentage}%</div>
                        <div className={`text-xs font-bold uppercase tracking-wider ${quiz.status === 'pass' ? 'text-green-600' : 'text-red-50'}`}>
                          {quiz.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};




export default Profile;