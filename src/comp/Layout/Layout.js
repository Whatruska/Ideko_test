import React from "react";
import {Helmet} from "react-helmet";
import Header from "./Header/Header";

export default function Layout({title, children}) {
    return(
        <>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href="../../assets/img/favicon.ico"/>
            </Helmet>
            <header>
                <Header/>
            </header>
            {children}
        </>
    )
}
