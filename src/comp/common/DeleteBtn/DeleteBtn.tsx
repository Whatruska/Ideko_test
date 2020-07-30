import classes from "./DeleteBtn.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import React, {SyntheticEvent} from "react";
import Tooltip from '@material-ui/core/Tooltip';
import CommonTooltip from "../CommonTooltip/CommonTooltip";
interface Props {
    del : (e : SyntheticEvent) => void
    classes? :string
}
export default function DeleteBtn(props :Props) {
    return (
        <CommonTooltip title={"Delete"}>
            <DeleteIcon className={`${classes.icon} ${props.classes}`} onClick={props.del}/>
        </CommonTooltip>
    )
}
