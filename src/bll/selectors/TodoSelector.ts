import {ReduxState} from "../../types/ReduxState";
import {Todo} from "../../types/Todo";

export class TodoSelector {
    static getTodoArr = (state :ReduxState) :Array<Todo> => {
        return state.todo.todoArr;
    }

    static isFetching = (state :ReduxState) :boolean => {
        return state.todo.isFetching;
    }
}
