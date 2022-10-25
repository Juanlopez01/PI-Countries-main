import React from 'react'
import { Link } from 'react-router-dom'
import style from './About.module.css'


export const About = () => {
  return (
    <div className={style.background}>
        <h1>Juan Pablo Lopez</h1>
        <h3>Full Stack Developer</h3>
        <div className={style.social__container}>
            <a href='https://www.instagram.com/juanlopez01_/'>
                <img src='https://www.svgrepo.com/show/14412/instagram.svg' alt='Instagram'/>
            </a>
            <a href='https://github.com/Juanlopez01/'>
                <img src='https://www.svgrepo.com/show/35001/github.svg' alt='Github'/>
            </a>
            <a href='https://www.linkedin.com/in/juanlopez01/'>
                <img src='https://www.svgrepo.com/show/28145/linkedin.svg' alt='Linkedin'/>
            </a>
        </div>
    </div>
  )
}
