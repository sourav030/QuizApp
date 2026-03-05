import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { User, ShieldCheck, Mail, Lock, UserCircle } from 'lucide-react'
import { Navigate , useNavigate} from 'react-router-dom'


const Login = () => {
  const {token, setToken, signup, setSignup } = useContext(AuthContext);
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); 
  const [loading, setLoading] = useState(false);
 

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = signup 
      ? "http://localhost:3000/api/auth/register" 
      : "http://localhost:3000/api/auth/login";

    const payload = signup ? { name, email, password, role } : { email, password };

    try {
      const res = await axios.post(url, payload);

      if (res.data.token) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        // localStorage.setItem('role', res.data.role); // Role bhi store karna achhi practice hai
        
        toast.success(signup ? `🚀 ${role.toUpperCase()} Account Created!` : "👋 Welcome Back!");
        navigate('/')
      }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Connection failed";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }

   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4 text-blue-600">
             {role === 'admin' && signup ? <ShieldCheck size={32} className="text-red-500" /> : <User size={32} />}
          </div>
          <h2 className="text-3xl font-black text-slate-900">
            {signup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Please enter your details to continue</p>
        </div>

        {/* --- ROLE SELECTOR --- */}
        {signup && (
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
            <button 
              type="button"
              onClick={() => setRole('user')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${role === 'user' ? 'bg-white shadow-md text-blue-600 scale-100' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <User size={18} /> <span className="font-bold text-sm">User</span>
            </button>
            <button 
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${role === 'admin' ? 'bg-white shadow-md text-red-600 scale-100' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <ShieldCheck size={18} /> <span className="font-bold text-sm">Admin</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {signup && (
            <div className="relative">
              <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all" 
                type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required 
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all" 
              type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all" 
              type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`mt-4 w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-[0.97] ${loading ? 'bg-slate-400 cursor-not-allowed' : (role === 'admin' && signup ? 'bg-red-600 shadow-red-200 hover:bg-red-700' : 'bg-blue-600 shadow-blue-200 hover:bg-blue-700')}`}
          >
            {loading ? "Processing..." : (signup ? `Register as ${role.charAt(0).toUpperCase() + role.slice(1)}` : "Sign In")}
          </button>
          
          <p className="text-center text-sm text-slate-500 mt-6">
            {signup ? "Already have an account?" : "Don't have an account?"} 
            <button 
              type="button"
              onClick={() => setSignup(!signup)} 
              className="text-blue-600 font-bold hover:underline ml-1"
            >
              {signup ? "Log in" : "Create account"}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login