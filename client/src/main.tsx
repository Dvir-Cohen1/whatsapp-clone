import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import AuthProvider from './context/registerContext'

import './assets/fonts/Roboto-Black.ttf'
import './assets/fonts/Roboto-Bold.ttf'
import './assets/fonts/Roboto-Light.ttf'
import './assets/fonts/Roboto-Thin.ttf'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
