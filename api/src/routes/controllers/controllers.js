const { Country, TouristActivity } = require('../../db')
const axios = require('axios')
const {Op} = require('sequelize')

//Lleva toda la info de la api a la base de datos
const allApiToDB = async () => {
    let dataApi = await (axios.get('https://restcountries.com/v3/all')
    .then(response => response.data.map(
    _country => {

        //Evaluo si existe la capital o es undefined
        let countryCapital
        !_country.capital
        ?countryCapital = _country.name.common
        :countryCapital = _country.capital[0];

        //Armo el objeto que luego ira a la db
         return myObj = {
            id: _country.cca3,
            name: _country.name.common,
            capital: countryCapital,
            area: `${Math.floor(_country.area)} km2`,
            population: _country.population,
            continent: _country.continents[0],
            sub_region: _country.subregion,
            image: _country.flags[0]
        }
    }
)))
    //Subimos la data de la api a la base de datos y retornamos
    let allData = await Country.bulkCreate(dataApi)
    return allData
}

const searchCountryByName = async (name) => {
    let countryName
    name.includes('%')
    ? countryName = name.split('%').map(word=> word[0].toUpperCase()+ word.slice(1)).join(' ')
    : countryName = name.split('')[0].toUpperCase() + name.slice(1);

    //Busco todos los paises en el que el nombre coincida con lo recibido por query. (iLike matchea todo lo que contenga countryName y es insensitive)
    const _country = await Country.findAll({where: {name: { [Op.iLike]: `%${countryName}%` }}})
    if(!_country.length) throw new Error('Country not found')
    return _country
}

const addActivity = async (name, difficulty, duration, season, codeCountry) => {
        const newActivity = await TouristActivity.create({name, difficulty, duration, season,})
        const newActivityId = await TouristActivity.findByPk(newActivity.id)
        await newActivityId.setCountry(codeCountry)
        return newActivity
}

module.exports = {
    allApiToDB,
    searchCountryByName,
    addActivity,
}
