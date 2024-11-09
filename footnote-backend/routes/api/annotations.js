// Author: Mia, Lauren
// Central file for backend handling of annotation retrieval, creation, deletion.

var express = require('express');
var router = express.Router();
const conn = require('../../config/database');

router.get('/annotations', async(req, res) => {
  // TODO: session handling?
  // const pid = req.session.pid;
  const pid = 1;

  try {
    const result = await getAnnotations(pid);
    res.send(result);
  } catch (err) {
    console.log('Error retrieving existing annotations: ', err);
    res.status(500).send('Error retrieving existing annotations');
  }
});

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

// Create a new blank annotation
async function annotationCreate(pid, timestamp) {
    const checkExistingSql = 'SELECT * FROM ANNOTATIONS WHERE pid = ? AND timestamp = ?';
    const createAnnotationSql = 'INSERT INTO ANNOTATIONS(pid, timestamp, note) VALUES(?, ?, ?)';

    try {
      // check if annotation already exists
      const [existingAnnotation] = await conn.promise().query(checkExistingSql, [pid, timestamp]);

      if (existingAnnotation.length > 0) {
        return "Annotation already exists at this time";
      }

      // get the last annotation ID
      const [lastAnnotation] = await conn.promise().query('SELECT MAX(aid) AS last_aid FROM ANNOTATIONS');
      const lastAid = lastAnnotation[0].last_aid || 0; // if no annotations exist, lastAid will be 0

      // create a new annotation
      const newAid = lastAid + 1;
      await conn.promise().query(createAnnotationSql, [pid, timestamp, '']);

      return "Created annotation " + newAid + "\n";
    } catch (err) {
      console.error('Error during annotation creation: ', err);
      return 'Error during annotation creation';
    }
  }

// Edit a blank annotation
async function annotationEdit(pid, timestamp) {
    const checkExistingSql = 'SELECT note FROM ANNOTATIONS WHERE pid = ? AND timestamp = ?';

    try {
      // check if annotation already exists
      const [existingAnnotation] = await conn.promise().query(checkExistingSql, [pid, timestamp]);

      if (existingAnnotation.length > 0) {
        return existingAnnotation[0].note;
      } else {
        return "Select annotation to edit";
      }
    } catch (err) {
      console.error('Error during annotation editing: ', err);
      return 'Error during annotation editing';
    }
  }


// Save the annotation to the db
async function annotationSave(pid, timestamp, note) {
    const updateAnnotationSql = 'UPDATE ANNOTATIONS SET note = ? WHERE pid = ? AND timestamp = ?';

    try {
      // update the existing annotation
      const [result] = await conn.promise().query(updateAnnotationSql, [note, pid, timestamp]);

      if (result.affectedRows > 0) {
        return "Annotation saved";
      } else {
        return "No annotation found to update";
      }
    } catch (err) {
      console.error('Error during annotation saving: ', err);
      return 'Error during annotation saving';
    }
  }


// Deletes the annotation at the given timestamp with the given PID
async function annotationDelete(pid, timestamp) {
    const deleteAnnotationSql = 'DELETE FROM ANNOTATIONS WHERE pid = ? AND timestamp = ?';

    try {
      // delete the existing annotation
      const [result] = await conn.promise().query(deleteAnnotationSql, [pid, timestamp]);

      if (result.affectedRows > 0) {
        return "Annotation deleted";
      } else {
        return "No annotation found to delete";
      }
    } catch (err) {
      console.error('Error during annotation deletion: ', err);
      return 'Error during annotation deletion';
    }
  }

module.exports.annotationCreate = annotationCreate;
module.exports.annotationEdit = annotationEdit;
module.exports.annotationSave = annotationSave;
module.exports.annotationDelete = annotationDelete;
module.exports = { createAnnotation, router };
