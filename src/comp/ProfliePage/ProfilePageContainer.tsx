import {Matching} from "../../types/Matching";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import React, {SyntheticEvent} from "react";
import {ReduxState} from "../../types/ReduxState";
import {UserSelector} from "../../bll/selectors/UserSelector";
import {TodoSelector} from "../../bll/selectors/TodoSelector";
import {User} from "../../types/User";
import {Todo} from "../../types/Todo";
import Layout from "../Layout/Layout";
import classes from "./ProfilePage.module.css";
import InitHOC from "../InitHOC/InitHOC";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Divider} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import {deleteTodo} from "../../bll/reducers/Todo_Reducer";
import DeleteBtn from "../common/DeleteBtn/DeleteBtn";
import CreateLinkBtn from "../common/CreateLinkBtn/CreateLinkBtn";

interface MapState {
    userArr : Array<User>,
    todoArr : Array<Todo>,
    deleteTodo : (id :number) => void
}
const ProfilePageContainer = (props :Matching & MapState) => {
    const id = props.match.params.id;
    const user = props.userArr.filter(user => user.id === Number(id))[0];
    const todos = props.todoArr.filter(todo => todo.userId === Number(id));
    return (
        <Layout title={"Profile page"}>
            <div className={classes.profileWrapper}>
                <h1>{user.name}</h1>
                <h3>User`s todos</h3>
                <List className={classes.list}>
                    {todos.map((todo, index) => {
                        let del = (e :SyntheticEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            props.deleteTodo(todo.id);
                        }
                        return(
                            <div key={todo.id} className={classes.listItemWrapper}>
                                <NavLink to={`/edit/${todo.id}`} key={todo.id}>
                                    <ListItem button>
                                        <div className={classes.listItem}>
                                            <div className={classes.todoTitle}>
                                                {todo.title}
                                            </div>
                                            <div>
                                                <DeleteBtn del={del}/>
                                            </div>
                                        </div>
                                    </ListItem>
                                </NavLink>
                                {index !== todos.length - 1 ? <Divider/> : <></>}
                            </div>
                        );
                    })}
                </List>
                {todos.length === 0
                    ? <div className={classes.noTodos}>
                        <div className={classes.noTodoTitle}>
                            There`s no todos on this user.
                        </div>
                        <CreateLinkBtn/>
                      </div>
                    : <></>
                }
            </div>
        </Layout>
    )
}

let mapState = (state :ReduxState) => {
    return {
        userArr : UserSelector.getUserArr(state),
        todoArr : TodoSelector.getTodoArr(state)
    }
}

let mapDispatch = (dispatch :any) => {
    return {
        deleteTodo : (id :number) => {
            dispatch(deleteTodo(id))
        }
    }
}
export default withRouter(connect(mapState, mapDispatch)(InitHOC(ProfilePageContainer)));
