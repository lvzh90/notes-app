const fs = require('fs');
const chalk = require('chalk');

function getNotes() {
    return 'Your notes...'
}

function addNotes(title, body) {
    const duplicateNotes = findNote(title)
    if (duplicateNotes) {
        console.log('Note title taken!')
        return
    }

    const notes = loadNotes()
    notes.push({
        title: title,
        body: body
    })

    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))

}

function removeNote(title) {
    const note = findNote(title)

    if (!note) {
        console.log(chalk.red.inverse(`Note '${title}' not found!`))
        return
    }

    const notes = loadNotes()
    notes.splice(notes.indexOf(note),1)
    saveNotes(notes)
    console.log(chalk.green.inverse(`Note removed: ${JSON.stringify(note)}`))
}

function findNote(title) {
    const notes = loadNotes()
    return notes.find(note => note.title === title)
}

function saveNotes(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

function loadNotes() {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const data = dataBuffer.toString()
        return JSON.parse(data)
    } catch (e) {
        return []
    }
}

function listNotes() {
    console.log('Listing out all note...')
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(`Title: ${chalk.yellow(note.title)}`)
    })
}

function readNote(title) {
    const note = findNote(title)
    if (note) {
        console.log(chalk.blue(`Reading note: ${JSON.stringify(note)}`))
    } else {
        console.log('Note not found!')
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
