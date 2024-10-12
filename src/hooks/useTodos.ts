import { useQuery } from "@tanstack/react-query";

type Todo = {
    id:number,
    title:string,
    completed:boolean,
    userId:number
}

const queryTodos = (userId:number|undefined):Promise<Todo[]> => {
    const url = 'https://jsonplaceholder.typicode.com/todos?'

    const queryParams =userId ? new URLSearchParams({
        userId:String(userId),
    }):'';

    fetch(url + queryParams)
    .then((response)=>
        {
        if(!response.ok) throw new Error(`Error al hacer consulta ${response.status}`)
            return response.json()
        }
        
    )}

function useTodos(userId:number|undefined){
    return useQuery({
        //users/2/todos
        queryKey: userId ? ['users',userId,'todos'] : ['todos'],
        queryFn:()=> queryTodos(userId),
        //refetchOnMount:false
      })

}
export default useTodos;