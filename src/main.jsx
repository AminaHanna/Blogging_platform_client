import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { ContextProvider } from './Components/ExternalComponents/ContextAPI/Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
    <Toaster position='top-center' reverseOrder={false} />
    <App />
    </ContextProvider>
  </StrictMode>,
)
