const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const router = express.Router();
const schemaPatients = mongoose.Schema({

    nom :       String,
    prenom :    String,
    age :       Number,
    sex :       String,
    tele :      String
})


const Patient = mongoose.model('Patient', schemaPatients);

app.use(express.json());
// getdata
router.get('/', async (req, res) => {

    const data = await Patient.find();
    res.send(data)
})
// insert data
router.post('/', async (req, res) => {
    const patient = new Patient({
        nom :   req.body.nom,
        prenom :req.body.prenom,
        age :   req.body.age,
        sex :   req.body.sex,
        tele :  req.body.tele
    })
    data = await patient.save();
    res.send(data)
})
// update data
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const patient = await Patient.findById(id);
    patient.nom    = req.body.nom;
    patient.prenom  = req.body.prenom;
    patient.age     = req.body.age ;
    patient.sex     = req.body.sex;
    patient.tele     = req.body.tele;

    const data = await patient.save();
    res.send(data);
})

// delete data
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const patient = await Patient.findById(id);
    
    const data = await patient.delete();
    res.send(data);
})
module.exports = router;