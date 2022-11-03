const { Router } = require('express');
const {Op} = require('sequelize')
const { TouristActivity } = require('../db');
const { Country } = require('../db');
const axios = require('axios')
const { allApiToDB, searchCountryByName, countriesOrder, pagination, countriesFilters } = require('./controllers/controllers')
const router = Router();

router.get('/', async (req, res) => {
    try {
        const { name, order, touristSeason, continent} = req.query
        if(!name){
            let allCountries
            let filterCountries
            let pageCountries
            //evaluo si existe algo en la db
            allCountries =  await Country.findAll()
            //Si no existe, ejecuto el controller que me guarda los datos en la db
            if(!allCountries.length) allCountries = await allApiToDB();
            filterCountries = await countriesOrder(order, touristSeason, continent)
            pageCountries = await pagination(filterCountries)
            return res.status(200).json(pageCountries)
        } else {
            //Si existe query utilizo la funcion para traer aquellos paises con coincidencias
            let _countryOrder = await countriesOrder(order, touristSeason, continent, name)
            let pageCountry = await pagination(_countryOrder)
            return res.status(200).json(pageCountry)
        }
        
    } catch (error) {
        return res.status(404).json(error.message)
    }   
})

router.get('/:id', async (req, res) => {
    try {
        //Extraigo el id de params
        const {id} = req.params;
        //busco en mi base de datos el pais con dicho id (toUpperCase porque el id en la db esta en mayus)
        const _country = await Country.findByPk(id.toUpperCase(), {
            include: TouristActivity,
        })
        return res.status(200).json(_country)
    } catch (error) {
        return res.status(400).json(error.message)
    }
    
})

module.exports = router