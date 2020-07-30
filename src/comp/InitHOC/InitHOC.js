import React from "react";
import {Redirect} from "react-router-dom";
export default function InitHOC(Component){
    return (props) => {
       return(
           <>
               {props.userArr.length > 0 && props.todoArr.length > 0
                   ? <Component {...props}/>
                   : <Redirect to={"/"}/>
               }
           </>
       )
    }
}
