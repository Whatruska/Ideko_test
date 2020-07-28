import {Todo} from "../../models/Todo";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {TodoWithUser} from "../../models/TodoWithUser";
import TodoListItem from "./TodoListItem/TodoListItem";
import paginator from "../../bll/utils/paginator";
import Pagination from '@material-ui/lab/Pagination';
import AddIcon from '@material-ui/icons/Add';

interface Props {
    todoArr : Array<TodoWithUser>,
    updateTodo: (todo :Todo) => void
}
export default function TodoList(props :Props) {
    const [currPage, setCurrPage] = useState(1);
    const {count, currList} = paginator(currPage, props.todoArr);
    return (
        <div>
            <NavLink to={"/create"}>
                <AddIcon/>
            </NavLink>
            {currList.map(todo => {
                return (
                    <TodoListItem {...todo} updateTodo={props.updateTodo}/>
                )
            })}
            <Pagination count={count} defaultPage={currPage} onChange={(e, page) => setCurrPage(page)}/>
        </div>
    )
}
