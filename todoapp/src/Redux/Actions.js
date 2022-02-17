export const AddTodo = (payload) => {
    return  {
        type: "ADD",
        payload
    }
}


//delete action required
export const DeleteTodo = (id) => {
    return {
        type: "DELETE",
        id
    }
}

//we need one action which help us to get data
export const GetTodo = (payload) => {
    return {
        type: "GET_DATA",
        payload: payload
    }
}