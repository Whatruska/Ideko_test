// @ts-ignore
import { connect } from 'react-redux';
import {fetchTodos, Todo_State} from "../../bll/reducers/Todo_Reducer";
import {useEffect} from "react";
import React from "react";
import TodoList from "./TodoList";
import {ReduxState} from "../../models/ReduxState";

interface DispatchProps {
    fetch: () => void
}

type Props = DispatchProps & Todo_State;

let TodoListContainer = (props :Props) => {
    useEffect(() => {
        props.fetch();
    }, );
    return (
        <TodoList todoArr={props.todoArr}/>
    )
}

let mapState = (state :ReduxState) => {
    return {...state.todo}
}

let mapDispatch = (dispatch :any) => {
    return {
        fetch : () => {
            dispatch(fetchTodos());
        }
    }
}
export default connect(mapState, mapDispatch)(TodoListContainer)
