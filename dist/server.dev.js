"use strict";

var express = require('express');

var app = express();

var cors = require('cors');

var mongoose = require('mongoose');

app.use(express.json());
app.use(cors({
  origin: true
})); // Connect to DB

mongoose.connect('mongodb://localhost:27018/silverCovidDB', {
  useNewUrlParser: true
}, {
  useUnifiedTopology: true
}).then(function () {
  return console.log('Connected to DB...');
})["catch"](function (err) {
  return console.error("Error: ".concat(err));
}); // Model DB : House Data
// CORRECTION TO BE DONE: Create two models - one for individual houses and one for total number of houses

var HouseData = mongoose.model('HouseData', new mongoose.Schema({
  houseType: {
    type: String,
    required: true
  },
  housePopulation: {
    type: Number,
    required: true
  },
  cases: {
    type: Number,
    required: true,
    "default": 0
  },
  active: {
    type: Number,
    required: true,
    "default": 0
  },
  recovered: {
    type: Number,
    required: true,
    "default": 0
  },
  deaths: {
    type: Number,
    required: true,
    "default": 0
  },
  vaccinated: {
    type: Number,
    required: true,
    "default": 0
  }
}));
var AllData = mongoose.model('AllData', new mongoose.Schema({
  totalPopulation: {
    type: Number,
    required: true,
    "default": 0
  },
  totalCases: {
    type: Number,
    required: true,
    "default": 0
  },
  totalActiveCases: {
    type: Number,
    required: true,
    "default": 0
  },
  totalRecoveredCases: {
    type: Number,
    required: true,
    "default": 0
  },
  totalDeaths: {
    type: Number,
    required: true,
    "default": 0
  },
  totalVaccinated: {
    type: Number,
    required: true,
    "default": 0
  }
})); // Get Routes
// @get /api/allData
// Returns every data of all houses

app.get('/api/allData', function _callee(req, res) {
  var allData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(AllData.find());

        case 2:
          allData = _context.sent;
          console.log('All Data: ', allData);
          res.send(allData);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); // @get /api/allData/houseType
// Returns data of a particular house type

app.get('/api/allData/:houseType', function _callee2(req, res) {
  var houseData;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(HouseData.find({
            houseType: req.params.houseType
          }));

        case 2:
          houseData = _context2.sent;
          console.log("Data of ".concat(req.params.houseType, ": ").concat(houseData));
          res.send(houseData);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // @post /api/HouseData
// post route to add data items to a particular house type

app.post('/api/HouseData', function _callee3(req, res) {
  var newHouseType;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          newHouseType = new HouseData({
            houseType: req.body.houseType,
            housePopulation: req.body.housePopulation,
            cases: req.body.cases,
            active: req.body.active,
            recovered: req.body.recovered,
            deaths: req.body.deaths,
            vaccinated: req.body.vaccinated
          });
          _context3.next = 3;
          return regeneratorRuntime.awrap(newHouseType.save());

        case 3:
          res.send("Successfully added house data!!");

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // @post /api/allData
// post route to add data items except houseType

app.post('/api/allData', function _callee4(req, res) {
  var newAllData;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          newAllData = new AllData({
            totalPopulation: req.body.totalPopulation,
            totalCases: req.body.totalCases,
            totalActive: req.body.totalActive,
            totalRecoveredCases: req.body.totalRecoveredCases,
            totalDeaths: req.body.totalDeaths,
            totalVaccinated: req.body.totalVaccinated
          });
          _context4.next = 3;
          return regeneratorRuntime.awrap(newAllData.save());

        case 3:
          res.send("Successfully added all data!!");

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // @put /api/houseType/updateAllData
// Modify all data of a particular houseType

app.put('/api/:houseType/updateAllData', function _callee5(req, res) {
  var houseType, updatedData, result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          houseType = req.params.houseType;
          updatedData = req.body.updatedData;
          _context5.next = 4;
          return regeneratorRuntime.awrap(HouseData.findOneAndUpdate(houseType, updatedData));

        case 4:
          res.send("Successfully updated ".concat(houseType, "'s data"));
          _context5.next = 7;
          return regeneratorRuntime.awrap(HouseData.find({
            houseType: houseType
          }));

        case 7:
          result = _context5.sent;
          console.log('Updated data: ', result);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});