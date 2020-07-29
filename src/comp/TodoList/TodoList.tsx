import {Todo} from "../../types/Todo";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {TodoWithUser} from "../../types/TodoWithUser";
import TodoListItem from "./TodoListItem/TodoListItem";
import Pagination from '@material-ui/lab/Pagination';
import AddIcon from '@material-ui/icons/Add';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CheckIcon from '@material-ui/icons/Check';
import {SortingMode} from "../../types/SortingMode";
import TextField from '@material-ui/core/TextField';
// @ts-ignore
import {Helmet} from "react-helmet";

const LIST_SIZE = 6;
interface Props {
    todoArr : Array<TodoWithUser>,
    updateTodo: (todo :Todo) => void
    deleteTodo: (id :number) => void
}
export default function TodoList(props :Props) {
    const [currPage, setCurrPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [sorting, setSorting] = useState<SortingMode>(SortingMode.STATUS);
    let count = 200;
    let currList = props.todoArr;
    let titleCount = 0;
    function paginate(){
        currList = props.todoArr.filter(todo => {
            if (filter === "") return true;
            return todo.title.includes(filter);
        }).sort((a,b) => {
            if (sorting === SortingMode.STATUS) return Number(a.completed) - Number(b.completed);
            return a.title.localeCompare(b.title);
        });
        titleCount = currList.length;
        count = (Math.ceil(currList.length / LIST_SIZE));
        let leftIndex = (currPage - 1) * LIST_SIZE;
        currList = currList.slice(leftIndex, leftIndex + LIST_SIZE);
    }
    paginate();
    let handleFilter = (e: any) => {
        setFilter(e.target.value);
    }

    let handlePagination = (e: any, page :number) => {
        setCurrPage(page);
    }

    return (
        <>
            <Helmet>
                <title>{`${titleCount} | Ideko test`}</title>
            </Helmet>
            <TextField label="Outlined" variant="outlined" value={filter} onChange={handleFilter}/>
            <AccountBoxIcon style={sorting === SortingMode.USER ? {color : "blue"} : {}} onClick={(e) => {
                setSorting(SortingMode.USER)
            }}/>
            <CheckIcon style={sorting === SortingMode.STATUS ? {color : "blue"} : {}} onClick={(e) => {
                setSorting(SortingMode.STATUS)
            }}/>
            <NavLink to={"/create"}>
                <AddIcon/>
            </NavLink>
            {currList.map(todo => {
                return (
                    <TodoListItem {...todo} deleteTodo={props.deleteTodo} updateTodo={props.updateTodo}/>
                )
            })}
            <Pagination count={count} defaultPage={currPage} onChange={handlePagination}/>
        </>
    )
}
