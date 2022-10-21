export function filterCountries (countries, activity){
    let countriesPages = []
    let aux = []
    let countriesFiltered = []
    countries.forEach(count => {
        if(count.touristActivities.length > 0){
            count.touristActivities.forEach(act => {
                if(act.name === activity) countriesFiltered.push(count)
            })
        }
    })
    let countriesFilteredSet = new Set(countriesFiltered)
    let countriesNotRepeat = []
    countriesFilteredSet.forEach(c => countriesNotRepeat.push(c))
    if(countriesNotRepeat.length <= 9){
        countriesNotRepeat.forEach(i => aux.push(i))
        countriesPages.push(aux)
        return countriesPages
    } else {
        for(let i = 0; i < 9; i++){
           let countryAux = countriesNotRepeat.shift()
           aux.push(countryAux) 
        }
        countriesPages.push(aux)
        for(let i = 0; i < countriesNotRepeat.length / 10; i++){
            aux = []
            for(let j = 0; j < 10 ; i++){
                let countryAux = countriesNotRepeat.shift()
                aux.push(countryAux)
            }
            countriesPages.push(aux)
        }
        return countriesPages
    }
    
}