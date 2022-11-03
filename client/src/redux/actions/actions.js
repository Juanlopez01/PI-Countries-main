import axios from 'axios';
import { filterCountries } from '../controllers/controllers';



export const LIST_COUNTRIES ='LIST_COUNTRIES';
export const COUNTRY_DETAIL = 'COUNTRY_DETAIL';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const FILTERED_ACTIVITIES = 'FILTERED_ACTIVITIES';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';


export function pageCountries ({continent, season, order, name}){
    let queryUrl = 'http://143.198.116.7:3001/countries?'
    if(name) queryUrl = queryUrl + `name=${name}&`;
    if(continent) queryUrl = queryUrl + `continent=${continent}&`;
    if(season) queryUrl = queryUrl + `touristSeason=${season}&`;
    if(order) queryUrl = queryUrl + `order=${order}`;
    return async function(dispatch){
       const res = await axios.get(queryUrl);
         return dispatch({
            type: LIST_COUNTRIES,
            payload: res.data
        })
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
    return function(dispatch){
        return axios.get(`http://143.198.116.7:3001/countries/${id}`)
        .then(response => dispatch({
            type: COUNTRY_DETAIL,
            payload: response.data
        }))
    }
}
//PROMISES
export function getActivities () {
    return function (dispatch){
        return axios.get('http://143.198.116.7:3001/activities')
        .then(response => dispatch({
            type:GET_ACTIVITIES,
            payload: response.data
        }))
    }
}

//ASYNC AWAIT
export function addActivity ({name, difficulty, duration, season,image,review, codeCountry}){

    return async function(dispatch){
       const res = await axios.post('http://143.198.116.7:3001/activities', {
            name,
            difficulty: parseInt(difficulty),
            duration: duration,
            season,
            image,
            review,
            codeCountry,
        });
            if(res.data[0][1]){
                alert('Activity created successfully')
                return dispatch({
                type: ADD_ACTIVITY,
                payload: [res.data[0][0], codeCountry]
                })
            } else { 
                alert('Activity already exists')
            }
        
    }
}

export function updateActivity(input, id){
    return function(){
        return axios.put(`http://143.198.116.7:3001/activities/${id}`,input)
        .then(response =>{ 
            if(response.data[0]){
                alert('Activity modified successfully')
            } else {
                alert('The activity could not be modified correctly')
            }
        })
    }
}
export function deleteActivity(id){
    return async function(){
        const res = await axios.delete(`http://143.198.116.7:3001/activities/${id}`)
        
        if(res.data){
            alert('Activity deleted successfully')
        } else {
            alert('The activity could not be deleted correctly')
            }
    }
}