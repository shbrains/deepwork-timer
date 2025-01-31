import React from 'react'
import App from './App'
import './index.css'

// Use the global ReactDOM instead of importing from 'react-dom/client'
const root = window.ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
) 