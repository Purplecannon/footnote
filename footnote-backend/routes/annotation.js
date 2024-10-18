var express = require('express');
var router = express.Router();
const Annotation = require('../createTables.sql'); // Using Annotation model from createTables.sql

// Author: Lauren
// Create a new blank annotation
router.create('/', async (req, res) => {
    try {
        const { pid, timestamp } = req.body;

        // Find the last annotation for the project
        const lastAnnotation = await Annotation.findOne({ pid }).sort({ aid: -1 });

        // Determine the next aid
        const nextAid = lastAnnotation ? lastAnnotation.aid + 1 : 1;

        // Create a new annotation instance
        const annotation = new Annotation({
            aid: nextAid,
            timestamp,
            note: '',
            pid
        });


        // Save the annotation to the database
        await annotation.save();

        res.status(201).json(annotation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating annotation' });
    }

});

module.exports = { router };
