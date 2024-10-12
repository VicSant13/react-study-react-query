import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

type Todo = {
    id:number,
    title:string,
    completed:boolean,
    userId:number
}

type TodoQuery={
    page:number,
    pageSize:number
}
const queryTodos = (userId: number|undefined ): Promise<Todo[]> => {
    //se define la url base del endpoint -FETCH STYLE
    //const url = 'https://jsonplaceholder.typicode.com/todos?'
    const url = 'https://jsonplaceholder.typicode.com/todos';
    //se arma la urlPAram para que se pueda consultar en el fetch - FETCH STYLE
    /*const queryParams =userId ? new URLSearchParams({
        userId:String(userId),
    }):'';*/

    //IMPORTANTISIMO: DEBE RETORNAR UNA PROMESA el fetch FETCH-STYLE
    /*return axios.get(url)
            .then((response)=>
                                {
                                    if(!response.ok) throw new Error(`Error al hacer consulta ${response.status}`)
                                        return response.json()
                                }        
    )}*/
   return axios.get(url,{params:{userId}}).then((response)=>response.data)
}

function useTodos(userId:number|undefined){
    return useQuery({
        //users/2/todos
        queryKey: userId ? ['users',userId,'todos'] : ['todos'],
        queryFn:()=> queryTodos(userId),
        //refetchOnMount:false
      })

}
export default useTodos;