import {TodoWithUser} from "../../../types/TodoWithUser";
import {Todo} from "../../../types/Todo";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React, {SyntheticEvent} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {NavLink} from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from '@material-ui/icons/Person';
import {createStyles, Theme, withStyles} from "@material-ui/core";
import classes from "./TodoTable.module.css";
import DeleteBtn from "../../common/DeleteBtn/DeleteBtn";
import CommonTooltip from "../../common/CommonTooltip/CommonTooltip";
interface Props {
    currList :Array<TodoWithUser>,
    updateTodo: (todo :Todo) => void,
    deleteTodo: (id :number) => void
}

export default function TodoTable(props:Props) {
    const StyledTableCell = withStyles((theme: Theme) =>
        createStyles({
            head: {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 18
            },
        }),
    )(TableCell);

    return (
        <div className={classes.tableWrapper}>
            {props.currList.length > 0
                ? <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell><b>Status</b></StyledTableCell>
                                <StyledTableCell align="right"><b>Title</b></StyledTableCell>
                                <StyledTableCell align="right"><b>Username</b></StyledTableCell>
                                <StyledTableCell align="center"><b>Toolbar</b></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.currList.map((todo) => {
                                let del = (e : SyntheticEvent) => {
                                    props.deleteTodo(todo.id)
                                }
                                let handleCheck = () => {
                                    let newTodo = {...todo};
                                    newTodo.completed = !todo.completed;
                                    props.updateTodo(newTodo);
                                }
                                return(
                                    <TableRow key={todo.id}>
                                        <TableCell component="td" scope="row">
                                            <Checkbox
                                                checked={todo.completed}
                                                onChange={handleCheck}
                                            />
                                        </TableCell>
                                        <TableCell align="right">{todo.title}</TableCell>
                                        <TableCell align="right">
                                            <NavLink to={`profile/${todo.userId}`}>
                                                <div className={classes.username}>
                                                    <>{todo.username}</> <PersonIcon/>
                                                </div>
                                            </NavLink>
                                        </TableCell>
                                        <TableCell component="td">
                                            <div className={classes.toolbar}>
                                                <CommonTooltip title={"Edit"}>
                                                    <NavLink to={`/edit/${todo.id}`}>
                                                        <CreateIcon className={`${classes.icon}`}/>
                                                    </NavLink>
                                                </CommonTooltip>
                                                <DeleteBtn del={del} classes={classes.deleteIcon}/>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <h1>Try another search request</h1>
            }
        </div>
    );
}
