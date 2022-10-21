const { Router } = require('express');
const {Op} = require('sequelize')
const { addActivity, getAllActivities} = require('./controllers/controllers')
const router = Router();

router.post('/', async (req, res) => {
    try {
        const {name, difficulty, duration, season, image, codeCountry} = req.body
        const newActivity = await addActivity(name, difficulty, duration, season, image, codeCountry);
        return res.status(200).json(newActivity)
    } catch (error) {
        return res.status(400).json(error.message)
    }
})

router.get('/', async (req, res) => {
    try {
        const listOfActivities = await getAllActivities()
        if(!listOfActivities.length) throw new Error('Does not exist activities')
        return res.status(200).json(listOfActivities)
    } catch (error) {
        return res.status(400).json(error.message)
    }
})



module.exports = router