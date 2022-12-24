import { useState } from 'react'
import { useContext, createContext } from "react";
import { register } from '../services/authentication'
import { login } from '../services/authentication'
import { RegisterContextType, IuserData } from '../@types/auth';

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

    setTimeout(() => {
      setIsAlertMessage(false)
    }, 3500);

  }

  return (
    <AuthContext.Provider value={{ userData,setUserData, alertMessage, setAlertMessage, isAlertMessage, setIsAlertMessage, handleRegister,handleLogin,setLoginData,logindata }}>
      {children}
    </AuthContext.Provider>
  )

}
