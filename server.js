const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors({origin: true}))

// Connect to DB
mongoose.connect('mongodb://localhost:27018/silverCovidDB', {useNewUrlParser: true},  { useUnifiedTopology: true })
    .then(() => console.log('Connected to DB...'))
    .catch(err => console.error(`Error: ${err}`))

// Model DB : House Data
// CORRECTION TO BE DONE: Create two models - one for individual houses and one for total number of houses

const HouseData = mongoose.model('HouseData', new mongoose.Schema({
    houseType: {
        type: String,
        required: true,
    },
    housePopulation: {
        type: Number,
        required: true,
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
}))

const AllData = mongoose.model('AllData', new mongoose.Schema({
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
    const allData = await AllData.find()
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

// @post /api/HouseData
// post route to add data items to a particular house type
app.post('/api/HouseData', async (req, res) => {
    const newHouseType = new HouseData({
        houseType: req.body.houseType,  
        housePopulation: req.body.housePopulation,
        cases: req.body.cases,
        active: req.body.active,
        recovered: req.body.recovered,
        deaths: req.body.deaths,
        vaccinated: req.body.vaccinated
    })
    await newHouseType.save()
    res.send(`Successfully added house data!!`)
})

// @post /api/allData
// post route to add data items except houseType
app.post('/api/allData', async (req, res) => {
    const newAllData = new AllData({
        totalPopulation: req.body.totalPopulation,
        totalCases: req.body.totalCases,
        totalActive: req.body.totalActive,
        totalRecoveredCases: req.body.totalRecoveredCases,
        totalDeaths: req.body.totalDeaths,
        totalVaccinated: req.body.totalVaccinated
    })
    await newAllData.save()
    res.send(`Successfully added all data!!`)
})

// @put /api/houseType/updateAllData
// Modify all data of a particular houseType
app.put('/api/:houseType/updateAllData', async (req, res) => {
    const houseType = req.params.houseType
    const updatedData = req.body.updatedData
    await HouseData.findOneAndUpdate(houseType, updatedData)
    res.send(`Successfully updated ${houseType}'s data`)
    const result = await HouseData.find({houseType})
    console.log('Updated data: ', result)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))