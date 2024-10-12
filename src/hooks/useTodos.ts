import { useQuery,keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import axios from 'axios';

type Todo = {
    id:number,
    title:string,
    completed:boolean,
    userId:number
}


const queryTodos = (pageParam :number,pageSize:number): Promise<Todo[]> => {
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
                                    _start: (pageParam) * pageSize,
                                    _limit: pageSize,
                                }}).then((response)=>response.data)
}

function useTodos(pageSize :number){
    return useInfiniteQuery({
        //users/2/todos
        queryKey: ["todos"],
        queryFn:({pageParam})=> queryTodos(pageParam,pageSize),
        initialPageParam:1,
        getNextPageParam:(lastPage,allPages)=>{

            return lastPage.length > 0 
                    ? allPages.length + 1
                    : undefined
        }

        //refetchOnMount:false
      })

}
export default useTodos;