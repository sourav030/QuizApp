import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify' // Import toast

const Login = () => {
  const { setToken, signup, setSignup } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = signup 
      ? "http://localhost:3000/api/auth/register" 
      : "http://localhost:3000/api/auth/login";

    const payload = signup ? { name, email, password ,role:"User"} : { email, password };

    try {
      const res = await axios.post(url, payload);

      if (res.data.token) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        
        // SUCCESS TOAST
        toast.success(signup ? "🚀 Account created successfully!" : "👋 Welcome back!");
      }
    } catch (err) {
      // ERROR TOAST
      const errorMsg = err.response?.data?.message || "Connection failed";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{signup ? "Create Account" : "Welcome Back"}</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {signup && (
            <input 
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" 
              type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required 
            />
          )}

          <input 
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" 
            type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required 
          />

          <input 
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" 
            type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required 
          />

          <button 
            type="submit" 
            disabled={loading}
            className={`mt-4 w-full py-3 rounded-lg font-bold text-white transition-all ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? "Processing..." : (signup ? "Sign Up" : "Log In")}
          </button>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            {signup ? "Already have an account?" : "Don't have an account?"} 
            <span onClick={() => setSignup(!signup)} className="text-blue-600 font-medium cursor-pointer hover:underline ml-1">
              {signup ? "Log in" : "Sign up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login