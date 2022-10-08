const { Router } = require('express');
const {Op} = require('sequelize')
const { TouristActivity } = require('../db');
const { Country } = require('../db');
const { addActivity } = require('./controllers/controllers')
const router = Router();

router.post('/', async (req, res) => {
    try {
        const {name, difficulty, duration, season, codeCountry} = req.body
        if(!name || !difficulty || !duration || !season || !codeCountry) throw new Error('Faltan Datos');
        const newActivity = await addActivity(name, difficulty, duration, season, codeCountry);
        return res.status(200).json(newActivity)
    } catch (error) {
        return res.status(400).json(error.message)
    }
})



module.exports = router