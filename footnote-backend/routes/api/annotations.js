// Author: Mia, Lauren
// Central file for backend handling of annotation retrieval, creation, deletion.

var express = require("express");
var router = express.Router();
const conn = require("../../config/database");

// endpoint: GET "http://localhost:3000/annotations/all"
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

// endpoint: POST "http://localhost:3000/annotations/add"
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

// endpoint: PUT "http://localhost:3000/annotations/edit"
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

// endpoint: DELETE "http://localhost:3000/annotations/delete"
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

// Retrieve the list of existing annotations under the given pid (project id)
// Returns: an array of Annotations objects like follows
// [
//   { id: 1
//     timestamp: "00:31",
//     text: "this is an annotation"
//   },
//   { id: 2
//     timestamp: "00:31",
//     text: "this is another annotation"
//   },
// ]
async function getAnnotations(pid) {
  const getAnnotationsSql =
    "SELECT aid, timestamp, text FROM ANNOTATIONS WHERE pid = ?";

  try {
    const [rows] = await conn.promise().query(getAnnotationsSql, [pid]);

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

// add an annotation, given the timestamp, text, and project id
// returns the Annotation object as follows
// { id: 1
//   timestamp: "00:31",
//   text: "this is an annotation"
// }
// async function addAnnotation(text, pid) {
async function addAnnotation(timestamp, text, pid) {
  const addAnnotationSql =
    "INSERT INTO ANNOTATIONS (timestamp, text, pid) VALUES (?, ?, ?);";
  try {
    const [result] = await conn
      .promise()
      .query(addAnnotationSql, [timestamp, text, pid]);

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

// edit an annotation, given the text, and annotation id
// returns the Annotation object as follows
// { id: 1
//   timestamp: "00:31",
//   text: "this is an annotation"
// }
async function editAnnotation(aid, text, projectID) {
  const editAnnotationSql = "UPDATE ANNOTATIONS SET text = ? WHERE aid = ?;";

  try {
    const [result] = await conn.promise().query(editAnnotationSql, [text, aid]);

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

// deletes an annotation, given the annotation id
// returns a success or failure message
async function deleteAnnotation(aid) {
  const deleteAnnotationSql = "DELETE FROM ANNOTATIONS WHERE aid = ?";

  try {
    const [result] = await conn.promise().query(deleteAnnotationSql, aid);

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

module.exports = router;
