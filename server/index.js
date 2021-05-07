require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
     useNewUrlParser: true,
     useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const placesRouter = require('./routers/places');
app.use('/places', placesRouter);

app.listen(8000, () => console.log('Server Started'));