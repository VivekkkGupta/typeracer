import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TypeRacerContextProvider } from './contexts/TypeRacerContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TypeRacerContextProvider>
      <App />
    </TypeRacerContextProvider>
  </StrictMode>,
)
