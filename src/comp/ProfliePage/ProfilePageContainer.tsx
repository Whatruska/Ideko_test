import {Matching} from "../../types/Matching";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import React from "react";

const ProfilePageContainer = (props :Matching) => {
    const id = props.match.params.id;
    return (<>Profile {id}</>)
}

export default withRouter(connect()(ProfilePageContainer));
