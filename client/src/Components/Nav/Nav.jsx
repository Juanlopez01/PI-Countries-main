import React from "react";
import { Link } from "react-router-dom";
import style from './Nav.module.css'

export default function Nav(){

    return(
        <header className={style.nav__header}>
            <div>
                <h1>Countries App</h1>
            </div>
            <div className={style.nav__header__links}>
                <Link to='/home' className={style.nav__header__links__link}>
                    Home
                </Link>
                <Link to='/about' className={style.nav__header__links__link}>
                    About
                </Link>
            </div>
                
            
        </header>
    )
}