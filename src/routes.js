const { addNotesHandler, getAllNotesHandler, getNotesById, editNoteByHandler, deleteNoteByIdhandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNotesHandler
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNotesById
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByHandler
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdhandler
    }
];

module.exports = routes;