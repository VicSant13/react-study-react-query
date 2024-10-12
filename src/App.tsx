import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from 'axios'
import { useRef } from "react"

type Post = {
  id:number,
  title:string,
  body:string,
  userId:number
}

function App() {
    //para podeder ejecutar el useMutation debes de mandar a llamar << mutate >>
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const {mutate,isPending,error}= useMutation({
    mutationFn:(post:Post)=>
      axios.post<Post>('https://jsonplaceholder.typicode.com/posts',post)
      .then(response =>response.data),
      //cuando el post tiene exito va retornar dos objetos, lo que se hace en la siguiente linea es:
      //asignar esos elementos al key de posts para que puedan ser accesibles y se puedan ver en el listado
    onSuccess:(savedPost,newPost)=>{
      queryClient.setQueryData<Post[]>(['posts'],(post = [])=>[savedPost,...post])
      
      if(titleRef.current?.value && bodyRef.current?.value){        
          titleRef.current.value = ''
          bodyRef.current.value = ''
      }


      // esto hace que se borre la cache
      // queryClient.invalidateQueries({queryKey:['posts']})
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