const express = require('express')
const Joi = require('joi')
const app = express()
const mongoose = require('mongoose')

// Connect to DB
mongoose.connect('mongodb://localhost:27018/silverCovidDB', {useNewUrlParser: true})
    .then(() => console.log('Connected to DB...'))
    .catch(err => console.error(`Error: ${err}`))

// Model DB : House Data
const HouseData = mongoose.model('HouseData', new mongoose.Schema({
    houseType: {
        // Buildings, Onyx, Topaz, Emerald, Office
        type: String,
        required: true,
        housePopulation: {
            type: Number,
            required: true,
            default: 0
        },
        cases: {
            type: Number,
            required: true,
            default: 0
        },
        active: {
            type: Number,
            required: true,
            default: 0
        },
        recovered: {
            type: Number,
            required: true,
            default: 0
        },
        deaths: {
            type: Number,
            required: true,
            default: 0
        },
        vaccinated: {
            type: Number,
            required: true,
            default: 0
        },

    },
    totalPopulation: {
        type: Number,
        required: true,
        default: 0
    },
    totalCases: {
        type: Number,
        required: true,
        default: 0
    },
    totalActiveCases: {
        type: Number,
        required: true,
        default: 0
    },
    totalRecoveredCases: {
        type: Number,
        required: true,
        default: 0
    },
    totalDeaths: {
        type: Number,
        required: true,
        default: 0
    },
    totalVaccinated: {
        type: Number,
        required: true,
        default: 0
    }
}))

// Get Routes

// @get /api/allData
// Returns every data of all houses
app.get('/api/allData', async (req, res) => {
    const allData = await HouseData.find()
    console.log('All Data: ', allData)
    res.send(allData)
})

// @get /api/allData/houseType
// Returns data of a particular house type
app.get('/api/allData/:houseType', async (req, res) => {
    const houseData = await HouseData.find({houseType: req.params.houseType})
    console.log(`Data of ${req.params.houseType}: ${houseData}`)
    res.send(houseData)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))