import React from "react";
// @ts-ignore
import {connect} from "react-redux";
import {User} from "../../types/User";
import {Todo} from "../../types/Todo";
import {ReduxState} from "../../types/ReduxState";
import {TodoSelector} from "../../bll/selectors/TodoSelector";
import {UserSelector} from "../../bll/selectors/UserSelector";
import {createTodo} from "../../bll/reducers/Todo_Reducer";
import CreateForm, {FormValues} from "./CreateForm";

interface Props {
    userArr :Array<User>,
    todoArr :Array<Todo>
    createTodo : (todo : Todo) => void
}
const CreateTodoPageContainer = (props :Props) => {
    const create = (data :FormValues) => {
        let id = props.todoArr.length + 1;
        props.createTodo({
            ...data,
            userId : Number(data.userId),
            id
        });
    }
    return (
        <>
            <CreateForm
                userArr={props.userArr}
                sendData={create}
                initialCompleted={false}
                initialId={1}
                initialTitle={""}
                message={"Create"}
            />
        </>
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
        createTodo : (todo : Todo) => {
            dispatch(createTodo(todo))
        }
    }
}

export default connect(mapState, mapDispatch)(CreateTodoPageContainer);
