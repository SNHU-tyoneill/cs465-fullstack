const mongoose = require('mongoose');

// Define the trip schema
const tripSchema = new mongoose.Schema({
    code: { type: String, require: true, index: true },
    name: { type: String, require: true, index: true },
    length: { type: String, require: true },
    start: { type: Date, require: true },
    resort: { type: String, required: true },
    perPerson: { type: String, require: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});
const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;