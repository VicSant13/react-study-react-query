import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import App from './App.tsx'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import './index.css'

/*
const settings = {
  retry:3, //attempts to fetch
  staleTime:  60 * 1000, // ms.
  gcTime: 5 * 60 * 1000, //garbageCollector , si no hay un observador se limpoia en 5 minutos
  refetchOnMount:true, //vuelve a consultar cuando se monta el componente
  refetchOnReconnect:true,
  refetchOnWindowFocus:true // se ejecuta cuando se te sales de pestaña  y vueves a la aplicación
}
const queryClient = new QueryClient({
  defaultOptions:{
    queries:settings
  }
});*/

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

    <App />
    <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  </StrictMode>,
)
