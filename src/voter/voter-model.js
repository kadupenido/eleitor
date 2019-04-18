const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const ExperienciaSchema = new Schema({
    empresa: String,
    funcao: String,
    inicio: Date,
    fim: Date
});

const VoterSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: String,
    rg: String,
    nascimento: Date,
    sexo: {
        type: String,
        enum: ['Masculino', 'Feminino']
    },
    estadoCivil: {
        type: String,
        enum: ['Casado', 'União estavel', 'Solteiro', 'Viúvo', 'Divorciado']
    },
    nacionalidade: String,
    naturalidade: String,
    titulo: Number,
    zona: Number,
    secao: Number,
    referencia: String,
    responsavel: String,
    endereco: String,
    numero: Number,
    complemento: String,
    bairro: String,
    municipio: String,
    uf: String,
    telefone: Number,
    celular: Number,
    email: String,
    cnh: Number,
    escolaridade: String,
    curso: [String],
    experiencia: [ExperienciaSchema],
    obs: String
});

VoterSchema.virtual('idade').get(() => {

    if (!this.nascimento) {
        return 0;
    }

    var ageDifMs = Date.now() - this.nascimento.getTime();
    var ageDate = new Date(ageDifMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
});

VoterSchema.plugin(mongoosePaginate);

const Voter = mongoose.model('Voter', VoterSchema);

module.exports = Voter;