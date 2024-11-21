/**
 * Author: Mia, Lauren
 * Central file for backend handling of annotation retrieval, creation, deletion.
 */

// Imports
var express = require("express");
var router = express.Router();
const conn = require("../../config/database");
const {
  GET_ANNOTATIONS_BY_PID,
  INSERT_ANNOTATION,
  UPDATE_ANNOTATION,
  DELETE_ANNOTATION_BY_AID,
} = require("../../queries/sqlConstants");

/**
 * Endpoint: GET http://localhost:3000/annotations/all
 */
router.get("/all", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  try {
    const result = await getAnnotations(req.query.projectID);
    res.send(result);
  } catch (err) {
    console.log("Error retrieving existing annotations: ", err);
    res.status(500).send("Error retrieving existing annotations");
  }
});

/**
 * Endpoint: POST http://localhost:3000/annotations/add
 */
router.post("/add", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  const { timestamp, text, projectID } = req.body;

  try {
    const result = await addAnnotation(timestamp, text, projectID);
    res.send(result);
  } catch (err) {
    console.log("Error adding annotation: ", err);
    res.status(500).send("Error adding annotation");
  }
});

/**
 * Endpoint: PUT http://localhost:3000/annotations/edit
 */
router.put("/edit", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  const { id, text, projectID } = req.body;

  try {
    await editAnnotation(id, text, projectID);
    res.send({});
  } catch (err) {
    console.log("Error editing annotation: ", err);
    res.status(500).send("Error editing annotation");
  }
});

/**
 * Endpoint: DELETE http://localhost:3000/annotations/delete
 */
router.delete("/delete", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  try {
    const result = await deleteAnnotation(req.body.id);
    if (result === "Annotation deleted") {
      res.status(200).send({ message: result });
    } else {
      res.status(404).send({ message: result });
    }
  } catch (err) {
    console.log("Error deleting annotation: ", err);
    res.status(500).send("Error deleting annotation");
  }
});

/**
 *
 * @param {*} pid
 * @returns
 */
async function getAnnotations(pid) {
  try {
    const [rows] = await conn.promise().query(GET_ANNOTATIONS_BY_PID, [pid]);

    if (rows.length === 0) {
      return [];
    } else {
      // extract the aid, timestamp, and text
      return rows.map((row) => ({
        id: row.aid,
        timestamp: row.timestamp,
        text: row.text,
      }));
    }
  } catch (err) {
    console.error("Error during annotations retrieval: ", err);
    // throw an error, can consider other error handling returns
    throw err;
  }
}

/**
 *
 * @param {*} timestamp
 * @param {*} text
 * @param {*} pid
 * @returns
 */
async function addAnnotation(timestamp, text, pid) {
  try {
    const [result] = await conn
      .promise()
      .query(INSERT_ANNOTATION, [timestamp, text, pid]);

    if (result.affectedRows > 0) {
      return {
        id: result.insertId, // equivalent to aid
        timestamp: timestamp,
        text: text,
      };
    } else {
      throw new Error("Annotation not added");
    }
  } catch (err) {
    console.error("Error adding annotation: ", err);
    throw err;
  }
}

/**
 *
 * @param {*} aid
 * @param {*} text
 * @param {*} projectID
 * @returns
 */
async function editAnnotation(aid, text, projectID) {
  try {
    const [result] = await conn.promise().query(UPDATE_ANNOTATION, [text, aid]);

    if (result.affectedRows > 0) {
      return;
    } else {
      throw new Error("Annotation not found or not updated");
    }
  } catch (err) {
    console.error("Error editing annotation", err);
    return "Error editing annotation";
  }
}

/**
 * Deletes an annotation, given the annotation id.
 * @param {*} aid
 * @returns
 */
async function deleteAnnotation(aid) {
  try {
    const [result] = await conn.promise().query(DELETE_ANNOTATION_BY_AID, aid);

    if (result.affectedRows === 0) {
      return "Annotation not found or not deleted";
    } else {
      return "Annotation deleted";
    }
  } catch (err) {
    console.error("Error deleting annotation: ", err);
    return "Error deleting annotation";
  }
}

// Exports
module.exports = router;
