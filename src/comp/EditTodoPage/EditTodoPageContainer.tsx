import React from "react";
import {withRouter} from "react-router";
// @ts-ignore
import {connect} from "react-redux";
import {Matching} from "../../types/Matching";
import {User} from "../../types/User";
import {Todo} from "../../types/Todo";
import {ReduxState} from "../../types/ReduxState";
import {UserSelector} from "../../bll/selectors/UserSelector";
import {TodoSelector} from "../../bll/selectors/TodoSelector";
import {updateTodo} from "../../bll/reducers/Todo_Reducer";
import CreateForm, {FormValues} from "../CreateTodoPage/CreateForm";
import Layout from "../Layout/Layout";

interface Props {
    userArr :Array<User>,
    todoArr :Array<Todo>
    updateTodo : (todo : Todo) => void
}

const EditTodoPageContainer = (props :Props & Matching) => {
    const id = props.match.params.id;
    const todo = props.todoArr.filter(todo => todo.id === Number(id))[0];
    const update = (data :FormValues) => {
        props.updateTodo({
            ...todo,
            ...data
        })
    }
    return (
        <Layout title={"Edit todo page"}>
            <CreateForm
                userArr={props.userArr}
                sendData={update}
                initialCompleted={todo.completed}
                initialId={todo.userId}
                initialTitle={todo.title}
                message={"Edit"}
            />
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
        updateTodo : (todo : Todo) => {
            dispatch(updateTodo(todo))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(EditTodoPageContainer));
