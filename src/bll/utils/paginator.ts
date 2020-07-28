import {Todo} from "../../types/Todo";
import {TodoWithUser} from "../../types/TodoWithUser";

const LIST_SIZE = 6;
interface PaginatorInfo {
    count :number,
    currList :Array<TodoWithUser>
}
export default function Paginator(currPage :number, src :Array<TodoWithUser>) {
    let count = Math.ceil(src.length / LIST_SIZE);
    let leftIndex = (currPage - 1) * LIST_SIZE;
    let currList = src.slice(leftIndex, leftIndex + LIST_SIZE);
    return {count, currList}
}
