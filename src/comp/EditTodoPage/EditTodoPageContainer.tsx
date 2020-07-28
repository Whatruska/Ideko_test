import React from "react";
import {withRouter} from "react-router";
// @ts-ignore
import {connect} from "react-redux";
import {Matching} from "../../types/Matching";
const EditTodoPageContainer = (props :Matching) => {
    const id = props.match.params.id;
    return (<>Edit {id}</>)
}

export default withRouter(connect()(EditTodoPageContainer));
