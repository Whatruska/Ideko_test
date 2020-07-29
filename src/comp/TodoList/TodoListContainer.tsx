// @ts-ignore
import { connect } from 'react-redux';
import {deleteTodo, fetchTodos, Todo_State, updateTodo} from "../../bll/reducers/Todo_Reducer";
import {useEffect} from "react";
import React from "react";
import TodoList from "./TodoList";
import {ReduxState} from "../../types/ReduxState";
import {TodoSelector} from "../../bll/selectors/TodoSelector";
import {UserSelector} from "../../bll/selectors/UserSelector";
import {fetchUsers, User_State} from "../../bll/reducers/User_Reducer";
import {TodoWithUser} from "../../types/TodoWithUser";
import {Todo} from "../../types/Todo";

interface DispatchProps {
    fetch: () => void,
    fetchUsers: () => void,
    updateTodo: (todo :Todo) => void
    deleteTodo: (id :number) => void
}

type Props = DispatchProps & Todo_State & User_State;

let TodoListContainer = (props :Props) => {
    useEffect(() => {
        props.fetch();
        props.fetchUsers();
    }, []);
    return (
        <>
            {props.isFetching
                ? <>Preloader</>
                : <TodoList todoArr={props.todoArr.map(todo => {
                    let user = props.userArr.filter(user => user.id === todo.userId)[0];
                    let newTask :TodoWithUser = {
                        ...todo,
                        username : user === undefined ? "" : user.name
                    }
                    return newTask;
                })}
                    updateTodo={props.updateTodo}
                    deleteTodo={props.deleteTodo}
                />
            }
        </>
    )
}

let mapState = (state :ReduxState) => {
    return {
        todoArr : TodoSelector.getTodoArr(state),
        userArr : UserSelector.getUserArr(state),
        isFetching : TodoSelector.isFetching(state) && UserSelector.isFetching(state)
    }
}

let mapDispatch = (dispatch :any) => {
    return {
        fetch : () => {
            dispatch(fetchTodos());
        },
        fetchUsers : () => {
            dispatch(fetchUsers());
        },
        updateTodo : (todo :Todo) => {
            dispatch(updateTodo(todo));
        },
        deleteTodo : (id:number) => {
            dispatch(deleteTodo(id));
        }
    }
}
export default connect(mapState, mapDispatch)(TodoListContainer)
