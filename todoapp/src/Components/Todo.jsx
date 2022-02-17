import React from 'react';
import { useState } from 'react';
import './todo.css';
import {useDispatch} from 'react-redux';
import {v4 as uuid} from 'uuid';
import {AddTodo,DeleteTodo,GetTodo} from '../Redux/Actions';
import {useSelector} from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

function Todo() {
    const [value,setValue] = useState("");
    const dispatch = useDispatch();


    //get data form store
     const list = useSelector((state)=>state.list)
     console.log(list);

    // Handle Add function post data in server
    const handleAdd = () =>{
        const payload = {
            id: uuid(),
            taskName : value,
            status: false
        }

        axios.post("https://jsonmockserver.herokuapp.com/todoList",payload).then((data)=>{
            const list = data.data;
            dispatch(AddTodo(list));
        })

        
        setValue("");
    }


    //fetch data from server
    //I called a request on server for that I used useEffect.
    useEffect(()=>{
       const getData = () =>{
           axios.get("https://jsonmockserver.herokuapp.com/todoList").then((data)=>{
            //    console.log(data.data);
               const list = data.data;

               dispatch(GetTodo(list))
           })
       }

       getData();
    },[])
    //next step sent the data to redux storage.

  return (
    <div id='container'>
       <div className="inputField">
           <input type="text" placeholder='Todoes....' value={value} onChange={(event)=>setValue(event.target.value)}/>
       </div>
       <div className="addBtn">
           <button onClick={()=>handleAdd()}>Add</button>
       </div>

       {/* Show Data  */}
       <div className="showData">
           <table border="1">
               <thead>
                   <tr>
                       <td>Id</td>
                       <td>Task Name</td>
                       <td>Status</td>
                       <td>Operation</td>
                   </tr>
               </thead>
               <tbody>
                   {
                       list.map((item,id)=>{
                           return(
                               <tr>
                                   <th>{id+1}</th>
                                   <th>{item.taskName}</th>
                                   <th><button>{item.status ? "true"  : "false"}</button></th>
                                   <th><span><button>Edit</button></span><span><button onClick={()=>dispatch(DeleteTodo(item.id))}>Delete</button></span></th>
                               </tr>
                           )
                       })
                   }
               </tbody>
           </table>
       </div>
    </div>
  )
}

export default Todo
