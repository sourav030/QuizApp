import { createContext, useState } from "react";

import axios from "axios";

// now we create context
export const AuthContext = createContext();


// create a provider
export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [signup, setSignup] = useState(true);
    const [quiz, setQuiz] = useState([null]);

    const fetchQuiz = async () => {
        try {

            const result = await axios.get('http://localhost:3000/api/user/getquiz')
            console.log(result.data)
            setQuiz(result.data.allQuiz);
        }
        catch(err){
            console.log(err);
        }
    }


    return (
        <AuthContext.Provider value={{ token, setToken, signup, setSignup,fetchQuiz,quiz,setQuiz  }}>
            {children}
        </AuthContext.Provider>
    )
}