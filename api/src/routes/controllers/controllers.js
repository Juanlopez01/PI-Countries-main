const { Country, TouristActivity } = require('../../db')
const axios = require('axios')
const {Op} = require('sequelize')


//Lleva toda la info de la api a la base de datos
const allApiToDB = async () => {
    let dataApi = await (axios.get('https://restcountries.com/v3/all')
    .then(response => response.data.map(
    _country => {

        //Validamos que exista capital
        let cityCapital
        _country.capital
        ? cityCapital = _country.capital[0]
        : cityCapital = _country.name.common

        //Armo el objeto que luego ira a la db
         return myObj = {
            id: _country.cca3,
            name: _country.name.common,
            capital: cityCapital,
            area: `${Math.floor(_country.area)} km2`,
            population: _country.population,
            continent: _country.continents[0],
            sub_region: _country.subregion || _country.region,
            image: _country.flags[0]
        }
    }
)))
    //Subimos la data de la api a la base de datos y retornamos
    let allData = await Country.bulkCreate(dataApi)
    return allData
}

const searchCountryByName = async (name) => {
    let countryName = nameTransform(name)
    

    //Busco todos los paises en el que el nombre coincida con lo recibido por query. (iLike matchea todo lo que contenga countryName y es insensitive)
    const _country = await Country.findAll({where: {name: { [Op.iLike]: `%${countryName}%` }}})
    if(!_country.length) throw new Error('Country not found')
    return _country
}

const addActivity = async (name, difficulty, duration, season, image, codeCountry) => {
let newActivities = []
    for(code of codeCountry){
        for(seas of season){
            let [row, create] = await TouristActivity.findOrCreate({
                where: {name, difficulty, duration, season:seas, image}})
           await row.addCountry(code)
           newActivities.push([row, create])
        }
    }
    return newActivities
}

const getAllActivities = async () => {
    const listActivities = await TouristActivity.findAll({ include: Country})
    return listActivities
}

const countriesOrder = async (order, touristSeason, continent, countryName) => {
    let orderCountries
    let whereFilter
    countryName
    ? continent
        ?whereFilter = {name: { [Op.iLike]: `%${nameTransform(countryName)}%` }, continent: nameTransform(continent)}
        :whereFilter = {name: { [Op.iLike]: `%${nameTransform(countryName)}%` }}
    : continent
        ?whereFilter = {continent: nameTransform(continent)}
        :whereFilter={}

    //Si ingresamos filtro de continente, evalua si que tipo de ordenamiento utiliza
    if(continent){
            switch(order){
                case 'AtoZ':
                    orderCountries = await Country.findAll({
                        where: whereFilter,
                        order:[ ['name', 'ASC']],
                        include: TouristActivity
                    })
                    break;
                case 'ZtoA':
                    orderCountries = await Country.findAll({
                        where:whereFilter,
                        order: [['name', 'DESC']],
                        include: TouristActivity
                    })
                    break;
                case 'populationAsc':
                    orderCountries = await Country.findAll({
                        where: whereFilter,
                        order: [['population', 'ASC']],
                        include: TouristActivity
                    })
                    break;
                case 'populationDesc':
                    orderCountries = await Country.findAll({
                        where: whereFilter,
                        order: [['population', 'DESC']],
                        include: TouristActivity
                    })
                    break;
                default:
                    orderCountries = await Country.findAll({
                        where: whereFilter,
                        order:[ ['name', 'ASC']],
                        include: TouristActivity
                    })
                    break;
            } 
        }else{
            switch(order){
                case 'AtoZ':
                    orderCountries = await Country.findAll({
                        where:whereFilter,
                        order:[ ['name', 'ASC']],
                        include: TouristActivity
                    })
                    break;
                case 'ZtoA':
                    orderCountries = await Country.findAll({
                        where:whereFilter,
                        order: [['name', 'DESC']],
                        include: TouristActivity
                    })
                    break;
                case 'populationAsc':
                    orderCountries = await Country.findAll({
                        where:whereFilter,
                        order: [['population', 'ASC']],
                        include: TouristActivity
                    })
                    break;
                case 'populationDesc':
                    orderCountries = await Country.findAll({
                        where:whereFilter,
                        order: [['population', 'DESC']],
                        include: TouristActivity
                    })
                    break;
                default:
                    orderCountries = await Country.findAll({
                        include: TouristActivity    
                    })
                    break;
            } 
        }
        //Independientemente de que se haya proporcionado un continente, si existe una estacion, filtra por los
        //paises que posean actividades en dicha estacion
        if(touristSeason){
            orderCountries = orderCountries.filter(_country => {
                let actCountry = _country.touristActivities.filter(act => act.season === touristSeason);
                if(actCountry.length) return _country;
            });
                    
        };
    return orderCountries
}

const nameTransform = (name) => {
    let newName
    name.includes('%')
    ? newName = name.split('%').map(word=> word[0].toUpperCase()+ word.slice(1)).join(' ')
    : newName = name.split('')[0].toUpperCase() + name.slice(1);
    return newName
}

const pagination = (array) => {
    let pageCountries = []
   for(let page = 1; page < (array.length / 10) + 1; page++){
    if(page === 1) {
        pageCountries[page - 1] = array.slice(0, 9);
    } else {
        let ini =  (9 + 10 * (page - 2))
        let fin = (9 + 10 * (page - 2)) + 10
        pageCountries[page - 1] = array.slice(ini, fin)
    }
}    
    
    return pageCountries
}
module.exports = {
    allApiToDB,
    searchCountryByName,
    addActivity,
    countriesOrder,
    pagination,
    getAllActivities,
}
