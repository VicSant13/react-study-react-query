
import { useState } from 'react'
import './App.css'
import useTodos from './hooks/useTodos'



function App() {
  const [userId,setUserId] =useState<number>(1)
  const {data,error,isLoading} = useTodos(userId)

  if(error) return <><h2>{error.message}</h2></>
  if(isLoading) return <><h2>Cargando...</h2></>

  

  return (
    <>
        <h2>Todos</h2>
        <select 
          value={userId}
          onChange={(e)=>setUserId(Number(e.target.value))}
          >
          <option value="">Todos los usuarios</option>
          <option value="1">Usuario 1</option>
          <option value="2">Usuario 2</option>
          <option value="3">Usuario 3</option>
        </select>
        <ul>
          {data?.map((todo)=>(<li key={todo.id}>{todo.title}</li>))}
        </ul>
    </>
  )
}
export default App