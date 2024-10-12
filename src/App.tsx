import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from 'axios'
import { useRef } from "react"
import { Post } from "./types"
import useCreatePost from "./hooks/useCreatePost"



function App() {
    //para podeder ejecutar el useMutation debes de mandar a llamar << mutate >>
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLInputElement>(null)

  const {mutate,isPending,error} = useCreatePost(()=>{
                                                      if(titleRef.current?.value && bodyRef.current?.value){
                                                          titleRef.current.value = ''
                                                          bodyRef.current.value=''
                                                      }
  })
  

   const {data,isLoading}= useQuery({
      queryKey:['posts'],
      queryFn:()=>
        axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=10')
        .then((response)=>response.data)
    
  })
  return (
    <>
      <h2>Posts</h2>
      <form onSubmit={e=>{
        e.preventDefault()
        if(titleRef.current?.value && bodyRef.current?.value){        
        mutate({
                id:0,
                body:bodyRef.current.value,
                title:titleRef.current.value,
                userId:1
        })
      }
      }}>
        <div>
          <input ref={titleRef}type="text" placeholder="titulo"/>
        </div>
        <div>
          <input ref={bodyRef}type="text" placeholder="body"/>
        </div>
        <div>
          <button disabled={isPending}>{isPending ? 'Creando':'Guardar'}</button>
          {error && <span>{error.message}</span>}
        </div>
      </form>
      {isLoading && 'Cargando...'}
      <ul>
        { data?.map( post =>
                      <li key={post.id}>{post.title}</li>
                    )}
      </ul>
    </>
  )
}
export default App