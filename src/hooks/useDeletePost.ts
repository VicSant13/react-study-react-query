import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Post } from "../types"
import axios from 'axios'


export default function useCreatePost(){
  const queryClient = useQueryClient()

  return  useMutation({
    mutationFn:(post:Post)=>
      axios.delete<Post>(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
      .then(response =>response.data),

    onMutate:(oldPost)=>{
      //const oldPost = queryClient.getQueryData<Post[]>(['posts'])

      const oldPosts = queryClient.setQueryData<Post[]>(['posts'],(posts = [])=> posts.filter(post=> post.id !== oldPost.id))
      //se asigna el callback para que se pueda ejecutar una función desde afuera del customHook
      
      return oldPosts;
    },
    //actualizar estado de react query
    onError:(_,__,ctx) => {
      /*queryClient.setQueryData<Post[]>( ['posts'], (posts=[]) => {
                                                                    return posts.filter(post=>post.id !== newPost.id)
                                                          })*/

      //CONTEXT                                                                    
      queryClient.setQueryData<Post[]>(['posts'],ctx);
    }
  })
}