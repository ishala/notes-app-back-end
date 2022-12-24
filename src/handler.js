const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNotesHandler = (request, h) => {
    //MEMBUAT WADAH INFORMASI NOTES BODY BERBENTUK JSON
    const {title, tags, body} = request.payload;
    //MEMBUAT ID RANDOM UNIK UNTUK TIAP NOTES
    const id = nanoid(16);
    //MEMBUAT CATATAN WAKTU KETIKA MEMBUAT CATATAN
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    //MEMBUAT BODY DATA
    const newNote = {
        id, createdAt, updatedAt, title, tags, body
    };
    //MEMASUKKAN BODY DATA KE DALAM LIST NOTES
    notes.push(newNote);

    //MEMBUAT FILTER APAKAH DIDALAM NOTES SUDAH ADA NOTE BERDASARKAN DATA ID
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    //JIKA ADA DATA
    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });

        response.code(201);
        return response;
    }

    //JIKA TIDAK ADA DATA
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan'
    });
    response.code(501);
    return response;
};  

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    }
});

const getNotesById = (request, h) => {
    //MENGAMBIL NILAI ID DARI PARAMETER 
    const {id} = request.params;

    //MENGAMBIL OBJEK NOTE DARI ARRAY DENGAN MENGAMBIL SAMPLE ID DARI ARRAY NOTES
    const note = notes.filter((n) => n.id === id)[0];

    //MENGECEK APAKAH STATUS UNDEFINED ATAU TIDAK
    if(note !== undefined){
        return {
            status: 'success',
            data: {
                note,
            }
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
    });
    response.code(404);
    return response;
}

const editNoteByHandler = (request, h) => {
    //KARENA MENGGUNAKAN ID SEBAGAI IDENTITAS MAKA HARUS MENGAMBIL DATA IDNYA DULU
    const {id} = request.params;
    //MEREQUEST BODY NOTES YANG SUDAH TERASSIGN
    const {title, tags, body} = request.payload;
    //MEMBERIKAN CATATAN UNTUK INFORMASI KAPAN DIUPDATE
    const updatedAt = new Date().toISOString();

    //MENCARI DATA DENGAN MENCARI INDEXNYA
    const index = notes.findIndex((note) => note.id === id);

    //JIKA TIDAK DITEMUKAN MAKA INDEX AKAN BERNILAI -1
    if(index !== -1) {
        notes[index] = {
            ...notes[index],
            title, 
            tags,
            body,
            updatedAt
        }

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. ID tidak ditemukan'
    });
    response.code(404);
    return response;

}

const deleteNoteByIdhandler = (request, h) => {
    const {id} = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        /*  SPLICE UNTUK MENGHAPUS DATA PADA ARRAY
            MENGHAPUS DATA PADA INDEX KE INDEX, SEBANYAK 1 DATA
        */
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal menghapus catatan'
    });
    response.code(404);
    return response;
}   
module.exports = {
    addNotesHandler, 
    getAllNotesHandler, 
    getNotesById,
    editNoteByHandler,
    deleteNoteByIdhandler};