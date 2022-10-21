import axios from 'axios';
import { filterCountries } from '../controllers/controllers';



export const LIST_COUNTRIES ='LIST_COUNTRIES';
export const COUNTRY_DETAIL = 'COUNTRY_DETAIL';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const FILTERED_ACTIVITIES = 'FILTERED_ACTIVITIES';


export function pageCountries ({continent, season, order, name}){
    let queryUrl = 'http://localhost:3001/countries?'
    if(name) queryUrl = queryUrl + `name=${name}&`;
    if(continent) queryUrl = queryUrl + `continent=${continent}&`;
    if(season) queryUrl = queryUrl + `touristSeason=${season}&`;
    if(order) queryUrl = queryUrl + `order=${order}`;
    return async function(dispatch){
        await axios.get(queryUrl)
        .then(response => dispatch({
            type: LIST_COUNTRIES,
            payload: response.data
        }))
    }
}

export function activitiesFilter(countries, activity){
    let countriesFiltered
    if(countries === 'clean'){
        countriesFiltered = []
    } else {
        const flatCountries = countries[0].flat()
        countriesFiltered = filterCountries(flatCountries, activity) 
    }
    

    return async function (dispatch) {
        await dispatch({
            type: FILTERED_ACTIVITIES,
            payload: countriesFiltered
        })
    }
}

export function getCountryDetail (id){
    return async function(dispatch){
        await axios.get(`http://localhost:3001/countries/${id}`)
        .then(response => dispatch({
            type: COUNTRY_DETAIL,
            payload: response.data
        }))
    }
}
export function getActivities () {
    return async function (dispatch){
        await axios.get('http://localhost:3001/activities')
        .then(response => dispatch({
            type:GET_ACTIVITIES,
            payload: response.data
        }))
    }
}
export function addActivity ({name, difficulty, duration, season,image, codeCountry}){

    return async function(dispatch){
        await axios.post('http://localhost:3001/activities', {
            name,
            difficulty: parseInt(difficulty),
            duration: duration,
            season,
            image,
            codeCountry,
        })
        .then(response => {
            if(response.data[0][1]){
                alert('Actividad creada correctamente')
                return dispatch({
                type: ADD_ACTIVITY,
                payload: [response.data[0][0], codeCountry]
                })
            } else { 
                alert('Ya existe la actividad')
            }
})
    }
}