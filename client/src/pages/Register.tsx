import { useState } from 'react'
import AppWrapper from '../components/AppWrapper'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import Toast from '../components/Toast'
// import { register } from '../services/authentication'
// import { setCookie, getCookie } from '../utils/cookieHandler'


const Reagister = () => {
  const { userData, setUserData, alertMessage, isAlertMessage, handleRegister }: any = useAuthContext();
  return (
    <AppWrapper>
      <div className='flex w-full flex-col justify-center align-middle items-center'>
        {isAlertMessage && <Toast>{alertMessage}</Toast>}
        <section className="max-w-4xl mb-5 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                <input required onChange={(e) => setUserData({ ...userData, username: e.target.value })} id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
                <input required onChange={(e) => setUserData({ ...userData, email: e.target.value })} id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                <input required onChange={(e) => setUserData({ ...userData, password: e.target.value })} id="password" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Password Confirmation</label>
                <input required onChange={(e) => setUserData({ ...userData, passwordConfirm: e.target.value })} id="passwordConfirmation" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-primary rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">Login</button>
            </div>
          </form>
        </section>
        <p>Already have accout? <Link to="/login">Login</Link></p>
      </div>

    </AppWrapper>
  )
}

export default Reagister