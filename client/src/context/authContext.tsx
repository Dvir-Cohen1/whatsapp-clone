import { useEffect, useState } from 'react'
import { useContext, createContext } from "react";
import { register } from '../services/authentication'
import { login } from '../services/authentication'
import { RegisterContextType, IuserData } from '../@types/auth';
import { getLoggedInUser } from '../services/authentication';
import { logout } from '../services/authentication';
import { getCookie } from '../utils/cookieHandler'
import axios from 'axios';
import { SERVER_URL } from '../constants/constants';

const AuthContext = createContext<RegisterContextType | null>(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: any) {
  const [userData, setUserData] = useState<IuserData>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [logindata, setLoginData] = useState({
    username: '',
    password: '',
  })

  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertMessage, setIsAlertMessage] = useState(false);
  const [isLogin, setIsLogin] = useState((getCookie('accessToken')) ? true : false);
  const [loggedUser, setLoggedUser] = useState({});

 
  useEffect(() => {
    // axios.get(`${SERVER_URL}user/loggedInUser`, {
    // }).then(data => console.log('data') );

      try {
        axios.get(`${SERVER_URL}user/loggedInUser`,{
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
          .then(res => {
            const persons = res.data;
            console.log('asd')
          })

      } catch (error: any) {
        return console.log(error);
      }



  }, [])



  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userData.username || !userData.email || !userData.password) return
    const data = await register(userData);

    setIsAlertMessage(true)
    setAlertMessage(data.message)

    setTimeout(() => {
      setIsAlertMessage(false)
    }, 3500);

  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!logindata.username || !logindata.password) return
    const data = await login(logindata);

    setIsAlertMessage(true)
    setAlertMessage(data.message)
    setIsLogin(true)

    setTimeout(() => {
      setIsAlertMessage(false)
    }, 3500);

  }


  return (
    <AuthContext.Provider value={{ userData, setUserData, alertMessage, setAlertMessage, isAlertMessage, setIsAlertMessage, handleRegister, handleLogin, setLoginData, logindata, isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  )

}
