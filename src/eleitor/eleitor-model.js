const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EletorSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: false
    }
});

const Eletor = mongoose.model('Eletor', EletorSchema);
module.exports = Eletor;