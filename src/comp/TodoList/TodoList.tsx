import {Todo} from "../../types/Todo";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {TodoWithUser} from "../../types/TodoWithUser";
import Pagination from '@material-ui/lab/Pagination';
import AddIcon from '@material-ui/icons/Add';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {SortingMode} from "../../types/SortingMode";
import TextField from '@material-ui/core/TextField';
import Layout from "../Layout/Layout";

import classes from "./TodoList.module.css";
import TodoTable from "./TodoTable/TodoTable";
import {Theme, useTheme} from "@material-ui/core";

const LIST_SIZE = 6;
interface Props {
    todoArr : Array<TodoWithUser>,
    updateTodo: (todo :Todo) => void
    deleteTodo: (id :number) => void
}
export default function TodoList(props :Props) {
    const theme :Theme = useTheme();
    const [currPage, setCurrPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [sorting, setSorting] = useState<SortingMode>(SortingMode.USER);
    let count = 200;
    let currList = props.todoArr;
    let titleCount = 0;
    function paginate(){
        currList = props.todoArr.filter(todo => {
            if (filter === "") return true;
            return todo.title.includes(filter);
        }).sort((a,b) => {
            if (sorting === SortingMode.STATUS) return Number(a.completed) - Number(b.completed);
            return a.userId - b.userId;
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

    let styles = {
        iconStyles : {
            fontSize : "40px",
            margin : "0px 5px",
            cursor : "pointer",
        }
    }
    return (
        <Layout title={`${titleCount} todos | Ideko test`}>
            <div className={classes.TodoList}>
                <h2>Todo List</h2>
                <div className={classes.toolbar}>
                    <TextField label="Search" variant="outlined" value={filter} onChange={handleFilter}/>
                    <div className={classes.sortingIcons}>
                        <div className={classes.sorting_title}>
                            Sort by:
                        </div>
                        <AccountBoxIcon style={Object.assign(sorting === SortingMode.USER ? {color : theme.palette.primary.main} : {}, styles.iconStyles)} onClick={(e) => {
                            setSorting(SortingMode.USER)
                        }}/>
                        <CheckBoxIcon style={Object.assign(sorting === SortingMode.STATUS ? {color : theme.palette.primary.main} : {}, styles.iconStyles)} onClick={(e) => {
                            setSorting(SortingMode.STATUS)
                        }}/>
                    </div>
                    <NavLink to={"/create"}>
                        <button className={classes.createBtn}>
                            <div>Create Todo</div>
                            <AddIcon style={{marginLeft : "10px"}}/>
                        </button>
                    </NavLink>
                </div>
                <TodoTable
                    currList={currList}
                    updateTodo={props.updateTodo}
                    deleteTodo={props.deleteTodo}
                />
                <Pagination style={{margin : "10px 0px"}} count={count} defaultPage={currPage} onChange={handlePagination}/>
            </div>
        </Layout>
    )
}
