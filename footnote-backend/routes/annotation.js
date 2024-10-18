var express = require('express');
var router = express.Router();
const db = require('./database')
const Annotation = require('../createTables.sql'); // Using Annotation model from createTables.sql

// Author: Lauren
// Create a new blank annotation
const createAnnotation = (req, res) => {
    try {
        const { pid, timestamp } = req.body;

        // Assuming you have a function to get the next available aid
        const getNextAid = async () => {
            const lastAnnotation = await db.query('SELECT MAX(aid) AS lastAid FROM annotations WHERE pid = ?', [pid]);
            return lastAnnotation.rows[0].lastAid + 1 || 1;
        };

        // Create a new annotation instance
        // the new aid should be 
        const newAnnotation = new Annotation({
            aid: nextAid,
            timestamp,
            note: '',
            pid
        });


        // Save the annotation to the database
        db.query('INSERT INTO annotations (aid, timestamp, note, pid) VALUES (?, ?, ?, ?)',
                [newAnnotation.aid, newAnnotation.timestamp, newAnnotation.note, newAnnotation.pid],
                (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Error creating annotation' });
                } else {
                    res.status(201).json(newAnnotation);
                }
                });

        res.status(201).json(annotation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating annotation' });
    }

};

module.exports = { createAnnotation, router };

