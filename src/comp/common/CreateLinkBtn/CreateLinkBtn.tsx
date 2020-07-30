import {NavLink} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import classes from "./CreateLinkBtn.module.css";
export default function CreateLinkBtn() {
    return(
        <NavLink to={"/create"}>
            <button className={classes.createBtn}>
                <div>Create Todo</div>
                <AddIcon style={{marginLeft : "10px"}}/>
            </button>
        </NavLink>
    )
}
