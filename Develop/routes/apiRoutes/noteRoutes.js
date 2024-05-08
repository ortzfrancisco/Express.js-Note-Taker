const router = require("express").Router();
// got this from the site https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
let data = require("../../db/db.json");

// route to get notes
router.get("/notes", (req, res) => {
  res.json(data);
});

// route to post notes
router.post("/notes", (req, res) => {

  const newNote = { ...req.body, id: uuidv4() };

  // push the new note to the data array in the db.json file
  data.push(newNote);
  fs.writeFile(
    // join the directory name with the db.json file
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(data),
    function (err) {
      if (err) {
        res.status(404).json({ error: err });
      }
      res.json(data);
    }
  );
});

// route to delete notes by id
router.delete("/notes/:id", (req, res) => {
  // filter out the note with the id that was passed in the url
  data = data.filter((note) => note.id !== req.params.id);
  // Write the updated data array to db.json file
  fs.writeFile(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(data),
    function (err) {
      if (err) {
        res.status(404).json({ error: err });
      }
      res.json(data);
    }
  );
});

module.exports = router;