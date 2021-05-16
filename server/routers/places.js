const express = require('express');
const router = express.Router();
const Place = require('../models/place');

// Getting all places by pages
router.get('/', paginatedResults(Place), async (req, res) => {
    res.json(res.paginatedResults);
});

// Getting place
router.get('/:id', getPlace, (req, res) => {
    res.json(res.place);
});

// Creating place
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

// Updating place likes
router.patch('/:id', getPlace, async (req, res) => {
    res.place.likes += 1;

    try {
        const updatedPlace = await res.place.save();
        res.json(updatedPlace.likes);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting place
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

function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = 10;
        
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        const results = {};

        if (startIndex > 0) {
            results.previous = page - 1;
        }
        
        if (endIndex < await model.countDocuments().exec()) {
            results.next = page + 1;
        }
    
        try {
            results.current = await model.find().sort({ likes: -1 }).limit(limit).skip(startIndex);
            res.paginatedResults = results;
            next();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = router;