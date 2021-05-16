require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Place = require('./models/place');
const fs = require('fs');

mongoose.connect(process.env.DATABASE_URL, {
     useNewUrlParser: true,
     useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', async () => {
     console.log('Connected to Database');
     const placesCount = await Place.countDocuments().exec();

     if (placesCount === 0) {
          fs.readFile('./places.json', 'utf8', async (err, data) => {
               const places = JSON.parse(data);
               await Place.insertMany(places);
               console.log('places file import into mongoDB');
          })
     }
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

const placesRouter = require('./routers/places');
app.use('/places', placesRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server Started'));