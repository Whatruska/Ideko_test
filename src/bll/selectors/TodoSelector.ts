import {ReduxState} from "../../models/ReduxState";
import {Todo} from "../../models/Todo";

export class TodoSelector {
    static getTodoArr = (state :ReduxState) :Array<Todo> => {
        return state.todo.todoArr;
    }

    static isFetching = (state :ReduxState) :boolean => {
        return state.todo.isFetching;
    }
}
