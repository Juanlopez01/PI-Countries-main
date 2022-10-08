const { Router } = require('express');
const {Op} = require('sequelize')
const { TouristActivity } = require('../models/TouristActivity');
const { Country } = require('../db');
const axios = require('axios')
const { allApiToDB, searchCountryByName } = require('./controllers/controllers')
const router = Router();

router.get('/', async (req, res) => {
    try {
        const { name } = req.query
        if(!name){
            //evaluo si existe algo en la db
            let allCountries =  await Country.findAll()
            //Si no existe, ejecuto el controller que me guarda los datos en la db
            if(!allCountries.length) allCountries = await allApiToDB();
            return res.status(200).json(allCountries)
        } else {
            //Si existe query utilizo la funcion para traer aquellos paises con coincidencias            
            const _country = await searchCountryByName(name)
            return res.status(200).json(_country)
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
        const _country = await Country.findByPk(id.toUpperCase())
        return res.status(200).json(_country)
    } catch (error) {
        return res.status(400).json(error.message)
    }
    
})

module.exports = router