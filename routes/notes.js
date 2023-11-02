const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsHelpers');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
  readFromFile('./db/db.json', "utf-8", (err, data) => res.json(JSON.parse(data)) )
});

notes.post('/', (req, res) => {
  const {title, text} = req.body;
  if (req.body) {
    const newNote = { title, text, id: uuidv4() };
    readAndAppend(newNote, './db/db.json', res.json(`Note added successfully`));
  } else {
    res.error('Error in adding note');
  }
});

  
notes.delete('/:note_id', (req, res) => {
  const id = req.params.note_id;


  readFromFile('./db/db.json', 'utf8', (err, oldData) => {
    if (err) return console.error(err);
    const parsedData = JSON.parse(oldData);
    upData = parsedData.filter((note) => note.id !== id);
    writeToFile('./db/db.json', upData);
  });
  readFromFile('./db/db.json', "utf-8", (err, data) => res.json(JSON.parse(data)) )
})


  // readFromFile('./db/db.json', "utf-8", (err, data) => 
  //     {res.json(JSON.parse(data)) 

  //     const result = data
  //     console.log(result)
  //     readAndAppend(newNote, './db/db.json', res.json(`Note added successfully`));
  //   });
  // });

module.exports = notes;

