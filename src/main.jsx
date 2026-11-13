import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/wow.css'
import App from './App.jsx'

// After a deploy, a tab or cached page may still reference old chunk files that no
// longer exist. Reload once to pick up the new build instead of showing a blank page.
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault()
  const key = 'kailex-reloaded'
  try {
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
  } catch {
    /* storage blocked: still try one reload */
  }
  window.location.reload()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
