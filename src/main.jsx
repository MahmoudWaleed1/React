import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { CounterContextProvider } from './contexts/CounterContext.jsx';
import AuthContextProvider from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement='top-right' />
      <AuthContextProvider>
        <CounterContextProvider>
          <App />
        </CounterContextProvider>
      </AuthContextProvider>
    </HeroUIProvider>
  </StrictMode>,
)
