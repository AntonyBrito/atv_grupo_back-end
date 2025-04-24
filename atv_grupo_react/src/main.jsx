import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/aluno_page.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
