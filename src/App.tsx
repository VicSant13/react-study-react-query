
import { useState } from 'react'
import useTodos from './hooks/useTodos'



function App() {

const pageSize = 15;
const [page,setPage] = useState(1);



  const [userId,setUserId] =useState<number>()
  //const {data,error,isLoading} = useTodos(userId)
  const {data,error,isLoading,isPlaceholderData} = useTodos({page,pageSize})

  if(error) return <><h2>{error.message}</h2></>
  if(isLoading) return <><h2>Cargando...</h2></>

  

  return (
    <>
        <h2>Todos</h2>

        <ul>
          {data?.map((todo)=>(<li key={todo.id}>{todo.title}</li>))}
        </ul>
        <button disabled={page == 1} onClick={()=>setPage( page-1 )}>{'<<'}</button>
        <button onClick={()=>setPage( page+1 )}>{'>>'}</button>
        {isPlaceholderData && <span>Cargando...</span>}
    </>
  )
}
export default App