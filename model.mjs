import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const database = mongoose.connection;

database.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Travlling collection using Mongoose.');
    }
});

const travelSchema = mongoose.Schema({
	destination: { type: String, required: true },
	days:        { type: Number, required: true, default:0 },
	date:        { type: Date, required: true, default: Date.now }
});

const Travel = mongoose.model("Travel", travelSchema);

// CREATE model *****************************************
const createTravel = async (destination, days, date) => {
    const travel = new Travel({ 
        destination: destination, 
        days: days, 
        date: date
    });
    return travel.save();
}

// RETRIEVE models *****************************************
// Retrieve based on a filter and return a promise.
const retrieveTravels = async () => {
    const query = Travel.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveTravelByID = async (_id) => {
    const query = Travel.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id  *****************************************
const deleteTravelById = async (_id) => {
    const result = await Travel.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateTravel = async (_id, destination, days, date) => {
    const result = await Travel.replaceOne({_id: _id }, {
        destination: destination, 
        days: days, 
        date: date
    });
    return { 
        _id: _id, 
        destination: destination, 
        days: days, 
        date: date
    }
}

export { createTravel, retrieveTravels, retrieveTravelByID, updateTravel, deleteTravelById }