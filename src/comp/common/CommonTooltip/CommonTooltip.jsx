import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
export default function CommonTooltip({title, children}) {
    return (
        <Tooltip title={title} TransitionComponent={Fade} enterDelay={700}>
            {children}
        </Tooltip>
    )
}
