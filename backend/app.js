const express = require('express');
const app = express();

// BRING IN ENVIRONMENT
require('dotenv').config();
const {PORT} = process.env;

const notesRouter = require('./routes/notes.js');

// MIDDLEWARE
app.use(express.static('../frontend'));
app.use(express.json());
app.use('/notes', notesRouter);


app.get("/", (req, res) => {
  console.log("RECEIVED AT ROOT");
  res.json({
    message: "Hello, world"
  });
});

app.listen(PORT, () => console.log(`Listening on port ... ${PORT}`));
