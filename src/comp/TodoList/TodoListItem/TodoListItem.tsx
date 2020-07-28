import {Todo} from "../../../models/Todo";
import Checkbox from '@material-ui/core/Checkbox';
import React, {useState} from "react";
import {TodoWithUser} from "../../../models/TodoWithUser";
interface AdditionalProps {
    updateTodo: (todo :Todo) => void
}
type Todo_Item_State = TodoWithUser & AdditionalProps;

export default function TodoListItem(props :Todo_Item_State) {
    const [checked, setChecked] = useState(props.completed);
    let handleCheck = () => {
        setChecked(!checked);
        let newTodo = {...props};
        newTodo.completed = !checked;
        props.updateTodo(newTodo);
    }
    return(
        <div>
            <h3>{props.title}</h3>
            <Checkbox
                checked={checked}
                onChange={handleCheck}
            />
            <h6>{props.username}</h6>
        </div>
    )
}
