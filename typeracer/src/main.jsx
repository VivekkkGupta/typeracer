import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TypeRacerContextProvider } from './contexts/TypeRacerContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <TypeRacerContextProvider>
        <App />
      </TypeRacerContextProvider>
    </ThemeProvider>
  </StrictMode>,
)
