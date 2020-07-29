import {Todo} from "../../../types/Todo";
import Checkbox from '@material-ui/core/Checkbox';
import React from "react";
import {TodoWithUser} from "../../../types/TodoWithUser";
import {NavLink} from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
interface AdditionalProps {
    updateTodo: (todo :Todo) => void
    deleteTodo: (id :number) => void
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
            <NavLink to={`/profile/${props.userId}`}>
                <h6>{props.username}</h6>
            </NavLink>
            <NavLink to={`/edit/${props.id}`}>
                <CreateIcon/>
            </NavLink>
            <DeleteIcon onClick={(e) => {
                props.deleteTodo(props.id)
            }}/>
        </div>
    )
}
