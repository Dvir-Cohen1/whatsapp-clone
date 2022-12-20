import React from 'react'
import { Link } from 'react-router-dom'
import AppWrapper from '../components/AppWrapper'
import { useState } from 'react'
import { login } from '../services/authentication'
import { Navigate } from "react-router-dom";


const Login = () => {
  const [logindata, setLoginData] = useState({
    username: '',
    password: '',
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!logindata.username || !logindata.password) return
    const data = await login(logindata);
    return <Navigate replace to="/" />;
    console.log(data)
  }

  return (
    <AppWrapper>
      <div className='flex w-full flex-col justify-center align-middle items-center'>
        <section className="max-w-4xl mb-5 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                <input onChange={(e) => setLoginData({ ...logindata, username: e.target.value })} id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
              </div>
              <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                <input onChange={(e) => setLoginData({ ...logindata, password: e.target.value })} id="password" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-primary rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">Login</button>
            </div>
          </form>
        </section>
        <p>Don't have accout? <Link to="/register">Register</Link></p>
      </div>

    </AppWrapper>
  )
}

export default Login