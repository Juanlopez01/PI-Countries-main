import React from "react";
import style from './Filter.module.css'
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { pageCountries, activitiesFilter, getActivities} from "../../../redux/actions/actions";
import {Link} from 'react-router-dom'

export default function Filter(){
    const [error, setError] = useState(false)
    const [input, setInput] = useState({
        continent:'',
        season: '',
        order:'AtoZ',
        name:''
    });
    const countries = useSelector(state => state.countriesLoaded)
    const nameActivities = useSelector(state => state.activitiesLoaded)
    const dispatch = useDispatch();
    const regExpLettersOnly = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$"


    useEffect(()=>{
        if(!nameActivities.length) dispatch(getActivities())
        if(input.name.match(regExpLettersOnly) || input.name === '')dispatch(pageCountries(input))
    }, [input, nameActivities])
    const changeHandler = (event) => {
        if(event.target.value.match(regExpLettersOnly)){
            setError(false)
            setInput({...input, [event.target.name]: event.target.value})             
        } else {
            setError(true)
            setInput({...input, [event.target.name]: event.target.value})
        }
    }
    const inputHandler = (event) => {
        console.log(event.target.value);
        event.target.value === ''
        ?dispatch(activitiesFilter('clean'))
        :dispatch(activitiesFilter(countries, event.target.value))
    }
    const clickContinentHandler = (event) => {
        setInput({...input, continent: event.target.name})
        dispatch(pageCountries(input))
    }
    const clickSeasonHandler = (event) => {
        setInput({...input, season: event.target.name})
        dispatch(pageCountries(input))
    }
    const clickOrderHandler = (event) => {
        setInput({...input, order: event.target.name})
        dispatch(pageCountries(input))
    }
    return(
        <>
        <div className={style.filter__container}>
            <div className={style.filter__search}>
                <input type='text' name='name' value={input.name} onChange={(e) => changeHandler(e)} placeholder='Search country' className={error? style.filter__input__error: style.filter__input} />
            </div>
            <div className={style.filter__continents}>
                <h3>Continents:</h3>
                <div className={style.continents__filter}>
                    <button name="Africa" onClick={(e) => clickContinentHandler(e)} className={style.filter__buttons}>Africa</button>
                    <button name="Asia" onClick={(e) => clickContinentHandler(e)} className={style.filter__buttons}>Asia</button>
                    <button name="Europe" onClick={(e) => clickContinentHandler(e)} className={style.filter__buttons}>Europe</button>
                    <button name="Oceania" onClick={(e) => clickContinentHandler(e)} className={style.filter__buttons}>Oceania</button>
                    <button name="North America" onClick={(e) => clickContinentHandler(e)} className={style.filter__buttons}>North America</button>
                    <button name="South America" onClick={(e) => clickContinentHandler(e)} className={style.filter__buttons}>South America</button>
                    <button name="Antarctica" onClick={(e) => clickContinentHandler(e)} className={style.filter__buttons}>Antarctica</button>
                    <button name="" onClick={(e) => clickContinentHandler(e)} className={style.filter__buttons}>Delete continent</button>
                </div>
            </div>
            <div className={style.filter__seasons__container}>
                <h3>Seasons:</h3>
                <div className={style.filter__seasons}>
                    <button name="summer" onClick={(e) => clickSeasonHandler(e)} className={style.filter__buttons}>Summer</button>
                    <button name="fall" onClick={(e) => clickSeasonHandler(e)} className={style.filter__buttons}>Fall</button>
                    <button name="spring" onClick={(e) => clickSeasonHandler(e)} className={style.filter__buttons}>Spring</button>
                    <button name="winter" onClick={(e) => clickSeasonHandler(e)} className={style.filter__buttons}>Winter</button>
                    <button name="" onClick={(e) => clickSeasonHandler(e)} className={style.filter__buttons}>Delete season</button>
                </div>
            </div>

            <h3>Choose an activity:</h3>
            <select name='activities' className={style.form__inputs} onChange={(e) => inputHandler(e)}>
                <option key='' value=''></option>
                {nameActivities.length > 0 && nameActivities.map( act => {
                    if(Array.isArray(act)){
                        return <option key={act[0].id} value={act[0].name}>{act[0].name}</option>
                    };
                    return <option key={act.id} value={act.name}>{act.name}</option>
                })}
                
            </select>

            <div className={style.filter__order__container}>
                <h3>Order:</h3>
                <div className={style.filter__order}>
                <button name="AtoZ" onClick={(e) => clickOrderHandler(e)} className={style.filter__buttons}>A-Z</button>
                <button name="ZtoA" onClick={(e) => clickOrderHandler(e)} className={style.filter__buttons}>Z-A</button>
                <button name="populationDesc" onClick={(e) => clickOrderHandler(e)} className={style.filter__buttons}>More population</button>
                <button name="populationAsc" onClick={(e) => clickOrderHandler(e)} className={style.filter__buttons}>Less population</button>
                </div>
            </div>
            <Link to="/activities" className={style.activities__buttom}>Add Activity</Link>
        </div>
        </>
    )
}