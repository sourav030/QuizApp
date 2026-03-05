import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()

    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [signup, setSignup] = useState(true);
    const [quiz, setQuiz] = useState([null]);
    const [question, setQuestion] = useState([]);

    const fetchQuiz = async () => {
        try {

            const result = await axios.get(
                'http://localhost:3000/api/user/getquiz',
                {
                    headers:{
                        Authorization:`bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            console.log(result.data)

            setQuiz(result.data.allQuiz)

            navigate("/")   // ✅ this works

        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{
            question,setQuestion,
            token,setToken,
            signup,setSignup,
            fetchQuiz,
            quiz,setQuiz
        }}>
            {children}
        </AuthContext.Provider>
    )
}