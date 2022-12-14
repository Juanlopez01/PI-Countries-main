import React from "react";
import Filter from './Filters/Filter'
import ListCountries from './ListCountries/ListCountries'
import ListCountries_class from "./ListCountries/ListCountries_class";
import style from './Home.module.css'


export default function Home(){


    return(
        <>
        <div className={style.home}>
            <div className={style.home__main}>
                <div className={style.home__main__filter}>
                    <Filter />
                </div>
                <div className={style.home__main__listCountries}>
                    <ListCountries_class />
                </div>
            </div>
        </div>
        </>
    )
}