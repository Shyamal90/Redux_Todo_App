const initialState = {
    list : []
};


export const todoReducer = (state= initialState, action) =>{
    switch(action.type)
    {
        case "ADD" : 
                    const  {id,taskName,status} = action.payload;
                    return {
                        ...state,
                        list:[
                            ...state.list,
                            {
                                id,
                                taskName,
                                status
                            }
                        ]
                    }


        case "DELETE" : 
                      const newList = state.list.filter((item)=>{
                          return item.id !== action.id
                      })
                      

                      return {
                          ...state,
                          list : newList
                      }

        
        case "GET_DATA":
                       return {
                           ...state,
                           list : action.payload
                       }
        
        default : return state;
    }
}