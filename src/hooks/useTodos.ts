import { useQuery,keepPreviousData } from "@tanstack/react-query";
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
const queryTodos = (query:TodoQuery): Promise<Todo[]> => {
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
   return axios.get(url,{params:{
                                    _start: (query.page-1)*query.pageSize,
                                    _limit: query.pageSize,
                                }}).then((response)=>response.data)
}

function useTodos(query: TodoQuery){
    return useQuery({
        //users/2/todos
        queryKey: ["todos",query],
        queryFn:()=> queryTodos(query),
        placeholderData:keepPreviousData
        //refetchOnMount:false
      })

}
export default useTodos;