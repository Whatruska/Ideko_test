import React from "react";
import classes from "./Header.module.css";
import logo from "../../../assets/img/logo.png";
import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <NavLink to={"/"}>
            <header className={classes.Header}>
                <div className={classes.logo}>
                    <img src={logo} alt="Ideko logo" className={classes.img}/>
                </div>
                <div className={classes.app_title}>
                    Ideko test app
                </div>
            </header>
        </NavLink>
    )
}
