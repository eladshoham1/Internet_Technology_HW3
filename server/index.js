require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
     useNewUrlParser: true,
     useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

const placesRouter = require('./routers/places');
app.use('/places', placesRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server Started'));