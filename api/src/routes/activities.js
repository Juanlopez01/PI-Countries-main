const { Router } = require('express');
const {Op} = require('sequelize')
const { addActivity, getAllActivities} = require('./controllers/controllers')
const router = Router();
const {TouristActivity} = require('../db')

router.post('/', async (req, res) => {
    try {
        const {name, difficulty, duration, season, image, review,codeCountry} = req.body
        const newActivity = await addActivity(name, difficulty, duration, season, image, review,codeCountry);
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

router.put('/:id', async (req, res) => {
    try {
        const upd = {}
        const {id} = req.params
        const {name, duration, difficulty, image} = req.body
        if(image) upd['image'] = image
        if(name) upd['name'] = name;
        if(duration) upd['duration'] = duration;
        if(difficulty) upd['difficulty'] = difficulty;

        const update = await TouristActivity.update(upd, {
            where:{id,}
        })
        return res.status(200).json(update)
    } catch (error) {
        return res.status(400).json(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params

        const deleted = await TouristActivity.destroy({
            where:{id,}
        })
        return res.status(200).json(deleted)
    } catch (error) {
        return res.status(400).json(error.message)
    }
})


module.exports = router