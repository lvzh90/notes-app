const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { getNotes, addNotes, removeNote, listNotes, readNote } = require('./notes.js');
const { argv } = require('yargs');

yargs(process.argv.slice(2))
.command('add', 'Add a note', 
(yargs) => {
    yargs.option('title', {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    })
    yargs.option('body', {
        describe: 'Note body',
        demandOption: true,
        type: 'string'
    })
}, 
(argv) => {
    addNotes(argv.title,  argv.body)
})
.argv

yargs(hideBin(process.argv))
.command('remove', 'Remove a note',
(yargs) => {
    yargs.option('title', {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    })
},
(argv) => {
    removeNote(argv.title)
})
.parse()

yargs(hideBin(process.argv))
.command('edit', 'Editing a note', (yargs) => {
    console.log('Editing note')
})
.parse()

yargs(hideBin(process.argv))
.command('list', 'List your notes', (yargs) => {
    listNotes()
})
.parse()

yargs(hideBin(process.argv))
.command('read', 'Reading a note', 
(yargs) => {
    yargs.option('title', {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    })
},
(argv) => {
    readNote(argv.title)
})
.parse()
