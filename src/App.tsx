
import { useState } from 'react'
import useTodos from './hooks/useTodos'



function App() {

const pageSize = 15;
const [page,setPage] = useState(1);



  const [userId,setUserId] =useState<number>()
  //const {data,error,isLoading} = useTodos(userId)
  const {data,error,isLoading,fetchNextPage,isFetchingNextPage} = useTodos(pageSize)

  if(error) return <><h2>{error.message}</h2></>
  if(isLoading) return <><h2>Cargando...</h2></>

  
  const todos = data?.pages.flat()
  return (
    <>
        <h2>Todos</h2>

        <ul>
          {todos?.map((todo)=>(<li key={todo.id}>{todo.title}</li>))}
        </ul>
        
        <button disabled={isFetchingNextPage} onClick={()=>fetchNextPage()}>
          
          {isFetchingNextPage ? 'Cargando...' : 'Cargar Más'}
        </button>
        
    </>
  )
}
export default App