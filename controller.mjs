import 'dotenv/config';
import express from 'express';
import * as travels from './model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
app.post ('/travels', (req,res) => { 
    travels.createTravel(
        req.body.destination, 
        req.body.days, 
        req.body.date
        )
        .then(travel => {
            res.status(201).json(travel);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'create a document failed' });
        });
});


// RETRIEVE controller ****************************************************
app.get('/travels', (req, res) => {
    travels.retrieveTravels()
        .then(travel => { 
            if (travel !== null) {
                res.json(travel);
            } else {
                res.status(404).json({ Error: 'document not found.' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'retrieve document failed.' });
        });
});


// RETRIEVE by ID controller
app.get('/travels/:_id', (req, res) => {
    travels.retrieveTravelByID(req.params._id)
    .then(travel => { 
        if (travel !== null) {
            res.json(travel);
        } else {
            res.status(404).json({ Error: 'document not found' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'retrieve document failed' });
    });

});


// UPDATE controller ************************************
app.put('/travels/:_id', (req, res) => {
    travels.updateTravel(
        req.params._id, 
        req.body.destination, 
        req.body.days, 
        req.body.date
    )
    .then(travel => {
        res.json(travel);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error: 'document update failed' });
    });
});


// DELETE Controller ******************************
app.delete('/travels/:_id', (req, res) => {
    travels.deleteTravelById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'document no longer exists' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'delete a document failed' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});