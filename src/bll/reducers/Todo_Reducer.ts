import {Todo} from "../../types/Todo";
import {ReducerState} from "../../types/ReducerState";
import {ValidAction} from "../../types/ValidAction";
import {Todo_Api} from "../../dal/todo_api/Todo_Api";

export interface Todo_State extends ReducerState{
    todoArr : Array<Todo>
}

const TOGGLE_FETCHING = "TODO/FETCHING";
const SET_TODOS = "TODO/SET_TODOS";
const CREATE_TODO = "TODO/CREATE_TODO";
const UPDATE_TODO = "TODO/UPDATE_TODO";
const DELETE_TODO = "TODO/DELETE_TODO";

type AllActions = typeof TOGGLE_FETCHING | typeof SET_TODOS | typeof UPDATE_TODO | typeof DELETE_TODO | typeof CREATE_TODO;

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

const updateTodo = (newTodo :Todo) :ValidAction<typeof UPDATE_TODO> => {
    return {
        type : UPDATE_TODO,
        payload : newTodo
    }
}

const createTodo = (todo :Todo) :ValidAction<typeof CREATE_TODO> => {
    return {
        type : CREATE_TODO,
        payload : todo
    }
}

const deleteTodo = (id: number) :ValidAction<typeof DELETE_TODO> => {
    return {
        type : DELETE_TODO,
        payload : id
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

const Todo_Reducer = (state = initialState, action :ValidAction<AllActions>) :any => {
    let stateCopy = {...state};
    stateCopy.todoArr = [...state.todoArr];
    switch (action.type) {
        case TOGGLE_FETCHING : {
            stateCopy.isFetching = !stateCopy.isFetching;
            break;
        }

        case SET_TODOS : {
            stateCopy.todoArr = action.payload;
            break;
        }

        case UPDATE_TODO : {
            stateCopy.todoArr = stateCopy.todoArr.filter(todo => todo.id !== action.payload.id);
            stateCopy.todoArr.push(action.payload);
            stateCopy.todoArr = stateCopy.todoArr.sort((a,b) => a.id - b.id);
            break;
        }

        case CREATE_TODO : {
            stateCopy.todoArr.push(action.payload);
            break;
        }

        case DELETE_TODO : {
            stateCopy.todoArr = stateCopy.todoArr.filter(todo => todo.id !== action.payload);
            break;
        }
    }
    return stateCopy;
}

export {Todo_Reducer, fetchTodos, updateTodo, deleteTodo, createTodo}
