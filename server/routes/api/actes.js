const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const router = express.Router();
const schemaActes = mongoose.Schema({

    nom :           String,
    description :   String,
    duree :         Number,
    prix :          Number
})


const Acte = mongoose.model('Acte', schemaActes);

app.use(express.json());
// getdata
router.get('/', async (req, res) => {

    const data = await Acte.find();
    res.send(data)
})
// insert data
router.post('/', async (req, res) => {
    const acte = new Acte({
        nom :   req.body.nom,
        description :req.body.description,
        duree :   req.body.duree,
        prix :   req.body.prix
    })
    data = await acte.save();
    res.send(data)
})
// update data
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const acte = await Acte.findById(id);
    acte.nom    = req.body.nom;
    acte.description  = req.body.description;
    acte.duree     = req.body.duree ;
    acte.prix     = req.body.prix;

    const data = await acte.save();
    res.send(data);
})
// delete data
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const acte = await Acte.findById(id);
    
    const data = await acte.delete();
    res.send(data); //equal return
})

module.exports = router;