import { useState } from 'react'
import { useContext, createContext } from "react";
import { register } from '../services/authentication'
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

  const [errorMessage, setErrorMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userData.username || !userData.email || !userData.password) return

    const data = await register(userData);

    setAlertMessage(true)
    setErrorMessage(data.message)

    setTimeout(() => {
      setAlertMessage(false)
    }, 3500);

  }

  return (
    <AuthContext.Provider value={{ setAlertMessage, userData, setUserData, errorMessage, setErrorMessage, alertMessage, handleRegister }}>
      {children}
    </AuthContext.Provider>
  )

}
