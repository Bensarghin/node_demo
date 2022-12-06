const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const Joi = require('joi');
const bodyParser = require('body-parser');
const app = express();

const router = express.Router();
const schemaRendey_vs = mongoose.Schema({

    date_rdv :  {type: String},
    status :    String,
    patient :
       {type: mongoose.Schema.Types.ObjectId,
       ref: "Patient"},
    acte:   {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Acte"
    }
})


const Rendey_v = mongoose.model('Rendey_v', schemaRendey_vs);
// getdata
router.get('/', async (req, res) => {

    const data = await Rendey_v.find().populate('patient').populate('acte');
    res.send(data)
})
// insert data
const RdvSchema = Joi.object({
    date_rdv :   Joi.date().greater('1-1-1974').required(),
    patient :    Joi.string().alphanum().required(),
    acte :   Joi.string().alphanum().required()
});
router.post('/', async (req, res) => {
    const dataToValidate = req.body;
    const rdvErrors = RdvSchema.validate(dataToValidate);
    if(rdvErrors.error) { 
       return res.send(rdvErrors)
    }
    const rendey_v = new Rendey_v({
        date_rdv :   req.body.date_rdv,
        status :     "En cours",
        patient :    req.body.patient,
        acte :   req.body.acte
    })
    data = await rendey_v.save();
    res.send({message: "Enregistrer"})
})

// update data
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const rendey_v = await Rendey_v.findById(id);
    rendey_v.date_rdv    = req.body.date_rdv;
    rendey_v.acte  = req.body.acte;

    const data = await rendey_v.save();
    res.send(data);
})

// Modifier le Status seulement
router.put('/status/:id', async (req, res) => {
    const id = req.params.id;

    const rendey_v = await Rendey_v.findById(id);
    
    var status = "En cours";
    if(rendey_v) {

        
     if(rendey_v.status == "Passé")   {
        status  = "En cours";
        }
    if(rendey_v.status == "En cours")   {
        status  = "En attente";
        }
    if(rendey_v.status == "En attente")   {
        status  = "Passé";
        }
    rendey_v.status = status;
    // 'await': pour attendre la fin de l'enregistrement .save()
    const data = await rendey_v.save();
    res.send(data);
    }
    else {
        res.send({message:'votre rendez pas exists'})
    }
})
// delete data
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const rendey_v = await Rendey_v.findById(id);
    const data = await rendey_v.delete();
    res.send(data);
})


module.exports = router;