import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <BrowserRouter >
      <QueryClientProvider client = {queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
)
