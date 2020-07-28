import {Todo} from "../../models/Todo";
import {SystemState} from "../../models/SystemState";
import {ValidAction} from "../../models/ValidAction";
import {Todo_Api} from "../../dal/todo_api/Todo_Api";

export interface Todo_State extends SystemState{
    todo?: any;
    todoArr : Array<Todo>
}

const TOGGLE_FETCHING = "TODO/FETCHING";
const SET_TODOS = "TODO/SET_TODOS";

const initialState :Todo_State = {
    todoArr : [],
    isFetching : false
}

const toggleFetching = () :ValidAction<typeof TOGGLE_FETCHING> => {
    return {
        type : TOGGLE_FETCHING
    }
}

const setTodos = (todos :Array<Todo>) :ValidAction<typeof SET_TODOS> => {
    return {
        type : SET_TODOS,
        payload : todos
    }
}

const fetchTodos = () :any => {
    return (dispatch:any) => {
        dispatch(toggleFetching());
        new Todo_Api().getInstances().then(resp => {
            dispatch(setTodos(resp));
            dispatch(toggleFetching());
        })
    }
}

const Todo_Reducer = (state = initialState, action :ValidAction<typeof TOGGLE_FETCHING | typeof SET_TODOS>) :any => {
    let stateCopy = {...state};
    switch (action.type) {
        case TOGGLE_FETCHING : {
            stateCopy.isFetching = !stateCopy.isFetching;
            break;
        }

        case SET_TODOS : {
            stateCopy.todoArr = action.payload;
            break;
        }
        default : {}
    }
    return stateCopy;
}

export {Todo_Reducer, fetchTodos}
