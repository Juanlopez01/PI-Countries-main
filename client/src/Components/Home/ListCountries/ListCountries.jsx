import React, {useState, useEffect} from "react";
import { useSelector} from 'react-redux';
import Page from "./listComponents/Page";
import Loader from "../../Loader";
import style from './ListCountries.module.css'

export default function ListCountries() {
    const [loading, setLoading] = useState(true)
    const countries = useSelector(state => state.countriesLoaded)
    const filteredActivities = useSelector(state => state.filteredActivities)

    let listCountries
    !filteredActivities.length 
    ?listCountries = countries[0]
    :listCountries = filteredActivities

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 500)
        
    }, [listCountries])
    
    return(
        <>
        <div className={style.list__container}>
                {loading && <Loader />}
                {listCountries && !loading && !listCountries.length &&
                <>
                <h1>Country not found</h1>
                </>}
                {countries[0] && !loading && <Page countries={listCountries} />}
        </div>
        </>
    )
}