import {Todo} from "../../../types/Todo";
import Checkbox from '@material-ui/core/Checkbox';
import React, {useState} from "react";
import {TodoWithUser} from "../../../types/TodoWithUser";
interface AdditionalProps {
    updateTodo: (todo :Todo) => void
}
type Todo_Item_State = TodoWithUser & AdditionalProps;

export default function TodoListItem(props :Todo_Item_State) {
    let handleCheck = () => {
        let newTodo = {...props};
        newTodo.completed = !props.completed;
        props.updateTodo(newTodo);
    }
    return(
        <div>
            <h3>{props.title}</h3>
            <Checkbox
                checked={props.completed}
                onChange={handleCheck}
            />
            <h6>{props.username}</h6>
        </div>
    )
}
