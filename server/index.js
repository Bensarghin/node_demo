const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())

const patients = require('./routes/api/patients');
app.use('/api/patients', patients);

const actes = require('./routes/api/actes');
app.use('/api/actes', actes);

const rendez_vs = require('./routes/api/rendez_vs');
app.use('/api/rendez_vs', rendez_vs);

mongoose.connect('mongodb://127.0.0.1:27017/g_rdv')
    .then(() => console.log('mongodb is connected'))
    .catch(err => console.log(err))

const PORT =  4000 || process.env.PORT;
app.listen(PORT, ()=> console.log(`app running on : ${ PORT }`) )