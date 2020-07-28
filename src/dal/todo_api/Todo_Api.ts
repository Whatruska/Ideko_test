import {Api} from "../api/Api";
import {Todo} from "../../models/Todo";
const TODO_URL = "todos";
export class Todo_Api extends Api<Todo> {
    constructor() {
        super(TODO_URL);
    }
}
