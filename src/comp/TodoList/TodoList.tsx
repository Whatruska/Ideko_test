import {Todo} from "../../models/Todo";
import React from "react";

interface Props {
    todoArr : Array<Todo>
}
export default function TodoList(props :Props) {
    return (
        <div>
            {props.todoArr.map(todo => {
                return (
                    <h1>
                        {todo.title}
                    </h1>
                )
            })}
        </div>
    )
}
