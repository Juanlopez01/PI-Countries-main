import { LIST_COUNTRIES, COUNTRY_DETAIL, ADD_ACTIVITY, GET_ACTIVITIES, FILTERED_ACTIVITIES} from "../actions/actions"

const initialState = {
    countriesLoaded: [],
    activitiesLoaded: [],
    filteredActivities: [],
    countryDetail: {}
}

export default function rootReducer(state = initialState, {type, payload}) {
    switch(type){
        case LIST_COUNTRIES:
            return {...state, countriesLoaded: [ payload]}
        
        case COUNTRY_DETAIL:
            return {...state, countryDetail: payload}

        case ADD_ACTIVITY:
            return {...state, activitiesLoaded: [...state.activitiesLoaded, payload]}

        case GET_ACTIVITIES:
            return {...state, activitiesLoaded: payload} 

        case FILTERED_ACTIVITIES:
            return {...state, filteredActivities: payload}    
        default:
            return state
    }
}