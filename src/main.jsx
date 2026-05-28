import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Hide loading screen when app is loaded
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen')
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden')
    }, 800)
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
