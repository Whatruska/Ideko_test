import {Matching} from "../../types/Matching";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import React from "react";
import {ReduxState} from "../../types/ReduxState";
import {UserSelector} from "../../bll/selectors/UserSelector";
import {TodoSelector} from "../../bll/selectors/TodoSelector";
import {User} from "../../types/User";
import {Todo} from "../../types/Todo";
import Layout from "../Layout/Layout";
interface MapState {
    userArr : Array<User>,
    todoArr : Array<Todo>
}
const ProfilePageContainer = (props :Matching & MapState) => {
    const id = props.match.params.id;
    const user = props.userArr.filter(user => user.id === Number(id))[0];
    const todos = props.todoArr.filter(todo => todo.userId === Number(id));
    return (
        <Layout title={"Profile page"}>
            <h1>{user.name}</h1>
            {todos.map(todo => {
                return(
                    <h3>
                        {todo.title}
                    </h3>
                );
            })}
        </Layout>
    )
}

let mapState = (state :ReduxState) => {
    return {
        userArr : UserSelector.getUserArr(state),
        todoArr : TodoSelector.getTodoArr(state)
    }
}
export default withRouter(connect(mapState)(ProfilePageContainer));
