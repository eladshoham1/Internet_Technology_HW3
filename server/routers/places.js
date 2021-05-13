const express = require('express');
const router = express.Router();
const Place = require('../models/place');

// Getting all
router.get('/', async (req, res) => {
    try {
        const places = await Place.find().sort({ likes: -1 });
        res.json(places);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One
router.get('/:id', getPlace, (req, res) => {
    res.json(res.place);
});

// Creating one
router.post('/', async (req, res) => {
    const { name, country, description, images } = req.body;
    var place = new Place({
        name,
        country,
        description
    });

    if (images !== "") {
        place.images = images;
    }

    try {
        await place.save();
        res.redirect('http://127.0.0.1:5500/client/index.html');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating one
router.patch('/:id', getPlace, async (req, res) => {
    res.place.likes += 1;

    try {
        const updatedPlace = await res.place.save();
        res.json(updatedPlace.likes);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting one
router.delete('/:id', getPlace, async (req, res) => {
    try {
        await res.place.remove();
        res.json({ message: 'Deleted place' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getPlace(req, res, next) {
    let place 
    try {
        place = await Place.findById(req.params.id);
        if (place == null) {
            return res.status(404).json({ message: 'Cannot find place' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.place = place;
    next();
}

module.exports = router;