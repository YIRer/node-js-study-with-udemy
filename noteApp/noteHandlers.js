const fs = require("fs");
const chalk = require("chalk");

const addNodte = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (duplicateNote) {
    console.log(chalk.red.inverse("Note title taken!!"));
  } else {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse("New Note added!!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const removedNotes = notes.filter((note) => note.title !== title);
  if (notes.length > removedNotes.length) {
    console.log(chalk.green.inverse("Note removed!!"));
    saveNotes(removedNotes);
  } else {
    console.log(chalk.red.inverse("No note found!!"));
  }
};

const noteList = () => {
  const notes = loadNotes();

  console.log(chalk.inverse("Your notes"));
  if (notes.length > 0) {
    notes.forEach((note) => {
      console.log(chalk.green.inverse(note.title));
    });
  } else {
    console.log(chalk.red.inverse("No note found!!"));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.green.inverse(note.title));
    console.log(chalk.blue.inverse(note.body));
  } else {
    console.log(chalk.red.inverse("No note found!!"));
  }
};

const saveNotes = (notes) => {
  const dataToJSON = JSON.stringify(notes);

  fs.writeFileSync("notes.json", dataToJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataToJSON = dataBuffer.toString();
    return JSON.parse(dataToJSON);
  } catch (err) {
    console.log(err);
    return [];
  }
};

module.exports = {
  addNodte,
  removeNote,
  noteList,
  readNote,
};
