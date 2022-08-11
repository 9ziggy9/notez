const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.DB, sqlite3.OPEN_READWRITE);

// e.g. /notes/sunday
router.get('/:day', (req, res) => {
  db.all(`SELECT * FROM ${req.params.day}`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.json(rows);
  });
});

// POST /notes/sunday
router.post('/:day', (req,res) => {
  const note = req.body.note;
  const day = req.params.day;
  db.run(`INSERT INTO ${day} (note) VALUES ("${note}")`, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.json({
      message: "Inserted successfully!"
    });
  });
});

module.exports = router;
