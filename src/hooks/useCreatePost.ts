import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Post } from "../types"
import axios from 'axios'


export default function useCreatePost(onCreate:()=>void){
  const queryClient = useQueryClient()

  return  useMutation({
    mutationFn:(post:Post)=>
      axios.post<Post>('https://jsonplaceholder.typicode.com/posts',post)
      .then(response =>response.data),

    onMutate:(newPost)=>{
      const oldPost = queryClient.getQueryData<Post[]>(['posts'])

      queryClient.setQueryData<Post[]>(['posts'],(post = [])=>[newPost,...post])
      //se asigna el callback para que se pueda ejecutar una función desde afuera del customHook
      onCreate();
      return oldPost
    },
      //cuando el post tiene exito va retornar dos objetos, lo que se hace en la siguiente linea es:
      //asignar esos elementos al key de posts para que puedan ser accesibles y se puedan ver en el listado
    onSuccess:(savedPost,newPost)=>{
      //OPTIMISTIC UI
      queryClient.setQueryData<Post[]>(
        ['post'],
        (posts = []) => posts.map((post)=> { 
                              console.log(post,newPost)
                              return post.id === newPost.id ? savedPost : post
                              })
      )
      // esto hace que se borre la cache
      // queryClient.invalidateQueries({queryKey:['posts']})
    },
    //actualizar estado de react query
    onError:(error,newPost,ctx) => {
      /*queryClient.setQueryData<Post[]>( ['posts'], (posts=[]) => {
                                                                    return posts.filter(post=>post.id !== newPost.id)
                                                          })*/

      //CONTEXT                                                                    
      queryClient.setQueryData<Post[]>(['posts'],ctx);
    }
  })
}