const fs = require('fs');
const path = require('path');

const chalk = require('chalk');

const notesJsonFile = path.join(__dirname, 'notes.json');

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.blue.bold('Your notes:'));
    console.log('');

    notes.forEach(note => console.log(chalk.blue(note.title)));
}

const readNote = (title) => {
    const notes = loadNotes();

    const targetNote = notes.find(note => note.title === title);

    if (targetNote) {
        console.log(chalk.blue.bold(targetNote.title));
        console.log(targetNote.body);
    } else {
        console.log(chalk.bgRed('No note found'));
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title) || '';

    if (duplicateNote.length === 0) {
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.bgGreen('New note added!'));
    } else {
        console.log(chalk.bgRed('Note title taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter(note => note.title !== title);

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.bgGreen('Note removed!'));
    } else {
        console.log(chalk.bgRed('No note found!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(notesJsonFile, dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(notesJsonFile);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        console.log('error when loading notes', e);
        return [];
    }
}

module.exports = {
    listNotes,
    readNote,
    addNote,
    removeNote
};