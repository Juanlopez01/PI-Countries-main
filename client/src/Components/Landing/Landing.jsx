import React from "react";
import { Link, NavLink } from "react-router-dom";
import style from './Landing.module.css'


export default function Landing () {

    return(
        <>
        <div className={style.background}>
            <div className={style.container}>
                <div className={style.landingHeader}>
                    <img src='https://www.svgrepo.com/show/234796/world.svg' alt="" />
                    <div className={style.landingHeader__nav}>
                        <Link to='/home' className={style.link}>HOME</Link>
                        <Link to='/about' className={style.link}>ABOUT</Link>
                    </div>
                </div>
                <div className={style.landingMain}>
                    <div className={style.landingText}>
                        <div className={style.landingText__text}>
                            <h2>Are you ready to travel around the world?</h2>
                            <button className={style.button}><Link to='/home' className={style.linkbutton}>Let's go!</Link></button>
                        </div>
                    </div>
                    <div className={style.landingImage}>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}