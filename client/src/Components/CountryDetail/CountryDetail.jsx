import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../../redux/actions/actions";
import Loader from "../Loader";
import {Link} from 'react-router-dom';
import style from './CountryDetail.module.css'
import ActivityCard from "./Activities/ActivityCard";



export default function CountryDetail ({match}){
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const country = useSelector(state => state.countryDetail)
    const [Detail, setDetail] = useState(null)
    const id = match.params.id

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            dispatch(getCountryDetail(id))
            setLoading(false)
            setDetail('finished')
        },1000)
        

        return (setDetail(null))
    }, [id])
    return (
    <div className={style.background}>
    
    {loading && <div className={style.loader}><Loader /></div>}
    <div className={style.detail__background}>
    {Detail && !loading && 
    <>
        <div className={style.flag__background}>
            <Link to='/home' className={style.button__back}>Back</Link>
            <img src={country.image} alt={country.name} />
        </div>
        <div className={style.detail__country}>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Continent: {country.continent}</p>
        <p>Subregion: {country.sub_region}</p>
        <p>Area: {country.area}</p>
        <p>Population: {country.population}</p>
        </div>
        <div className={style.activities__section}>
        {country.touristActivities && country.touristActivities.length > 0 && country.touristActivities.map(activity => {
            return(
            <>
            <ActivityCard activity={activity} />
            </>)
            })}
        {!country.touristActivities || country.touristActivities.length === 0 && <h3>There are not activities</h3>}
        </div>
      
    </>}
    </div>
    </div>)
} 