import React from "react";
import classes from "./Preloader.module.css";
import preloader from "../../assets/gif/preloader.gif";
export default function Preloader() {
    return(
        <div className={classes.preloaderWrapper}>
            <img src={preloader} alt={"Preloader"} className={classes.preloader}/>
        </div>
    )
}
