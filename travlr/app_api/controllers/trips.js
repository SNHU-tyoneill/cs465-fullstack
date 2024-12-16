const mongoose = require("mongoose");
const Trip = require("../models/travlr"); // Register model
const User = mongoose.model("users");
const Model = mongoose.model("trips");

const getUser = async (req, res) => {
    try {
        console.log("Full request auth:", req.auth); // Changed from req.payload to req.auth
        console.log("Authorization header:", req.headers.authorization);
        
        if (!req.auth || !req.auth.email) {  // Changed from req.payload to req.auth
            console.log("Missing auth or email");
            return null;
        }

        const user = await User.findOne({ email: req.auth.email }).exec();  // Changed from req.payload to req.auth
        console.log("Found user:", user);
        
        if (!user) {
            console.log("No user found for email:", req.auth.email);  // Changed from req.payload to req.auth
            return null;
        }

        return user;
    } catch (err) {
        console.error("Error in getUser:", err);
        return null;
    }
};

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
  const q = await Model.find({}) // No filter, return all records
    .exec();

  // Uncomment the following line to show results of querey
  // on the console
  console.log(q);

  if (!q) {
    // Database returned no data
    return res.status(404).json(err);
  } else {
    // Return resulting trip list
    return res.status(200).json(q);
  }
};

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async (req, res) => {
  const q = await Model.find({ code: req.params.tripCode }) // Return single record
    .exec();

  // Uncomment the following line to show results of querey
  // on the console
  // console.log(q);

  if (!q) {
    // Database returned no data
    return res.status(404).json(err);
  } else {
    // Return resulting trip list
    return res.status(200).json(q);
  }
};

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return res
                .status(401)
                .json({"message": "Unauthorized - No valid token provided"});
        }

        const trip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        return res
            .status(201)
            .json(trip);

    } catch (err) {
        console.error("Error in tripsAddTrip:", err);
        return res
            .status(400)
            .json(err);
    }
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return res
                .status(401)
                .json({"message": "Unauthorized - No valid token provided"});
        }

        const trip = await Trip.findOneAndUpdate(
            {'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        );

        if (!trip) {
            return res
                .status(404)
                .json({"message": "Trip not found with code " + req.params.tripCode});
        }

        return res
            .status(200)
            .json(trip);

    } catch (err) {
        console.error("Error in tripsUpdateTrip:", err);
        return res
            .status(500)
            .json(err);
    }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
};
